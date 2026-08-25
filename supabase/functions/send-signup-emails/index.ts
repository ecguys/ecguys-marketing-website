import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { escapeHtml } from "./escape.ts"
import { businessWelcomeEmail, studentWelcomeEmail } from "./templates.ts"

// This function is invoked by a Postgres AFTER INSERT trigger on payload.leads
// (see supabase/migrations/20260825000000_lead_signup_webhook_trigger.sql), not
// directly by the browser. The database insert has already succeeded by the time
// this runs, so email failures here must never be reported back to the signup form.

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "EC Guys <hello@ecguys.net>"
const ADMIN_NOTIFICATION_EMAIL = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ?? "ecguys03@gmail.com"
const DB_WEBHOOK_SECRET = Deno.env.get("DB_WEBHOOK_SECRET")

interface Lead {
  id: number | string
  name: string
  institution: string
  email: string
  phone: string
  category: string
  message: string
  newsletter: boolean
  created_at?: string
  updated_at?: string
}

async function sendEmail(payload: Record<string, unknown>, idempotencyKey: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend API error (${res.status}): ${text}`)
  }

  return res.json()
}

// student -> student template; business and career both get the business
// template, since its "connecting businesses, professionals, students, and
// opportunities" copy reads fine for either audience. There's no dedicated
// career template (only two were approved) — revisit if that changes.
function welcomeEmailFor(lead: Lead) {
  return lead.category === "student" ? studentWelcomeEmail(lead.name) : businessWelcomeEmail(lead.name)
}

function adminEmailHtml(lead: Lead): string {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Institution / Company", lead.institution],
    ["Category", lead.category],
    ["Newsletter opt-in", lead.newsletter ? "Yes" : "No"],
    ["Message", lead.message],
    ["Submitted at", lead.created_at ?? new Date().toISOString()],
    ["Lead ID", String(lead.id)],
  ].map(([label, value]) => [label, escapeHtml(value)] as [string, string])

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;">${label}</td><td style="padding:4px 0;">${value}</td></tr>`,
    )
    .join("")

  return `<h2>New signup received</h2><table>${rowsHtml}</table>`
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 })
  }

  if (!DB_WEBHOOK_SECRET || req.headers.get("x-webhook-secret") !== DB_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!RESEND_API_KEY) {
    console.error("send-signup-emails: RESEND_API_KEY is not configured")
    return new Response("Server misconfigured", { status: 500 })
  }

  let payload: { type?: string; record?: Lead }
  try {
    payload = await req.json()
  } catch {
    return new Response("Invalid JSON body", { status: 400 })
  }

  if (payload.type && payload.type !== "INSERT") {
    // The trigger only fires on INSERT, but guard anyway in case it's ever reused.
    return new Response(JSON.stringify({ skipped: true, reason: "not an INSERT event" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const lead = payload.record
  if (!lead?.email) {
    return new Response("Missing lead record or email", { status: 400 })
  }

  const welcomeEmail = welcomeEmailFor(lead)

  const [welcomeResult, adminResult] = await Promise.allSettled([
    sendEmail(
      {
        from: FROM_EMAIL,
        to: lead.email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
      },
      `welcome-${lead.id}`,
    ),
    sendEmail(
      {
        from: FROM_EMAIL,
        to: ADMIN_NOTIFICATION_EMAIL,
        subject: `New signup: ${lead.name} (${lead.category})`,
        html: adminEmailHtml(lead),
      },
      `admin-notify-${lead.id}`,
    ),
  ])

  if (welcomeResult.status === "rejected") {
    console.error(
      `send-signup-emails: welcome email failed for lead ${lead.id} (${lead.email}):`,
      welcomeResult.reason,
    )
  }
  if (adminResult.status === "rejected") {
    console.error(`send-signup-emails: admin notification failed for lead ${lead.id}:`, adminResult.reason)
  }

  return new Response(
    JSON.stringify({
      leadId: lead.id,
      welcome: welcomeResult.status === "fulfilled" ? "sent" : "failed",
      admin: adminResult.status === "fulfilled" ? "sent" : "failed",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  )
})

import { escapeHtml } from "./escape.ts"

// Brand tokens, converted directly from app/(frontend)/globals.css's OKLCH
// design tokens so these emails match the live site rather than inventing a
// new palette. See PROJECT_CONTEXT.md for the source values.
const COLORS = {
  background: "#0A0A0F",
  card: "#121319",
  cardBorder: "#1E2027",
  primary: "#00CCB2",
  primaryText: "#06090A",
  accent: "#FD7933",
  heading: "#F5F5F7",
  body: "#B4B4BE",
  muted: "#75757F",
}

const FONT_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const SITE_URL = "https://www.ecguys.net"

interface ShellOptions {
  previewText: string
  eyebrow: string
  headline: string
  bodyParagraphsHtml: string
  ctaLabel: string
}

// The EC Guys wordmark is a styled text logo on the live site (no image
// asset exists for it) — reproduced here as real HTML/CSS so it renders
// even with images blocked, exactly like the actual brand mark does.
function renderLogo(): string {
  return `
    <span style="font-family:'Courier New', Courier, monospace; font-size:20px; font-weight:700; letter-spacing:0.5px;">
      <span style="color:${COLORS.muted};">[</span><span style="color:${COLORS.muted};">&lt;</span><span style="color:${COLORS.accent};">/</span><span style="color:${COLORS.primary}; font-weight:800;">ECGUYS</span><span style="color:${COLORS.muted};">&gt;</span><span style="color:${COLORS.muted};">]</span>
    </span>
  `
}

function renderShell(options: ShellOptions): string {
  const { previewText, eyebrow, headline, bodyParagraphsHtml, ctaLabel } = options

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>EC Guys</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body, table, td { font-family: ${FONT_STACK}; }
  body { margin:0; padding:0; width:100% !important; background-color:${COLORS.background}; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
  a { text-decoration:none; }
  @media only screen and (max-width: 620px) {
    .email-container { width:100% !important; }
    .email-padding { padding-left:20px !important; padding-right:20px !important; }
    .email-headline { font-size:22px !important; line-height:30px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:${COLORS.background};">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
    ${escapeHtml(previewText)}
    &#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;&#8203;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:${COLORS.card}; border:1px solid ${COLORS.cardBorder}; border-radius:16px;">
          <tr>
            <td class="email-padding" align="center" style="padding:32px 40px 24px 40px; border-bottom:1px solid ${COLORS.cardBorder};">
              ${renderLogo()}
            </td>
          </tr>

          <tr>
            <td class="email-padding" align="center" style="padding:40px 40px 8px 40px;">
              <div style="font-size:12px; font-weight:700; letter-spacing:2px; color:${COLORS.primary}; text-transform:uppercase; margin-bottom:16px;">${escapeHtml(eyebrow)}</div>
              <h1 class="email-headline" style="margin:0; font-size:28px; line-height:36px; font-weight:700; color:${COLORS.heading};">${escapeHtml(headline)}</h1>
            </td>
          </tr>

          <tr>
            <td class="email-padding" style="padding:24px 40px 8px 40px; font-size:16px; line-height:26px; color:${COLORS.body};">
              ${bodyParagraphsHtml}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:24px 40px 40px 40px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${SITE_URL}" style="height:52px;v-text-anchor:middle;width:240px;" arcsize="23%" strokecolor="${COLORS.primary}" fillcolor="${COLORS.primary}">
              <w:anchorlock/>
              <center style="color:${COLORS.primaryText};font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;">${escapeHtml(ctaLabel)}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${SITE_URL}" style="display:inline-block; background-color:${COLORS.primary}; color:${COLORS.primaryText}; font-size:16px; font-weight:700; padding:16px 40px; border-radius:12px; text-decoration:none;">${escapeHtml(ctaLabel)} &rarr;</a>
              <!--<![endif]-->
            </td>
          </tr>

          <tr>
            <td class="email-padding" align="center" style="padding:24px 40px 32px 40px; border-top:1px solid ${COLORS.cardBorder};">
              <p style="margin:0 0 8px 0; font-size:13px; color:${COLORS.muted}; font-weight:600;">EC Guys</p>
              <p style="margin:0 0 4px 0; font-size:13px; line-height:20px;">
                <a href="mailto:hello@ecguys.net" style="color:${COLORS.muted};">hello@ecguys.net</a>
              </p>
              <p style="margin:0; font-size:13px; line-height:20px;">
                <a href="${SITE_URL}" style="color:${COLORS.muted};">www.ecguys.net</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 18px 0;">${text}</p>`
}

export interface WelcomeEmail {
  subject: string
  previewText: string
  html: string
}

export function studentWelcomeEmail(name: string): WelcomeEmail {
  const safeName = escapeHtml(name)

  const bodyParagraphsHtml = [
    `<p style="margin:0 0 20px 0; font-size:18px; font-weight:600; color:${COLORS.heading};">Hi ${safeName},</p>`,
    paragraph("Thank you for showing your interest in EC Guys!"),
    paragraph(
      "We're excited to have you join our growing community of students and future professionals.",
    ),
    paragraph(
      "We've successfully received your details and registered your interest. Our team will keep you updated with relevant opportunities, programmes, events, and other updates that may be useful for you.",
    ),
    paragraph(
      "There's nothing else you need to do right now &mdash; we'll be in touch when there's something relevant to share.",
    ),
    paragraph("We're looking forward to having you with us."),
    `<p style="margin:24px 0 0 0;">Best regards,</p>`,
    `<p style="margin:0 0 18px 0;">The EC Guys Team</p>`,
    `<p style="margin:0; color:${COLORS.muted}; font-size:14px;">hello@ecguys.net<br>www.ecguys.net</p>`,
  ].join("\n")

  return {
    subject: "Welcome to EC Guys — Your Interest Has Been Registered \u{1F389}",
    previewText: "Thanks for showing your interest in EC Guys. We're excited to have you with us.",
    html: renderShell({
      previewText: "Thanks for showing your interest in EC Guys. We're excited to have you with us.",
      eyebrow: "Signup confirmed",
      headline: "Welcome to EC Guys \u{1F389}",
      bodyParagraphsHtml,
      ctaLabel: "Explore EC Guys",
    }),
  }
}

export function businessWelcomeEmail(name: string): WelcomeEmail {
  const safeName = escapeHtml(name)

  const bodyParagraphsHtml = [
    `<p style="margin:0 0 20px 0; font-size:18px; font-weight:600; color:${COLORS.heading};">Hi ${safeName},</p>`,
    paragraph("Thank you for showing your interest in EC Guys."),
    paragraph("We're pleased to have received your details and registered your interest."),
    paragraph(
      "EC Guys is building connections between businesses, professionals, students, and opportunities. We'll keep you informed about relevant initiatives, collaborations, events, and opportunities that may be of interest to you and your organisation.",
    ),
    paragraph(
      "There's nothing else you need to do at this stage. Our team will be in touch when there is something relevant to share.",
    ),
    paragraph("Thank you for connecting with EC Guys. We look forward to staying in touch."),
    `<p style="margin:24px 0 0 0;">Best regards,</p>`,
    `<p style="margin:0 0 18px 0;">The EC Guys Team</p>`,
    `<p style="margin:0; color:${COLORS.muted}; font-size:14px;">hello@ecguys.net<br>www.ecguys.net</p>`,
  ].join("\n")

  return {
    subject: "Welcome to EC Guys — Your Interest Has Been Registered",
    previewText: "Thank you for connecting with EC Guys. We look forward to staying in touch.",
    html: renderShell({
      previewText: "Thank you for connecting with EC Guys. We look forward to staying in touch.",
      eyebrow: "Signup confirmed",
      headline: "Welcome to EC Guys",
      bodyParagraphsHtml,
      ctaLabel: "Discover EC Guys",
    }),
  }
}

-- Fires the send-signup-emails Edge Function after a new row is inserted into
-- payload.leads (the table backing the existing signup form). This is
-- intentionally decoupled from Payload's own schema/migrations: it adds no
-- columns and does not modify the leads collection in any way.
--
-- The shared secret used to authenticate the trigger's call to the Edge
-- Function is stored in Supabase Vault (see vault.decrypted_secrets, secret
-- name 'lead_signup_webhook_secret') rather than being embedded in this
-- file or in the function source below — this file intentionally contains
-- no secret material. To (re)create the vault entry, run once via the SQL
-- editor (not saved to a migration file, same treatment as DATABASE_URI):
--
--   select vault.create_secret(
--     '<random value, e.g. from: select encode(gen_random_bytes(32), \'hex\')>',
--     'lead_signup_webhook_secret',
--     'Shared secret verified by supabase/functions/send-signup-emails'
--   );
--
-- The same value must also be set as the Edge Function's DB_WEBHOOK_SECRET
-- secret (supabase secrets set DB_WEBHOOK_SECRET=<value>) — the function
-- checks the incoming x-webhook-secret header against it.

create extension if not exists pg_net;

-- The enqueue call below is wrapped in its own exception block: if it ever
-- threw (pg_net misconfigured, vault lookup error, etc.) that exception
-- would otherwise propagate and roll back the very INSERT this trigger is
-- reacting to. Any failure here is only ever logged via RAISE WARNING,
-- never fatal to the signup.
create or replace function payload.notify_lead_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_secret text;
begin
  begin
    select decrypted_secret into v_secret
    from vault.decrypted_secrets
    where name = 'lead_signup_webhook_secret';

    perform net.http_post(
      url := 'https://mqkxnteupakzpycfgnwj.supabase.co/functions/v1/send-signup-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', v_secret
      ),
      body := jsonb_build_object(
        'type', 'INSERT',
        'table', 'leads',
        'schema', 'payload',
        'record', to_jsonb(NEW)
      )
    );
  exception when others then
    raise warning 'notify_lead_signup: failed to enqueue signup-email webhook for lead %: %', NEW.id, sqlerrm;
  end;

  return NEW;
end;
$$;

drop trigger if exists trg_lead_signup_notify on payload.leads;

create trigger trg_lead_signup_notify
after insert on payload.leads
for each row
execute function payload.notify_lead_signup();

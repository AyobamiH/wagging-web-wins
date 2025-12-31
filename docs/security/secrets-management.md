# Secrets Management Guide

## Overview

This project follows strict security practices for managing API keys, tokens, and other sensitive credentials. **No real secrets are ever committed to the repository.**

## Architecture

### Frontend (Client-Side)
- **Public Keys Only**: Only Supabase public/anon keys are exposed to the client
- **Safe to Bundle**: The Supabase URL and anon key are PUBLIC by design and meant to be in the client bundle
- **Hard-Coded Values**: Public configuration is hard-coded in `src/integrations/supabase/client.ts`
- **Never Contains**: Service role keys, Stripe secret keys, webhook secrets, or any private API keys

### Backend (Edge Functions)
- **Secure Storage**: All secrets stored in Supabase Edge Function secrets manager
- **Runtime Access**: Secrets accessed via `Deno.env.get('SECRET_NAME')`
- **Never Hard-Coded**: No secrets are hard-coded in Edge Function code
- **Proper Validation**: All functions validate that required secrets are present before proceeding

## Secret Categories

### 1. Public Keys (Safe for Client)
These are intentionally public and safe to expose:

| Secret | Location | Purpose |
|--------|----------|---------|
| `SUPABASE_URL` | Hard-coded in client | Public Supabase project URL |
| `SUPABASE_ANON_KEY` | Hard-coded in client | Public-facing API key (RLS enforced) |

**Note**: The anon key is protected by Row Level Security (RLS) policies in the database, so exposing it is safe and expected.

### 2. Private Secrets (Backend Only)
These must NEVER be exposed to the client:

| Secret | Set In | Used By | Purpose |
|--------|--------|---------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Function Secrets | All Edge Functions | Bypass RLS for admin operations |
| `STRIPE_SECRET_KEY` | Edge Function Secrets | Payment functions | Process payments |
| `STRIPE_WEBHOOK_SECRET` | Edge Function Secrets | stripe-webhook | Verify Stripe webhooks |
| `N8N_WEBHOOK_SECRET` | Edge Function Secrets | submit-message, submit-email-update | Sign webhook payloads |
| `N8N_MESSAGES_WEBHOOK_URL` | Edge Function Secrets | submit-message | Forward contact forms |
| `N8N_EMAIL_UPDATE_WEBHOOK_URL` | Edge Function Secrets | submit-email-update | Forward email subscriptions |
| `BOOTSTRAP_SECRET` | Edge Function Secrets | bootstrap-admin | Create first admin user |
| `RUNWARE_API_KEY` | Edge Function Secrets | generate-pillar2-images | Generate images |
| `ALLOWED_ORIGINS` | Edge Function Secrets | CORS validation | Restrict API access |

## How to Set Secrets

### For Edge Functions (Production)

1. **Via Supabase Dashboard**:
   - Navigate to: `Project Settings → Edge Functions → Secrets`
   - Click `New Secret`
   - Enter `SECRET_NAME` and value
   - Click `Save`

2. **Via Supabase CLI**:
   ```bash
   supabase secrets set SECRET_NAME=value
   ```

### For Local Development

1. Create a `.env` file (gitignored) with:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. For Edge Function testing locally:
   ```bash
   supabase functions serve --env-file .env.local
   ```

## Security Rules

### ✅ DO

- Store all private secrets in Supabase Edge Function secrets manager
- Use `Deno.env.get('SECRET_NAME')` in Edge Functions
- Validate that required secrets exist before using them
- Use public anon keys in frontend code (protected by RLS)
- Add `.env` and `.env.*` to `.gitignore`
- Use `.env.example` with placeholder values only
- Document which secrets are required for each Edge Function

### ❌ DON'T

- Commit real secrets to git (`.env`, config files, code)
- Put service role keys in frontend code
- Put Stripe secret keys in frontend code
- Put webhook secrets in frontend code
- Log secret values to console or error logs
- Share secrets via insecure channels (email, Slack, etc.)
- Use the same secret across multiple environments (dev/staging/prod)

## Edge Function Secret Access Pattern

All Edge Functions follow this pattern:

```typescript
// Read from secure environment
const secretKey = Deno.env.get('SECRET_NAME');

// Validate it exists
if (!secretKey) {
  console.error('SECRET_NAME not configured');
  throw new Error('SECRET_NAME is not set');
}

// Use it securely
const result = await someAPI.call(secretKey);
```

## Frontend API Calls

Frontend code calls Edge Functions via their public URLs:

```typescript
// ✅ CORRECT: Call Edge Function (secrets stay server-side)
const response = await fetch(
  `https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/function-name`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${anonKey}`, // Public anon key is fine
    },
    body: JSON.stringify(data)
  }
);

// ❌ WRONG: Never put secrets in frontend
const response = await stripe.charges.create({
  secret_key: 'sk_live_xxx' // NEVER DO THIS
});
```

## Audit Checklist

Before deploying, verify:

- [ ] `.env` is in `.gitignore`
- [ ] No real secrets in `.env` (only `.env.example` with placeholders)
- [ ] All Edge Functions use `Deno.env.get()` for secrets
- [ ] No secrets hard-coded in TypeScript/JavaScript files
- [ ] Frontend only contains public anon keys
- [ ] All required secrets are set in Supabase Edge Function secrets
- [ ] No secrets logged to console in production code
- [ ] `.env.example` documents all required secrets

## Common Mistakes

### Mistake 1: Putting Service Role Key in Frontend
```typescript
// ❌ WRONG
const supabase = createClient(url, SERVICE_ROLE_KEY); // In React component
```

**Solution**: Service role key should ONLY be used in Edge Functions.

### Mistake 2: Committing .env File
```bash
# ❌ WRONG: .env tracked by git
git add .env
```

**Solution**: Add `.env` to `.gitignore` and use `.env.example` for documentation.

### Mistake 3: Hard-Coding Secrets
```typescript
// ❌ WRONG
const STRIPE_KEY = 'sk_live_xxxxxxxxxxxxx';
```

**Solution**: Use `Deno.env.get('STRIPE_SECRET_KEY')` in Edge Functions.

## Emergency Procedures

### If a Secret is Leaked

1. **Rotate Immediately**:
   - Generate new key from the service provider
   - Update in Supabase Edge Function secrets
   - Revoke the old key

2. **Audit Impact**:
   - Check logs for unauthorized usage
   - Review which endpoints/resources were accessible
   - Assess potential data exposure

3. **Update Documentation**:
   - Document the incident
   - Update security procedures if needed
   - Train team on prevention

## Additional Resources

- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [Supabase Edge Function Secrets](https://supabase.com/docs/guides/functions/secrets)
- [OWASP Secret Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**Last Updated**: 2025-01-14  
**Maintained By**: Development Team  
**Review Frequency**: Quarterly or after any security incident

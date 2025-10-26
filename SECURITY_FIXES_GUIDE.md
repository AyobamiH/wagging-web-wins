# Security Fixes Guide

This document outlines the security issues identified and how to fix them.

## Priority 1: Supabase Security Settings (CRITICAL)

The following security warnings were identified by the Supabase linter and **must be fixed in the Supabase dashboard**:

### 1. OTP Long Expiry ⚠️

**Issue**: OTP (One-Time Password) expiry exceeds recommended threshold.

**Risk**: Longer OTP expiry times increase the window of opportunity for attackers to intercept and use OTPs.

**How to Fix**:
1. Go to [Supabase Authentication Settings](https://supabase.com/dashboard/project/viwxxjnehceedyctevau/auth/providers)
2. Navigate to "Auth" → "Settings" → "Auth Providers"
3. Find "OTP Expiry" settings
4. Set to recommended value (typically 60-300 seconds)

**Reference**: https://supabase.com/docs/guides/platform/going-into-prod#security

---

### 2. Leaked Password Protection Disabled ⚠️

**Issue**: Leaked password protection is currently disabled.

**Risk**: Users can set passwords that have been leaked in data breaches, making accounts vulnerable to credential stuffing attacks.

**How to Fix**:
1. Go to [Supabase Authentication Settings](https://supabase.com/dashboard/project/viwxxjnehceedyctevau/auth/providers)
2. Navigate to "Auth" → "Settings" → "Password"
3. Enable "Leaked Password Protection"
4. Optionally set minimum password strength requirements

**Reference**: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

---

### 3. Postgres Version Needs Security Patches ⚠️

**Issue**: Current Postgres version has available security patches.

**Risk**: Known security vulnerabilities in older Postgres versions could be exploited.

**How to Fix**:
1. Go to [Supabase Database Settings](https://supabase.com/dashboard/project/viwxxjnehceedyctevau/settings/database)
2. Navigate to "Settings" → "Database" 
3. Follow the upgrade prompts to update to the latest Postgres version
4. Schedule upgrade during low-traffic period
5. Test thoroughly after upgrade

**Reference**: https://supabase.com/docs/guides/platform/upgrading

---

## Priority 2: Admin Bootstrap Process

### Setting Up the First Admin User

A secure edge function has been created at `supabase/functions/bootstrap-admin/index.ts` to create the first admin user.

**Setup Steps**:

1. **Set Bootstrap Secret**:
   - Go to Supabase Dashboard → Functions → Secrets
   - Add a new secret: `BOOTSTRAP_SECRET`
   - Generate a strong random string (use a password generator)
   - Store this secret securely - you'll need it once

2. **Deploy the Edge Function**:
   ```bash
   # The function is auto-deployed, but you can verify:
   # Check the Edge Functions logs in Supabase Dashboard
   ```

3. **Create First Admin**:
   ```bash
   curl -X POST https://viwxxjnehceedyctevau.supabase.co/functions/v1/bootstrap-admin \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -d '{
       "email": "your-admin@example.com",
       "password": "strong-password-here",
       "secret": "YOUR_BOOTSTRAP_SECRET"
     }'
   ```

4. **Security Notes**:
   - This function only works when NO admin users exist
   - After creating the first admin, the function will refuse all further requests
   - Delete the `BOOTSTRAP_SECRET` after creating the first admin for extra security
   - The first admin can then create other admins through the normal UI

---

## Priority 3: Code-Level Security

### RLS Policies Fixed ✅

The following RLS policy improvements were made:

1. **User Roles Table**: Split the overly permissive "manage all" policy into separate INSERT, UPDATE, DELETE policies
2. **Messages Table**: Added UPDATE and DELETE policies for admins
3. **Email Updates Table**: Added UPDATE and DELETE policies for admins

### Error Handling Improved ✅

- Created custom error types in `src/lib/errors.ts`
- Enhanced repository adapters with proper error handling
- Errors now provide specific error codes and user-friendly messages

### Input Validation

**Current State**: Basic validation exists in forms using `zod`.

**Recommendations**:
1. Review all form inputs for proper validation
2. Add length limits to all text inputs
3. Add rate limiting to API endpoints (consider implementing in edge functions)
4. Sanitize any user-generated content before display

---

## Testing

Test infrastructure has been added:
- Vitest configuration: `vitest.config.ts`
- Test setup: `src/test/setup.ts`
- Sample tests: `src/lib/errors.test.ts`, `src/contexts/AuthContext.test.tsx`

**Run tests**:
```bash
npm run test
```

---

## Checklist

- [ ] Fix OTP expiry in Supabase dashboard
- [ ] Enable leaked password protection in Supabase dashboard
- [ ] Upgrade Postgres version in Supabase dashboard
- [ ] Set BOOTSTRAP_SECRET in Supabase Functions secrets
- [ ] Create first admin user using bootstrap edge function
- [ ] Delete BOOTSTRAP_SECRET after admin creation
- [ ] Review and test all form validations
- [ ] Run security scan again to verify all fixes
- [ ] Set up CI/CD to run tests automatically

---

## Additional Resources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/going-into-prod#security)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Auth Security](https://supabase.com/docs/guides/auth/password-security)

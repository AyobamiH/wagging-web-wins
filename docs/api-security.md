# API & Edge Function Security Documentation

## Overview

This document describes security requirements, authentication patterns, and authorization models for all Supabase Edge Functions and API routes in the Tail Wagging Websites application.

**Audience**: Developers, Security Reviewers  
**Last Updated**: 2025-01-14  
**Related Docs**: SECURITY.md, docs/security/backup-and-restore.md

---

## Table of Contents

1. [Authentication Patterns](#authentication-patterns)
2. [Authorization Models](#authorization-models)
3. [Edge Function Security Requirements](#edge-function-security-requirements)
4. [Rate Limiting](#rate-limiting)
5. [Input Validation](#input-validation)
6. [Webhook Security](#webhook-security)
7. [Error Handling](#error-handling)
8. [Security Checklist](#security-checklist)

---

## Authentication Patterns

### Supabase Auth (JWT Tokens)

All authenticated endpoints use Supabase Auth with JWT tokens:

**Header Format**:
```
Authorization: Bearer <jwt_token>
```

**Verification** (Edge Functions):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
);

// Extract user from request
const authHeader = req.headers.get('Authorization');
const token = authHeader?.replace('Bearer ', '');

const { data: { user }, error } = await supabase.auth.getUser(token);

if (!user) {
  return new Response(
    JSON.stringify({ error: 'Unauthorized' }),
    { status: 401, headers: corsHeaders }
  );
}
```

**RLS Enforcement**:
```sql
-- Example: Users can only view their own payments
CREATE POLICY "payments_select_own" ON payments
FOR SELECT USING (auth.uid() = user_id);
```

### Anonymous Access

Public endpoints (contact forms, email signups) use anonymous access with rate limiting:

```typescript
// No authentication required, but rate limited
const allowed = await rateLimit(req, 'submit-message');
if (!allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

---

## Authorization Models

### Role-Based Access Control (RBAC)

User roles stored in separate `user_roles` table (not on users table - security by design):

**Schema**:
```sql
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL, -- enum: 'admin' | 'user'
  created_at timestamptz DEFAULT now()
);
```

**Security Definer Function**:
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;
```

**Usage in RLS Policies**:
```sql
-- Only admins can insert/update/delete posts
CREATE POLICY "Admins can insert posts" ON posts
FOR INSERT TO authenticated WITH CHECK (is_admin());

CREATE POLICY "Admins can update posts" ON posts
FOR UPDATE TO authenticated USING (is_admin());

CREATE POLICY "Admins can delete posts" ON posts
FOR DELETE TO authenticated USING (is_admin());
```

**⚠️ CRITICAL**: Never check admin status in client-side code only. Always enforce in RLS policies or edge functions.

**Client-Side Guard** (UI only, NOT security):
```typescript
// src/components/admin/AdminGuard.tsx
// This is UI protection ONLY - actual security is in RLS policies
const AdminGuard = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};
```

### Service Role Access

Some operations require elevated permissions beyond user auth:

**When to Use Service Role**:
- Stripe webhook processing (needs to write to payments tables)
- Rate limiting state management (needs to read/write rate_limits table)
- Payment event idempotency (needs to write to payments_events table)
- System-level operations (backups, migrations)

**How to Use**:
```typescript
// Use service role key (NEVER expose to client!)
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Service role bypasses RLS, so be EXTRA careful
const { data, error } = await supabaseAdmin
  .from('payments_events')
  .insert({ event_id: 'evt_123' });
```

**⚠️ SECURITY WARNING**: Service role key:
- **MUST** only be used in edge functions (server-side)
- **NEVER** exposed to frontend
- **NEVER** committed to git
- Stored in Supabase secrets only

---

## Edge Function Security Requirements

### Mandatory Security Checks

Every edge function MUST implement:

1. **CORS Handling**:
```typescript
import { getCorsHeaders } from '../_shared/cors.ts';

const corsHeaders = getCorsHeaders(req);

if (req.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}

// ... rest of handler

return new Response(JSON.stringify(data), {
  headers: { ...corsHeaders, 'Content-Type': 'application/json' }
});
```

2. **Rate Limiting** (public endpoints):
```typescript
import { rateLimit } from '../_shared/rateLimit.ts';

const allowed = await rateLimit(req, 'function-name', {
  tokensPerSecond: 1,
  burstCapacity: 5
});

if (!allowed) {
  return new Response(
    JSON.stringify({ error: 'Too many requests' }),
    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

3. **Input Validation** (all endpoints):
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

const validation = schema.safeParse(body);
if (!validation.success) {
  return new Response(
    JSON.stringify({ error: 'Invalid input', details: validation.error }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

4. **Payload Size Limits**:
```typescript
const contentLength = parseInt(req.headers.get('content-length') || '0');
if (contentLength > 10000) { // 10KB limit
  return new Response(
    JSON.stringify({ error: 'Payload too large' }),
    { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

5. **Error Handling**:
```typescript
try {
  // ... function logic
} catch (error) {
  console.error('Function error:', error); // Log full error
  
  // Return generic message to user (don't leak stack traces)
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

---

## Edge Functions Inventory

### Public Endpoints (No Authentication Required)

#### `submit-message`
**Purpose**: Contact form submission  
**Method**: POST  
**Auth**: None (public)  
**Rate Limit**: 0.2 req/sec, burst 2  
**Max Payload**: 10KB  

**Input Schema**:
```typescript
{
  name: string (2-100 chars),
  email: string (valid email),
  phone?: string (max 20 chars),
  business?: string,
  services?: string[],
  postcode?: string,
  message?: string (max 5000 chars)
}
```

**Security**:
- ✅ Rate limited
- ✅ Input validated (Zod)
- ✅ Payload size checked
- ✅ Webhook signature (HMAC-SHA256)
- ✅ No PII logged

**RLS**: Inserts to `messages` table (public can insert, only admins can view)

---

#### `submit-email-update`
**Purpose**: Email newsletter signup  
**Method**: POST  
**Auth**: None (public)  
**Rate Limit**: 0.5 req/sec, burst 3  
**Max Payload**: 5KB  

**Input Schema**:
```typescript
{
  email: string (valid email)
}
```

**Security**:
- ✅ Rate limited
- ✅ Input validated
- ✅ Payload size checked
- ✅ Webhook signature (HMAC-SHA256)
- ✅ Email normalized (lowercased)

**RLS**: Inserts to `email_updates` table (public can insert, only admins can view)

---

#### `create-buy-plan-session`
**Purpose**: Create Stripe Checkout session  
**Method**: POST  
**Auth**: Optional (can be used by anonymous or authenticated)  
**Rate Limit**: 1 req/sec, burst 5  

**Input Schema**:
```typescript
{
  priceId: string,
  userId?: string,
  successUrl: string,
  cancelUrl: string
}
```

**Security**:
- ✅ Rate limited
- ✅ Input validated
- ✅ Uses Stripe SDK (secure)
- ⚠️ Success/cancel URLs should be validated (TODO)

**RLS**: No direct database access (uses Stripe API)

---

#### `stripe-session-status`
**Purpose**: Retrieve payment session status  
**Method**: GET  
**Auth**: Optional  
**Rate Limit**: 1 req/sec, burst 5  

**Query Params**:
```
?session_id=cs_123456789
```

**Security**:
- ✅ Rate limited
- ✅ Returns only session status (no sensitive data)
- ⚠️ Consider requiring auth (anyone with session ID can query status)

---

### Webhook Endpoints (External Systems)

#### `stripe-webhook`
**Purpose**: Handle Stripe payment events  
**Method**: POST  
**Auth**: Stripe signature verification  
**Rate Limit**: None (trusted source)  

**Security**:
- ✅ Stripe signature verified using `STRIPE_WEBHOOK_SECRET`
- ✅ Idempotency check (payments_events table)
- ✅ Uses service role for database writes
- ❌ Logs sensitive data (customer email, amount) - **FIXED** 2025-01-14

**Events Handled**:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**RLS**: Uses service role to write to customers, payments, subscriptions tables

---

### Admin Endpoints (Authentication Required)

All admin operations go through **RLS policies** on database tables, not dedicated edge functions. Admin-level operations require:

1. Valid JWT token in Authorization header
2. User must have `role = 'admin'` in `user_roles` table
3. RLS policy checks `is_admin()` function

**Admin Operations**:
- Blog post CRUD (posts table)
- Message viewing (messages table)
- Email subscriber viewing (email_updates table)
- Payment/customer/subscription viewing (financial tables)
- Audit log viewing (audit_log table)

---

## Rate Limiting

### Algorithm

**Token Bucket** with per-IP + per-route tracking:

```typescript
interface RateLimitConfig {
  tokensPerSecond: number; // Refill rate
  burstCapacity: number;   // Max tokens (burst allowance)
}
```

**Storage**: `rate_limits` table (PostgreSQL)

**Key**: `hash(ip_address + route_name)`

**Behavior**:
- Tokens refill at `tokensPerSecond` rate
- Each request consumes 1 token
- If `tokens < 1`, request denied (429 Too Many Requests)
- Fails **closed** on errors (denies request if rate limit check fails)

### Configuration Per Endpoint

| Endpoint | Tokens/Sec | Burst | Notes |
|----------|------------|-------|-------|
| submit-message | 0.2 | 2 | Very strict (1 msg per 5 sec) |
| submit-email-update | 0.5 | 3 | Moderate (1 per 2 sec) |
| create-buy-plan-session | 1 | 5 | Lenient (allow rapid retries) |
| stripe-session-status | 1 | 5 | Lenient (status checks are safe) |
| stripe-webhook | N/A | N/A | No rate limit (trusted source) |

### Bypassing Rate Limits

**DO NOT** add bypass logic without security review. If absolutely necessary:

```typescript
// Only for specific admin operations, NOT general bypass
const bypassToken = req.headers.get('X-Admin-Bypass-Token');
if (bypassToken === Deno.env.get('ADMIN_BYPASS_SECRET')) {
  // Skip rate limit
} else {
  const allowed = await rateLimit(req, 'function-name');
  if (!allowed) { ... }
}
```

---

## Input Validation

### Validation Schema Library

Use **Zod** for all input validation:

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long'),
  email: z.string()
    .trim()
    .toLowerCase() // SECURITY: Normalize to prevent duplicates
    .email('Invalid email address')
    .max(255),
  phone: z.string()
    .trim()
    .max(20)
    .optional(),
  message: z.string()
    .trim()
    .max(5000, 'Message too long')
    .optional(),
});

// Usage
const validation = contactSchema.safeParse(body);
if (!validation.success) {
  return new Response(
    JSON.stringify({ 
      error: 'Invalid input', 
      details: validation.error.issues.map(i => i.message) 
    }),
    { status: 400, headers: corsHeaders }
  );
}

const data = validation.data; // Fully validated and type-safe
```

### Common Validation Patterns

**Email Normalization**:
```typescript
email: z.string().trim().toLowerCase().email()
```

**Phone Number**:
```typescript
phone: z.string().trim().regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number').max(20)
```

**URLs**:
```typescript
url: z.string().trim().url().startsWith('https://')
```

**Enum Values**:
```typescript
role: z.enum(['admin', 'user', 'moderator'])
```

**Arrays**:
```typescript
services: z.array(z.string()).min(1).max(10)
```

---

## Webhook Security

### n8n Webhook Signature Verification

All outgoing webhooks to n8n MUST use HMAC-SHA256 signatures:

**Signature Generation** (Edge Function):
```typescript
import { generateSignature } from '../_shared/webhookSignature.ts';

const payload = JSON.stringify(data);
const secret = Deno.env.get('N8N_WEBHOOK_SECRET')!;
const signature = await generateSignature(payload, secret);

await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Webhook-Signature': signature,
  },
  body: payload,
});
```

**Signature Verification** (n8n):
```javascript
// In n8n HTTP Request node, add pre-request script:
const crypto = require('crypto');
const payload = JSON.stringify($json);
const secret = 'YOUR_N8N_WEBHOOK_SECRET';

const hmac = crypto.createHmac('sha256', secret);
hmac.update(payload);
const expectedSignature = hmac.digest('base64');

const receivedSignature = $headers['x-webhook-signature'];

if (receivedSignature !== expectedSignature) {
  throw new Error('Invalid webhook signature');
}
```

**Configuration**:
1. Generate secret: `openssl rand -base64 32`
2. Add to Supabase secrets: `N8N_WEBHOOK_SECRET`
3. Configure n8n workflows to verify signatures
4. Log rejected webhook attempts for monitoring

### Stripe Webhook Signature Verification

Stripe webhooks automatically verified:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const sig = req.headers.get('stripe-signature')!;
const secret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

try {
  const event = stripe.webhooks.constructEvent(body, sig, secret);
  // Event is verified, safe to process
} catch (err) {
  console.error('Invalid Stripe signature:', err.message);
  return new Response('Invalid signature', { status: 400 });
}
```

---

## Error Handling

### Production Error Responses

**DO**:
- Log full error details server-side (for debugging)
- Return generic error messages to users (don't leak implementation details)
- Use appropriate HTTP status codes
- Include request IDs for traceability

**DON'T**:
- Expose stack traces in responses
- Reveal database schema or query details
- Return validation errors that could aid attackers
- Log sensitive data (passwords, tokens, payment details)

**Example**:
```typescript
try {
  // ... operation that might fail
  const result = await database.query('...');
} catch (error) {
  // ✅ Log full error server-side
  console.error('Database query failed:', {
    error: error.message,
    stack: error.stack,
    query: '...', // Sanitized query (no user data)
  });
  
  // ✅ Return generic message to user
  return new Response(
    JSON.stringify({ 
      error: 'An error occurred processing your request',
      requestId: crypto.randomUUID(), // For support tickets
    }),
    { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}
```

### HTTP Status Codes

Use correct status codes:

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Client error (invalid input)
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **413 Payload Too Large**: Request body exceeds size limit
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side error (generic)
- **502 Bad Gateway**: Upstream service failed (Stripe, n8n)
- **503 Service Unavailable**: Temporarily unavailable (maintenance)

---

## Security Checklist

Use this checklist when creating or reviewing edge functions:

### Pre-Deployment Checklist

- [ ] **CORS**: Properly configured with origin validation
- [ ] **Rate Limiting**: Appropriate limits for endpoint type
- [ ] **Input Validation**: Zod schema validates all inputs
- [ ] **Payload Size**: Content-Length checked before parsing
- [ ] **Authentication**: Verified for protected endpoints
- [ ] **Authorization**: RLS policies or admin checks in place
- [ ] **Error Handling**: Generic errors to users, detailed logs server-side
- [ ] **Secrets**: No secrets committed to git, all in Supabase secrets
- [ ] **Logging**: No PII or sensitive data logged
- [ ] **Webhooks**: Signature verification for external webhooks
- [ ] **SQL Injection**: Parameterized queries only (Supabase client handles this)
- [ ] **XSS Prevention**: No `dangerouslySetInnerHTML` without `DOMPurify`
- [ ] **CSRF Protection**: SameSite cookies + CORS (handled by Supabase)
- [ ] **Documentation**: Function documented in this file
- [ ] **Tests**: Security tests written (attempted malicious input)

### Post-Deployment Verification

- [ ] Monitor edge function logs for errors
- [ ] Test rate limiting with rapid requests
- [ ] Attempt malicious input (XSS, SQL injection attempts)
- [ ] Verify RLS policies block unauthorized access
- [ ] Check webhook signature rejection works
- [ ] Confirm error messages don't leak sensitive data
- [ ] Validate audit logging captures actions

---

## Contact

**Security Questions**: security@tailwaggingwebdesign.com  
**API Support**: support@tailwaggingwebdesign.com  
**Emergency Incidents**: [On-call engineer contact]

---

**Version**: 1.0  
**Last Updated**: 2025-01-14  
**Next Review**: 2025-04-14

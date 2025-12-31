-- =============================================================================
-- SECURITY HARDENING MIGRATION
-- Date: 2025-01-14
-- Purpose: Fix critical RLS policy gaps and implement defense-in-depth
-- =============================================================================

-- -----------------------------------------------------------------------------
-- CRITICAL-2: Fix payments_events table RLS policies
-- Issue: Table has RLS enabled but no policies, breaking webhook idempotency
-- Impact: Stripe webhook cannot track processed events, duplicate charges possible
-- -----------------------------------------------------------------------------

-- Allow service role to INSERT event IDs for idempotency tracking
CREATE POLICY "Service role can insert payment events"
ON public.payments_events
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow admins to SELECT event history for debugging payment issues
CREATE POLICY "Admins can view payment events"
ON public.payments_events
FOR SELECT
TO authenticated
USING (public.is_admin());

COMMENT ON POLICY "Service role can insert payment events" ON public.payments_events IS 
  'Allows Stripe webhook handler to record processed event IDs for idempotency. Service role only.';

COMMENT ON POLICY "Admins can view payment events" ON public.payments_events IS 
  'Allows admins to query webhook processing history for payment debugging. Requires is_admin() = true.';

-- -----------------------------------------------------------------------------
-- CRITICAL-3: Fix rate_limits table RLS policies
-- Issue: Table has RLS enabled but no policies, breaking all rate limiting
-- Impact: Rate limiting completely bypassed, spam/DoS attacks possible
-- -----------------------------------------------------------------------------

-- Allow service role full access to manage rate limit state
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

COMMENT ON POLICY "Service role can manage rate limits" ON public.rate_limits IS 
  'Allows edge functions to read/write token bucket state for rate limiting. Service role only.';

-- -----------------------------------------------------------------------------
-- HIGH-1: Add explicit anonymous denial to customers table
-- Issue: No explicit policy blocking anonymous access to customer PII
-- Impact: Potential enumeration of emails, names, Stripe customer IDs
-- -----------------------------------------------------------------------------

CREATE POLICY "Block anonymous access to customers"
ON public.customers
FOR SELECT
TO anon
USING (false);

COMMENT ON POLICY "Block anonymous access to customers" ON public.customers IS 
  'Explicitly denies anonymous access to customer PII. Only authenticated users can view their own records via customers_select_own policy.';

-- -----------------------------------------------------------------------------
-- HIGH-1: Add explicit anonymous denial to payments table
-- Issue: No explicit policy blocking anonymous access to payment data
-- Impact: Potential exposure of transaction amounts, Stripe metadata
-- -----------------------------------------------------------------------------

CREATE POLICY "Block anonymous access to payments"
ON public.payments
FOR SELECT
TO anon
USING (false);

COMMENT ON POLICY "Block anonymous access to payments" ON public.payments IS 
  'Explicitly denies anonymous access to payment transaction data. Only authenticated users can view their own records via payments_select_own policy.';

-- -----------------------------------------------------------------------------
-- HIGH-1: Add explicit anonymous denial to subscriptions table
-- Issue: No explicit policy blocking anonymous access to subscription data
-- Impact: Potential exposure of subscription status, billing periods
-- -----------------------------------------------------------------------------

CREATE POLICY "Block anonymous access to subscriptions"
ON public.subscriptions
FOR SELECT
TO anon
USING (false);

COMMENT ON POLICY "Block anonymous access to subscriptions" ON public.subscriptions IS 
  'Explicitly denies anonymous access to subscription data. Only authenticated users can view their own records via subscriptions_select_own policy.';

-- -----------------------------------------------------------------------------
-- AUDIT LOGGING: Create audit_log table for admin operations
-- Purpose: Track all admin-level changes for security monitoring
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  operation text NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  table_name text NOT NULL,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  CONSTRAINT valid_operation CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE'))
);

-- Enable RLS on audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.audit_log
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Service role can insert audit records (called from triggers)
CREATE POLICY "Service role can insert audit logs"
ON public.audit_log
FOR INSERT
TO service_role
WITH CHECK (true);

COMMENT ON TABLE public.audit_log IS 
  'Audit trail for admin operations. Tracks INSERT/UPDATE/DELETE on sensitive tables. GDPR compliant: no passwords or payment details logged.';

CREATE INDEX idx_audit_log_timestamp ON public.audit_log(timestamp DESC);
CREATE INDEX idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX idx_audit_log_table_name ON public.audit_log(table_name);

-- -----------------------------------------------------------------------------
-- AUDIT TRIGGERS: Auto-log admin changes to blog posts
-- Purpose: Track who publishes, edits, or deletes blog content
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.audit_posts_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (operation, table_name, record_id, old_data, user_id)
    VALUES ('DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (operation, table_name, record_id, old_data, new_data, user_id)
    VALUES ('UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_log (operation, table_name, record_id, new_data, user_id)
    VALUES ('INSERT', TG_TABLE_NAME, NEW.id, to_jsonb(NEW), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER audit_posts_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.audit_posts_changes();

COMMENT ON FUNCTION public.audit_posts_changes() IS 
  'Audit trigger for posts table. Logs all admin changes to blog content with user ID and timestamps.';

-- -----------------------------------------------------------------------------
-- SECURITY VERIFICATION QUERIES
-- Run these after migration to verify policies are working
-- -----------------------------------------------------------------------------

-- Verify RLS is enabled on all sensitive tables
DO $$
DECLARE
  missing_rls text[];
BEGIN
  SELECT array_agg(tablename)
  INTO missing_rls
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename IN ('posts', 'messages', 'email_updates', 'customers', 'payments', 
                      'subscriptions', 'payments_events', 'rate_limits', 'user_roles', 'audit_log')
    AND tablename NOT IN (
      SELECT tablename 
      FROM pg_tables t
      JOIN pg_class c ON c.relname = t.tablename
      WHERE c.relrowsecurity = true
        AND t.schemaname = 'public'
    );
  
  IF array_length(missing_rls, 1) > 0 THEN
    RAISE WARNING 'Tables without RLS: %', missing_rls;
  ELSE
    RAISE NOTICE 'All sensitive tables have RLS enabled ✓';
  END IF;
END $$;

-- Log migration completion
DO $$
BEGIN
  RAISE NOTICE '=================================================================';
  RAISE NOTICE 'Security hardening migration completed successfully';
  RAISE NOTICE 'Date: %', now();
  RAISE NOTICE '=================================================================';
  RAISE NOTICE 'Fixed issues:';
  RAISE NOTICE '  ✓ CRITICAL-2: payments_events RLS policies added';
  RAISE NOTICE '  ✓ CRITICAL-3: rate_limits RLS policies added';
  RAISE NOTICE '  ✓ HIGH-1: Anonymous denial policies for customers/payments/subscriptions';
  RAISE NOTICE '  ✓ HARDENING: audit_log table created with triggers';
  RAISE NOTICE '=================================================================';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Test payment flow end-to-end';
  RAISE NOTICE '  2. Verify rate limiting works (try rapid form submissions)';
  RAISE NOTICE '  3. Attempt anonymous access to /customers, /payments tables';
  RAISE NOTICE '  4. Review audit_log after making admin changes';
  RAISE NOTICE '  5. Set N8N_WEBHOOK_SECRET in Supabase secrets';
  RAISE NOTICE '=================================================================';
END $$;
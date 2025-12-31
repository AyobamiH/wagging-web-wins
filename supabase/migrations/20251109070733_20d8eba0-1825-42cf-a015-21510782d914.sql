-- Create payments and related tables for Stripe fulfillment
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  stripe_customer_id text,
  session_id text UNIQUE,
  subscription_id text,
  price_id text,
  amount_total integer,
  currency text,
  status text,
  current_period_end timestamptz,
  raw_event jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payments_events (
  event_id text PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  stripe_customer_id text UNIQUE NOT NULL,
  email text,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  stripe_subscription_id text UNIQUE,
  status text NOT NULL,
  plan text,
  price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.rate_limits (
  key text PRIMARY KEY,
  tokens integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Payments policies
CREATE POLICY "payments_select_own"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- Customers policies
CREATE POLICY "customers_select_own"
  ON public.customers FOR SELECT
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
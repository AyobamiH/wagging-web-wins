# Stripe Integration Documentation

## Project Context
* **Backend Stack:** Supabase Edge Functions (Deno runtime)
* **Frontend Stack:** React (Vite + TypeScript)
* **Integration Type:** Stripe Checkout (Hosted Redirect)
* **Product/Pricing:** Website packages (Starter £750, Pro £1,950, Growth £3,500) with optional onboarding fees

---

## 1. Backend: Checkout Session Creation

**File:** `supabase/functions/create-buy-plan-session/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Stripe secret key from environment
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    // Parse request body
    const { planName, planPrice, onboardingFee } = await req.json();
    
    if (!planName || !planPrice) {
      throw new Error('Missing required fields: planName or planPrice');
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get origin for redirect URLs
    const originHeader = req.headers.get('origin');
    const refererHeader = req.headers.get('referer');
    const origin = originHeader || (refererHeader ? new URL(refererHeader).origin : undefined) || 'https://yourdomain.com';
    
    // Calculate total price in pence (GBP)
    const totalPrice = (parseFloat(planPrice) + (parseFloat(onboardingFee) || 0)) * 100;
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${planName} Website Package`,
              description: `Professional pet care website - ${planName} package`,
            },
            unit_amount: totalPrice, // Price in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancel`,
      metadata: {
        planName: planName,
        planPrice: planPrice.toString(),
        onboardingFee: (onboardingFee || 0).toString(),
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-buy-plan-session:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while creating the checkout session' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
```

**Key Points:**
- Uses Stripe SDK v14.21.0 for Deno
- Requires `STRIPE_SECRET_KEY` environment variable
- Accepts `planName`, `planPrice`, and optional `onboardingFee`
- Creates one-time payment session with GBP currency
- Returns checkout URL for redirect

---

## 2. Frontend: Payment Initiation

**File:** `src/components/BuyPlanButton.tsx`

```typescript
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

interface BuyPlanButtonProps {
  planName: string;
  planPrice: number;
  onboardingFee?: number;
  variant?: "default" | "outline";
  className?: string;
}

const BuyPlanButton = ({ 
  planName, 
  planPrice, 
  onboardingFee = 0,
  variant = "default",
  className = ""
}: BuyPlanButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    trackEvent('payment_initiated', {
      plan_name: planName,
      plan_price: planPrice,
      onboarding_fee: onboardingFee
    });
    setIsLoading(true);

    try {
      // Call backend to create checkout session
      const response = await fetch("YOUR_EDGE_FUNCTION_URL/create-buy-plan-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          planPrice: parseFloat(planPrice.toString()),
          onboardingFee: parseFloat(onboardingFee.toString()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate checkout");
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to start checkout process. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      variant={variant}
      size="lg"
      className={`w-full ${className}`}
    >
      {isLoading ? "Processing..." : "Pay Now"}
    </Button>
  );
};

export default BuyPlanButton;
```

**Usage Example:**
```tsx
<BuyPlanButton 
  planName="Pro" 
  planPrice={1950} 
  onboardingFee={200}
  variant="default"
/>
```

**Key Points:**
- Makes POST request to backend with plan details
- Receives checkout URL and performs full redirect
- Includes loading state and error handling
- Analytics tracking for payment initiation

---

## 3. Backend: Webhook Handler

**File:** `supabase/functions/stripe-webhook/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    // Get Stripe secret key and webhook secret
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeKey || !webhookSecret) {
      throw new Error('Missing Stripe configuration');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get raw body and signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Webhook event type:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Payment successful for session:', session.id);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Amount paid:', session.amount_total);
      console.log('Metadata:', session.metadata);

      // Initialize Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Store payment record (example - adjust to your schema)
      const { error: dbError } = await supabase
        .from('payments')
        .insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          plan_name: session.metadata?.planName,
          plan_price: session.metadata?.planPrice,
          onboarding_fee: session.metadata?.onboardingFee,
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the webhook, just log the error
      }

      // TODO: Add your fulfillment logic here:
      // - Send confirmation email
      // - Grant user access to purchased plan
      // - Create user account if needed
      // - Update user subscription status
    }

    // Return 200 to acknowledge receipt
    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

**Key Points:**
- Verifies webhook signature for security
- Handles `checkout.session.completed` event
- Stores payment data in database
- Returns 200 to acknowledge webhook
- Must be publicly accessible (no JWT verification)

**Configuration in `supabase/config.toml`:**
```toml
[functions.stripe-webhook]
verify_jwt = false  # Webhooks must be public
```

---

## 4. Stripe Dashboard Configuration Checklist

### API Keys Setup
- [ ] Get **Publishable Key** from Dashboard → Developers → API keys
- [ ] Get **Secret Key** from Dashboard → Developers → API keys
- [ ] Store Secret Key in environment variable `STRIPE_SECRET_KEY`
- [ ] For production, use live keys instead of test keys

### Webhook Configuration
- [ ] Go to Dashboard → Developers → Webhooks
- [ ] Click "Add endpoint"
- [ ] Enter webhook URL: `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
- [ ] Select events to listen to:
  - [x] `checkout.session.completed`
  - [ ] `checkout.session.expired` (optional)
  - [ ] `payment_intent.succeeded` (optional)
- [ ] Copy the **Webhook Signing Secret**
- [ ] Store in environment variable `STRIPE_WEBHOOK_SECRET`

### Product/Price Setup (Optional)
**Option 1: Dynamic Products (Current Implementation)**
- Products are created dynamically via the API
- No pre-configuration needed in Dashboard
- Product details come from frontend (planName, planPrice)

**Option 2: Pre-defined Products**
- [ ] Go to Dashboard → Products
- [ ] Click "Add product"
- [ ] Set product name, description
- [ ] Set pricing model (one-time payment)
- [ ] Set currency (GBP)
- [ ] Copy the Price ID
- [ ] Use Price ID instead of `price_data` in checkout session

### Testing
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Any future expiry date
- [ ] Any 3-digit CVC
- [ ] Any postal code
- [ ] Test webhook delivery in Dashboard → Webhooks → Test events

### Production Checklist
- [ ] Switch to live API keys
- [ ] Update webhook endpoint to production URL
- [ ] Enable live mode in Stripe Dashboard
- [ ] Test full payment flow end-to-end
- [ ] Set up email notifications in Stripe
- [ ] Configure payment receipts
- [ ] Set up dispute notifications

---

## Environment Variables Required

```bash
# Supabase Edge Functions
STRIPE_SECRET_KEY=sk_test_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx...

# Frontend (if needed)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
```

---

## Database Schema (Optional)

If you want to store payment records:

```sql
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  stripe_session_id text not null unique,
  customer_email text not null,
  amount_total integer not null,
  currency text not null,
  payment_status text not null,
  plan_name text,
  plan_price text,
  onboarding_fee text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.payments enable row level security;

-- Admins can view all payments
create policy "Admins can view payments"
on public.payments
for select
to authenticated
using (is_admin());
```

---

## Testing the Integration

1. **Start your development server**
2. **Click "Pay Now" button** with test plan data
3. **Use test card** 4242 4242 4242 4242
4. **Complete checkout**
5. **Verify webhook** received in Stripe Dashboard → Webhooks → Events
6. **Check database** for payment record

---

## Common Issues & Solutions

**Issue:** Webhook signature verification fails
- **Solution:** Ensure you're using raw request body (not parsed JSON)

**Issue:** CORS errors on frontend
- **Solution:** Check CORS headers in edge function

**Issue:** Checkout session creation fails
- **Solution:** Verify Secret Key is correct and has proper permissions

**Issue:** Webhook not receiving events
- **Solution:** Check webhook URL is publicly accessible and matches Stripe Dashboard

**Issue:** Wrong currency or amount
- **Solution:** Verify amount is in smallest currency unit (pence for GBP)

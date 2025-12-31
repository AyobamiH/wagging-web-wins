import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { getCorsHeaders } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rateLimit.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const allowed = await rateLimit(req, 'stripe-session-status');
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing session_id parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    let subscription = null;
    if (session.subscription) {
      subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    }

    const response = {
      status: session.payment_status,
      customer: session.customer_details,
      subscription: subscription ? {
        id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
      } : null,
      plan: session.metadata?.planName || 'unknown',
      amount: session.amount_total,
      currency: session.currency,
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in stripe-session-status:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to retrieve session status' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

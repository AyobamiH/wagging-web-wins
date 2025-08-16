import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function started');

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      throw new Error('STRIPE_SECRET_KEY is not set');
    }

    const { planId, planName, price, currency } = await req.json();
    console.log('Request data:', { planId, planName, price, currency });

    if (!planId || !planName || !price) {
      throw new Error('Missing required fields: planId, planName, or price');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const origin = req.headers.get('origin') || 'https://your-domain.com';
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'gbp',
            product_data: {
              name: `${planName} Website Package`,
              description: `Professional pet care website - ${planName} package`,
            },
            unit_amount: price, // Price should already be in pence/cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        planId: planId,
        planName: planName,
      },
    });

    console.log('Checkout session created:', session.id);

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
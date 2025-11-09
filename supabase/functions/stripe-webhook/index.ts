import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    console.log('Webhook received');

    // Get Stripe secret key and webhook secret
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not set');
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not set');
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get raw body and signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('No stripe-signature header found');
      throw new Error('No Stripe signature found');
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('Webhook signature verified successfully');
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (import.meta.env?.DEV) console.log('Webhook event type:', event.type);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Idempotency check
    const { data: existingEvent } = await supabase
      .from('payments_events')
      .select('event_id')
      .eq('event_id', event.id)
      .single();

    if (existingEvent) {
      if (import.meta.env?.DEV) console.log('Event already processed:', event.id);
      return new Response(
        JSON.stringify({ received: true, message: 'Already processed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (import.meta.env?.DEV) {
        console.log('Payment successful for session:', session.id);
        console.log('Customer email:', session.customer_details?.email);
        console.log('Amount paid:', session.amount_total, session.currency);
      }

      const userId = session.client_reference_id || session.metadata?.userId;
      const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

      // Fetch subscription if exists
      let subscription = null;
      if (session.subscription) {
        subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      }

      // Upsert customer
      if (session.customer && session.customer_details?.email) {
        await supabase.from('customers').upsert({
          user_id: userId || null,
          stripe_customer_id: session.customer as string,
          email: session.customer_details.email,
          name: session.customer_details.name || null,
        }, { onConflict: 'stripe_customer_id' });
      }

      // Insert payment record
      await supabase.from('payments').insert({
        user_id: userId || null,
        stripe_customer_id: session.customer as string,
        session_id: session.id,
        subscription_id: subscription?.id || null,
        price_id: subscription?.items.data[0]?.price.id || session.metadata?.priceId || null,
        amount_total: session.amount_total,
        currency: session.currency,
        status: session.payment_status || 'paid',
        current_period_end: subscription?.current_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString() 
          : null,
        raw_event: event as any,
      });

      // Upsert subscription if exists
      if (subscription && userId) {
        await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          plan: session.metadata?.planName || 'unknown',
          price_id: subscription.items.data[0]?.price.id,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }, { onConflict: 'stripe_subscription_id' });
      }

      // TODO: Send confirmation email via Resend
      // await sendConfirmationEmail(session.customer_details?.email, session);
      
      if (import.meta.env?.DEV) console.log('Fulfillment completed for session:', session.id);
    }

    // Handle invoice events
    if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as any;
      const status = event.type === 'invoice.payment_succeeded' ? 'paid' : 'failed';
      
      await supabase
        .from('payments')
        .update({ status })
        .eq('subscription_id', invoice.subscription);
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as any;
      
      if (event.type === 'customer.subscription.deleted') {
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);
      } else {
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
      }
    }

    // Record event as processed
    await supabase.from('payments_events').insert({ event_id: event.id });

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

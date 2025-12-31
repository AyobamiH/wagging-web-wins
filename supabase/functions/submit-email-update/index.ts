import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rateLimit.ts";
import { emailUpdateSchema } from "../_shared/validation.ts";
import { generateSignature } from "../_shared/webhookSignature.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const allowed = await rateLimit(req, 'submit-email-update', { tokensPerSecond: 0.5, burstCapacity: 3 });
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // SECURITY: Check payload size to prevent DoS attacks
    const contentLength = parseInt(req.headers.get('content-length') || '0');
    if (contentLength > 5000) {
      return new Response(
        JSON.stringify({ error: 'Payload too large' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    
    // Validate input
    const validation = emailUpdateSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { email } = validation.data;
    if (import.meta.env?.DEV) console.log('Received email update');

    // SECURITY: Send to webhook with signature verification
    const webhookUrl = Deno.env.get('N8N_EMAIL_UPDATE_WEBHOOK_URL');
    const webhookSecret = Deno.env.get('N8N_WEBHOOK_SECRET');
    
    if (!webhookUrl) {
      console.error('N8N_EMAIL_UPDATE_WEBHOOK_URL not configured');
      throw new Error('Webhook configuration missing');
    }

    const payload = JSON.stringify({
      email,
      timestamp: new Date().toISOString(),
      source: 'tools_page'
    });

    // Generate HMAC signature for webhook security
    const signature = webhookSecret 
      ? await generateSignature(payload, webhookSecret)
      : undefined;
    
    const webhookHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (signature) {
      webhookHeaders['X-Webhook-Signature'] = signature;
    } else {
      console.warn('N8N_WEBHOOK_SECRET not set - webhook signature disabled');
    }
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: webhookHeaders,
      body: payload,
    });

    if (!webhookResponse.ok) {
      console.error('Webhook response not ok:', webhookResponse.status);
      throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
    }
    
    if (import.meta.env?.DEV) console.log('Email sent to webhook successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email subscription successful'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in submit-email-update function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit email',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
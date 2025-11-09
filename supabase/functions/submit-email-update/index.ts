import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rateLimit.ts";
import { emailUpdateSchema } from "../_shared/validation.ts";

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

    // Send to webhook
    const webhookUrl = Deno.env.get('N8N_EMAIL_UPDATE_WEBHOOK_URL') || 'https://n8n.srv920835.hstgr.cloud/webhook/email-updates';
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: 'tools_page'
      }),
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
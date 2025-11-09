import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders } from "../_shared/cors.ts";
import { rateLimit } from "../_shared/rateLimit.ts";
import { contactSchema } from "../_shared/validation.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const allowed = await rateLimit(req, 'submit-message', { tokensPerSecond: 0.2, burstCapacity: 2 });
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid form data', 
          details: validation.error.issues.map(i => i.message) 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const messageData = validation.data;
    if (import.meta.env?.DEV) console.log('Received message data');

    // Send to webhook
    const webhookUrl = Deno.env.get('N8N_MESSAGES_WEBHOOK_URL') || 'https://n8n.srv920835.hstgr.cloud/webhook/messages';
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...messageData,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      }),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook response not ok:', webhookResponse.status);
      throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
    }
    
    if (import.meta.env?.DEV) console.log('Message sent to webhook successfully');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message submitted successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in submit-message function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit message',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
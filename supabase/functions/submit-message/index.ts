import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface MessageData {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  services?: string[];
  postcode?: string;
  message?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const messageData: MessageData = await req.json();
    console.log('Received message data:', messageData);

    // Send to webhook
    const webhookUrl = 'https://n8n.srv920835.hstgr.cloud/webhook/messages';
    
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
      console.error('Webhook response not ok:', webhookResponse.status, webhookResponse.statusText);
      throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
    } else {
      console.log('Message sent to webhook successfully');
    }

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
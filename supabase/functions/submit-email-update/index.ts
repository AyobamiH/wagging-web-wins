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

interface EmailUpdateData {
  email: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: EmailUpdateData = await req.json();
    console.log('Received email update:', email);

    // Insert into Supabase (with UPSERT to handle duplicates)
    const { data, error } = await supabase
      .from('email_updates')
      .upsert([{ email }], { 
        onConflict: 'email',
        ignoreDuplicates: true 
      })
      .select()
      .single();

    if (error && error.code !== '23505') { // Ignore duplicate key errors
      console.error('Database error:', error);
      throw error;
    }

    console.log('Email saved to database:', data);

    // Send to webhook
    const webhookUrl = 'https://n8n.srv920835.hstgr.cloud/webhook/email-updates';
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        id: data?.id,
        created_at: data?.created_at || new Date().toISOString(),
        source: 'tools_page'
      }),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook response not ok:', webhookResponse.status, webhookResponse.statusText);
    } else {
      console.log('Email sent to webhook successfully');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email subscription successful',
      id: data?.id 
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
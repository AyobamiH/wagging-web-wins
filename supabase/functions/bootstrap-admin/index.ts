// Edge function to bootstrap the first admin user
// This should only work once - when there are no admin users yet

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BootstrapRequest {
  email: string;
  password: string;
  secret: string; // A secret key to prevent unauthorized bootstrapping
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { email, password, secret } = await req.json() as BootstrapRequest;

    // Validate secret - this prevents unauthorized admin creation
    const BOOTSTRAP_SECRET = Deno.env.get('BOOTSTRAP_SECRET');
    if (!BOOTSTRAP_SECRET) {
      return new Response(
        JSON.stringify({ 
          error: 'Bootstrap is not configured. Set BOOTSTRAP_SECRET in your secrets.' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    if (secret !== BOOTSTRAP_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Invalid bootstrap secret' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      );
    }

    // Check if any admin users already exist
    const { data: existingAdmins, error: checkError } = await supabaseClient
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (checkError) {
      throw checkError;
    }

    if (existingAdmins && existingAdmins.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Admin user already exists. Bootstrap is only allowed when no admins exist.' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      );
    }

    // Create the user
    const { data: userData, error: createError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    });

    if (createError) {
      throw createError;
    }

    if (!userData.user) {
      throw new Error('User creation failed');
    }

    // Add admin role
    const { error: roleError } = await supabaseClient
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin',
      });

    if (roleError) {
      // Clean up the user if role assignment fails
      await supabaseClient.auth.admin.deleteUser(userData.user.id);
      throw roleError;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Admin user created successfully',
        userId: userData.user.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Bootstrap admin error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during admin bootstrap' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

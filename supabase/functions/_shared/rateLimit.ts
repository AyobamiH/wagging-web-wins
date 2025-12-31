import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface RateLimitConfig {
  tokensPerSecond: number;
  burstCapacity: number;
}

const defaultConfig: RateLimitConfig = {
  tokensPerSecond: 1,
  burstCapacity: 5,
};

export async function rateLimit(
  req: Request,
  routeName: string,
  config: RateLimitConfig = defaultConfig
): Promise<boolean> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get client identifier (IP + route)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
              req.headers.get('x-real-ip') || 
              'unknown';
  const key = `${ip}:${routeName}`;

  try {
    // Get current state
    const { data: existing } = await supabase
      .from('rate_limits')
      .select('tokens, updated_at')
      .eq('key', key)
      .single();

    const now = Date.now();
    const secondsSinceUpdate = existing 
      ? (now - new Date(existing.updated_at).getTime()) / 1000 
      : 0;

    // Calculate new token count
    const newTokens = existing
      ? Math.min(
          config.burstCapacity,
          existing.tokens + secondsSinceUpdate * config.tokensPerSecond
        )
      : config.burstCapacity;

    if (newTokens < 1) {
      return false; // Rate limit exceeded
    }

    // Consume a token
    await supabase
      .from('rate_limits')
      .upsert({
        key,
        tokens: newTokens - 1,
        updated_at: new Date(now).toISOString(),
      });

    return true;
  } catch (error) {
    console.error('Rate limit error:', error);
    // SECURITY: Fail closed (deny request) if rate limiting has issues
    // This prevents abuse during system failures or attacks on the rate limit system
    return false;
  }
}

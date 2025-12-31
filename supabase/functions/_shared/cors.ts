export function getCorsHeaders(req: Request): HeadersInit {
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
  
  // Fallback for development
  if (allowedOrigins.length === 0) {
    allowedOrigins.push('https://tailwaggingwebdesign.com', 'https://www.tailwaggingwebdesign.com');
  }

  const origin = req.headers.get('origin') || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };
}

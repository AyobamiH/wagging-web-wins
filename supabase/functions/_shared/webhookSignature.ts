/**
 * SECURITY: Webhook signature verification to prevent unauthorized requests
 * 
 * This module provides HMAC-SHA256 signature generation and verification
 * for n8n webhook integrations. All webhook requests must include a valid
 * signature in the X-Webhook-Signature header to be accepted.
 * 
 * Setup:
 * 1. Set N8N_WEBHOOK_SECRET in Supabase secrets
 * 2. Configure n8n to verify incoming signatures
 * 3. All webhook calls must use generateSignature()
 */

/**
 * Generates HMAC-SHA256 signature for webhook payload
 * @param payload - JSON string to sign
 * @param secret - Shared secret key
 * @returns Base64-encoded signature
 */
export async function generateSignature(
  payload: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(payload);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  
  // Convert to base64 for transmission
  const signatureArray = new Uint8Array(signature);
  return btoa(String.fromCharCode(...signatureArray));
}

/**
 * Verifies HMAC-SHA256 signature from incoming webhook
 * @param payload - JSON string received
 * @param signature - Base64-encoded signature from header
 * @param secret - Shared secret key
 * @returns true if signature is valid
 */
export async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const expectedSignature = await generateSignature(payload, secret);
    return signature === expectedSignature;
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

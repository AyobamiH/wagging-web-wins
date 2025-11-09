// Zod validation schemas for reuse across edge functions
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  phone: z.string().max(20, 'Phone number too long').optional(),
  business: z.string().max(100, 'Business name too long').optional(),
  services: z.array(z.string()).optional(),
  postcode: z.string().max(20, 'Postcode too long').optional(),
  message: z.string().max(5000, 'Message too long').optional(),
});

export const emailUpdateSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
});

export const checkoutSessionSchema = z.object({
  planName: z.string().min(1),
  planPrice: z.number().positive(),
  onboardingFee: z.number().nonnegative().optional(),
  userId: z.string().uuid().optional(),
});

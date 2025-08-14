-- Drop the insecure policy that allows all authenticated users to view messages
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.messages;

-- Drop the similar policy for email_updates if it exists
DROP POLICY IF EXISTS "Authenticated users can view email updates" ON public.email_updates;

-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to manage admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Create secure policy for messages - only admins can view
CREATE POLICY "Only admins can view messages" 
ON public.messages 
FOR SELECT 
USING (public.is_admin());

-- Create secure policy for email_updates - only admins can view
CREATE POLICY "Only admins can view email updates" 
ON public.email_updates 
FOR SELECT 
USING (public.is_admin());

-- Policy for user_roles table - users can only see their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only allow admins to manage roles
CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin());

-- Insert the first admin user (you'll need to replace this with your actual user ID after creating an account)
-- This is commented out because you need to sign up first and get your user ID
-- INSERT INTO public.user_roles (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');
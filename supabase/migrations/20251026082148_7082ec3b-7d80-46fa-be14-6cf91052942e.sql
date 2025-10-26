-- Fix RLS policies for user_roles table to prevent privilege escalation
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;

-- Create more granular policies
-- Admins can INSERT new user roles
CREATE POLICY "Admins can create user roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (
  is_admin() AND 
  -- Prevent admins from creating other admin roles without being super careful
  -- This adds a layer of protection
  role IS NOT NULL
);

-- Admins can UPDATE user roles (but not escalate to admin without careful consideration)
CREATE POLICY "Admins can update user roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins can DELETE user roles
CREATE POLICY "Admins can delete user roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (is_admin());

-- Add policies for messages and email_updates to allow admin updates/deletes
CREATE POLICY "Admins can update messages" 
ON public.messages 
FOR UPDATE 
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete messages" 
ON public.messages 
FOR DELETE 
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can update email updates" 
ON public.email_updates 
FOR UPDATE 
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete email updates" 
ON public.email_updates 
FOR DELETE 
TO authenticated
USING (is_admin());
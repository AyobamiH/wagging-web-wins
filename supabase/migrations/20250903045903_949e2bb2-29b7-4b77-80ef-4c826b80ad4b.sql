-- Add RLS policies for admin access to posts table
CREATE POLICY "Admins can insert posts" 
ON public.posts 
FOR INSERT 
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admins can update posts" 
ON public.posts 
FOR UPDATE 
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete posts" 
ON public.posts 
FOR DELETE 
TO authenticated
USING (is_admin());

-- Add unique constraint on slug to prevent duplicates
ALTER TABLE public.posts ADD CONSTRAINT posts_slug_unique UNIQUE (slug);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog', 'blog', true);

-- Create policies for blog image uploads
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog');

CREATE POLICY "Admins can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog' AND is_admin());

CREATE POLICY "Admins can update blog images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog' AND is_admin());

CREATE POLICY "Admins can delete blog images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog' AND is_admin());
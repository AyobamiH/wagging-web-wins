import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { SupabasePostRepository } from '@/lib/repositories/supabase-adapters';
import type { Post, PostSeed } from '@/lib/repositories/types';
import { ArrowLeft, Save, Eye } from 'lucide-react';

const postSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  content: z.string().min(1, 'Content is required'),
  pillarTag: z.string().optional(),
  ogImageUrl: z.string().optional(),
  coverAlt: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

const BlogEditor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const postRepo = new SupabasePostRepository();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const watchTitle = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !id) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, id]);

  // Load existing post for editing
  useEffect(() => {
    const loadPost = async () => {
      if (id && id !== 'new') {
        try {
          setLoading(true);
          const existingPost = await postRepo.getById(id);
          if (existingPost) {
            setPost(existingPost);
            reset({
              slug: existingPost.slug,
              title: existingPost.title,
              excerpt: existingPost.excerpt,
              metaTitle: existingPost.metaTitle,
              metaDescription: existingPost.metaDescription,
              content: existingPost.content,
              pillarTag: existingPost.pillarTag || '',
              ogImageUrl: existingPost.ogImageUrl || '',
              coverAlt: existingPost.coverAlt || '',
            });
            // Note: We'd need to extend the Post type to include published and featured status
            setPublished(true); // Default for now
            setFeatured(false); // Default for now
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load post",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadPost();
  }, [id, reset, toast]);

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);
      
      const postData: PostSeed = {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        content: data.content,
        pillarTag: data.pillarTag,
        ogImageUrl: data.ogImageUrl,
        coverAlt: data.coverAlt,
        publishedAt: new Date().toISOString(),
      };

      if (id && id !== 'new' && post) {
        await postRepo.update(post.id, postData);
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        await postRepo.create(postData);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
        navigate('/admin/blog');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog List
        </Button>
        <h1 className="text-3xl font-bold">
          {id === 'new' ? 'Create New Post' : 'Edit Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>The main content of your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter post title"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="post-url-slug"
                  />
                  {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    {...register('excerpt')}
                    placeholder="Brief description of the post"
                    rows={3}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    {...register('content')}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="pillarTag">Pillar Tag</Label>
                  <Input
                    id="pillarTag"
                    {...register('pillarTag')}
                    placeholder="e.g., pet-care-tips"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Search engine optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...register('metaTitle')}
                    placeholder="SEO title"
                  />
                  {errors.metaTitle && (
                    <p className="text-sm text-destructive">{errors.metaTitle.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...register('metaDescription')}
                    placeholder="SEO description"
                    rows={3}
                  />
                  {errors.metaDescription && (
                    <p className="text-sm text-destructive">{errors.metaDescription.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImageUrl">OG Image URL</Label>
                  <Input
                    id="ogImageUrl"
                    {...register('ogImageUrl')}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverAlt">Cover Alt Text</Label>
                  <Input
                    id="coverAlt"
                    {...register('coverAlt')}
                    placeholder="Alt text for cover image"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/blog')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
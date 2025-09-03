// Supabase adapters for the repository interfaces

import { supabase } from "@/integrations/supabase/client";
import type { PostRepository, SettingsRepository, Post, PostSeed, PostListParams, ReviewCount } from "./types";

export class SupabasePostRepository implements PostRepository {
  async getBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post:', error);
      throw new Error('Failed to fetch post');
    }

    if (!data) return null;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq ? (data.faq as Array<{ q: string; a: string }>) : undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    };
  }

  async list(params: PostListParams = {}): Promise<Post[]> {
    let query = supabase
      .from('posts')
      .select('*')
      .eq('published', true);

    if (params.featuredFirst) {
      // Prioritize posts marked as featured in extras JSONB
      query = query.order('extras->>featured', { ascending: false, nullsFirst: false });
    }

    query = query.order('published_at', { ascending: false });

    if (params.pillar) {
      query = query.eq('pillar_tag', params.pillar);
    }

    if (params.limit) {
      query = query.limit(params.limit);
    }

    if (params.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }

    return (data || []).map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      metaTitle: item.meta_title,
      metaDescription: item.meta_description,
      content: item.content,
      faq: item.faq ? (item.faq as Array<{ q: string; a: string }>) : undefined,
      pillarTag: item.pillar_tag || undefined,
      publishedAt: item.published_at,
      ogImageUrl: item.og_image_url || undefined,
      coverAlt: item.cover_alt || undefined,
    }));
  }

  async seed(posts: PostSeed[]): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .insert(posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        meta_title: post.metaTitle,
        meta_description: post.metaDescription,
        content: post.content,
        faq: post.faq,
        pillar_tag: post.pillarTag,
        og_image_url: post.ogImageUrl,
        cover_alt: post.coverAlt,
        published_at: post.publishedAt || new Date().toISOString(),
      })));

    if (error) {
      console.error('Error seeding posts:', error);
      throw new Error('Failed to seed posts');
    }
  }

  async create(post: PostSeed): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        meta_title: post.metaTitle,
        meta_description: post.metaDescription,
        content: post.content,
        faq: post.faq,
        pillar_tag: post.pillarTag,
        og_image_url: post.ogImageUrl,
        cover_alt: post.coverAlt,
        published_at: post.publishedAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq ? (data.faq as Array<{ q: string; a: string }>) : undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    };
  }

  async update(id: string, post: Partial<PostSeed>): Promise<Post> {
    const updateData: any = {};
    if (post.slug !== undefined) updateData.slug = post.slug;
    if (post.title !== undefined) updateData.title = post.title;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.metaTitle !== undefined) updateData.meta_title = post.metaTitle;
    if (post.metaDescription !== undefined) updateData.meta_description = post.metaDescription;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.faq !== undefined) updateData.faq = post.faq;
    if (post.pillarTag !== undefined) updateData.pillar_tag = post.pillarTag;
    if (post.ogImageUrl !== undefined) updateData.og_image_url = post.ogImageUrl;
    if (post.coverAlt !== undefined) updateData.cover_alt = post.coverAlt;
    if (post.publishedAt !== undefined) updateData.published_at = post.publishedAt;

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq ? (data.faq as Array<{ q: string; a: string }>) : undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    };
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }

  async getById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post by id:', error);
      throw new Error('Failed to fetch post');
    }

    if (!data) return null;

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq ? (data.faq as Array<{ q: string; a: string }>) : undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    };
  }
}

export class SupabaseSettingsRepository implements SettingsRepository {
  async getReviewCount(): Promise<ReviewCount> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('review_count')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching review count:', error);
      throw new Error('Failed to fetch review count');
    }

    if (!data?.review_count) {
      // Fallback data if not found
      return {
        total: 312,
        average: 4.8,
        breakdown: { 5: 267, 4: 35, 3: 8, 2: 2, 1: 0 }
      };
    }

    return data.review_count as unknown as ReviewCount;
  }

  async getCalendlyUrl(): Promise<string> {
    // Return hardcoded URL since column doesn't exist yet
    return 'https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call';
  }
}
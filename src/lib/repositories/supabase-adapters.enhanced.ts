// Enhanced Supabase adapters with proper error handling and pagination

import { supabase } from "@/integrations/supabase/client";
import type { 
  PostRepository, 
  SettingsRepository, 
  Post, 
  PostSeed, 
  PostListParams, 
  ReviewCount,
  LovableListParams,
  LovableCategory,
  LovableExtras
} from "./types";
import { createRepositoryError, NotFoundError, DatabaseError } from "@/lib/errors";

export class EnhancedSupabasePostRepository implements PostRepository {
  async getBySlug(slug: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        throw new DatabaseError('Database query failed', error);
      }

      if (!data) return null;

      return this.mapToPost(data);
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'post', error);
    }
  }

  async list(params: PostListParams = {}): Promise<Post[]> {
    try {
      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('published', true);

      if (params.featuredFirst) {
        query = query.order('extras->>featured', { ascending: false, nullsFirst: false });
      }

      query = query.order('published_at', { ascending: false });

      if (params.pillar) {
        query = query.eq('pillar_tag', params.pillar);
      }

      // Pagination support
      const limit = params.limit || 50;
      const offset = params.offset || 0;
      
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        throw new DatabaseError('Failed to fetch posts list', error);
      }

      return (data || []).map((item) => this.mapToPost(item));
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'posts', error);
    }
  }

  // Lovable-specific methods
  async listLovablePosts(params: LovableListParams = {}): Promise<Post[]> {
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .eq('pillar_tag', 'lovable');

      // Filter by category if specified
      if (params.category) {
        query = query.eq('extras->>lovableCategory', params.category);
      }

      // Filter featured if specified
      if (params.featured) {
        query = query.eq('extras->>featured', 'true');
      }

      query = query.order('published_at', { ascending: false });

      const limit = params.limit || 50;
      const offset = params.offset || 0;
      query = query.range(offset, offset + limit - 1);

      const { data, error } = await query;

      if (error) {
        throw new DatabaseError('Failed to fetch Lovable posts', error);
      }

      return (data || []).map((item) => this.mapToPost(item));
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'lovable posts', error);
    }
  }

  async listLovableByCategory(
    category: LovableCategory, 
    params: Omit<LovableListParams, 'category'> = {}
  ): Promise<Post[]> {
    return this.listLovablePosts({ ...params, category });
  }

  async listFeaturedLovable(limit: number = 3): Promise<Post[]> {
    try {
      // First try to get explicitly featured posts
      const { data: featured, error: featuredError } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .eq('pillar_tag', 'lovable')
        .eq('extras->>featured', 'true')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (featuredError) {
        throw new DatabaseError('Failed to fetch featured Lovable posts', featuredError);
      }

      // If we have enough featured posts, return them
      if (featured && featured.length >= limit) {
        return featured.map((item) => this.mapToPost(item));
      }

      // Otherwise, fill with newest Lovable posts
      const existingIds = (featured || []).map(p => p.id);
      const remaining = limit - (featured?.length || 0);

      const { data: newest, error: newestError } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .eq('pillar_tag', 'lovable')
        .not('id', 'in', `(${existingIds.length > 0 ? existingIds.join(',') : '00000000-0000-0000-0000-000000000000'})`)
        .order('published_at', { ascending: false })
        .limit(remaining);

      if (newestError) {
        throw new DatabaseError('Failed to fetch newest Lovable posts', newestError);
      }

      const combined = [...(featured || []), ...(newest || [])];
      return combined.map((item) => this.mapToPost(item));
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'featured lovable posts', error);
    }
  }

  async seed(posts: PostSeed[]): Promise<void> {
    try {
      const { error } = await supabase
        .from('posts')
        .insert(posts.map((post) => this.mapFromPostSeed(post)));

      if (error) {
        throw new DatabaseError('Failed to seed posts', error);
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('create', 'posts (seed)', error);
    }
  }

  async create(post: PostSeed): Promise<Post> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert(this.mapFromPostSeed(post))
        .select()
        .single();

      if (error) {
        throw new DatabaseError('Failed to create post', error);
      }

      if (!data) {
        throw new DatabaseError('No data returned after post creation', null);
      }

      return this.mapToPost(data);
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('create', 'post', error);
    }
  }

  async update(id: string, post: Partial<PostSeed>): Promise<Post> {
    try {
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
      if (post.extras !== undefined) updateData.extras = post.extras;

      const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new DatabaseError('Failed to update post', error);
      }

      if (!data) {
        throw new NotFoundError('Post', id);
      }

      return this.mapToPost(data);
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof NotFoundError) throw error;
      throw createRepositoryError('update', 'post', error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new DatabaseError('Failed to delete post', error);
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('delete', 'post', error);
    }
  }

  async getById(id: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new DatabaseError('Failed to fetch post by ID', error);
      }

      if (!data) return null;

      return this.mapToPost(data);
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'post', error);
    }
  }

  // Helper methods
  private mapToPost(data: any): Post {
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
      extras: data.extras ? (data.extras as LovableExtras) : undefined,
    };
  }

  private mapFromPostSeed(post: PostSeed): any {
    return {
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
      extras: post.extras || {},
    };
  }
}

export class EnhancedSupabaseSettingsRepository implements SettingsRepository {
  async getReviewCount(): Promise<ReviewCount> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('review_count')
        .limit(1)
        .maybeSingle();

      if (error) {
        throw new DatabaseError('Failed to fetch review count', error);
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
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw createRepositoryError('fetch', 'review count', error);
    }
  }

  async getCalendlyUrl(): Promise<string> {
    return 'https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call';
  }
}

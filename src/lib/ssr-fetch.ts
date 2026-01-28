/**
 * SSR-safe data fetching utilities for prerendering
 * Uses fetch directly since TanStack Query is client-side only
 */

const SUPABASE_URL = "https://viwxxjnehceedyctevau.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3h4am5laGNlZWR5Y3RldmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMDE3NzcsImV4cCI6MjA3MDc3Nzc3N30.bQqfq-ktOHrIs6cyCYx7t8PRmrn0oaO6qPUY2mGZOrI";

// Check if we're running on the server (during prerender)
export const isSSR = typeof window === "undefined";

export interface SSRPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  faq?: Array<{ q: string; a: string }>;
  pillarTag?: string;
  publishedAt: string;
  updatedAt?: string;
  ogImageUrl?: string;
  coverAlt?: string;
}

/**
 * Fetch a single blog post by slug - works in both SSR and CSR
 */
export async function fetchPostBySlug(slug: string): Promise<SSRPost | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*`,
      {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch post ${slug}: ${response.status}`);
      return null;
    }

    const posts = await response.json();
    if (!posts || posts.length === 0) {
      return null;
    }

    const data = posts[0];
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq || undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      updatedAt: data.updated_at || undefined,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all published blog posts - works in both SSR and CSR
 */
export async function fetchAllPosts(limit = 100): Promise<SSRPost[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?published=eq.true&order=published_at.desc&limit=${limit}&select=*`,
      {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch posts: ${response.status}`);
      return [];
    }

    const posts = await response.json();
    return (posts || []).map((data: any) => ({
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      content: data.content,
      faq: data.faq || undefined,
      pillarTag: data.pillar_tag || undefined,
      publishedAt: data.published_at,
      updatedAt: data.updated_at || undefined,
      ogImageUrl: data.og_image_url || undefined,
      coverAlt: data.cover_alt || undefined,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Global cache for SSR (populated during prerender)
let ssrPostCache: Map<string, SSRPost> | null = null;

/**
 * Initialize SSR cache with all posts (called during prerender)
 */
export async function initSSRCache(): Promise<void> {
  if (!isSSR) return;
  
  const posts = await fetchAllPosts();
  ssrPostCache = new Map(posts.map(p => [p.slug, p]));
}

/**
 * Get post from SSR cache (for prerendering)
 */
export function getPostFromSSRCache(slug: string): SSRPost | null {
  if (!ssrPostCache) return null;
  return ssrPostCache.get(slug) || null;
}

/**
 * Server-side entry point for pre-rendering
 * This file is used during the build process to generate static HTML
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { initSSRCache, getPostFromSSRCache, fetchAllPosts, type SSRPost } from "./lib/ssr-fetch";

// Global post cache for SSR rendering
let postsCache: Map<string, SSRPost> = new Map();

/**
 * Initialize the SSR cache with all blog posts
 * Must be called before rendering blog post routes
 */
export async function initCache(): Promise<void> {
  const posts = await fetchAllPosts();
  postsCache = new Map(posts.map(p => [p.slug, p]));
  console.log(`📚 Loaded ${postsCache.size} posts into SSR cache`);
}

/**
 * Get a post from the cache for SSR rendering
 */
export function getPost(slug: string): SSRPost | null {
  return postsCache.get(slug) || null;
}

/**
 * Render a route to static HTML
 */
export function render(url: string) {
  const helmetContext = {};
  
  // Create a fresh QueryClient for each render
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  // For blog post routes, prefetch the data into QueryClient
  const blogPostMatch = url.match(/^\/blog\/([^/]+)$/);
  if (blogPostMatch) {
    const slug = blogPostMatch[1];
    // Skip Lovable hub routes
    if (slug !== 'lovable') {
      const post = postsCache.get(slug);
      if (post) {
        // Pre-populate the query cache with the post data
        queryClient.setQueryData(['supabase-post', slug], post);
      }
    }
  }

  // For blog index, prefetch posts list
  if (url === '/blog') {
    const allPosts = Array.from(postsCache.values());
    queryClient.setQueryData(['all-posts'], allPosts);
  }
  
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </StaticRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );

  // Extract helmet data
  const { helmet } = helmetContext as any;

  return {
    html,
    helmet: {
      title: helmet?.title?.toString() || "",
      meta: helmet?.meta?.toString() || "",
      link: helmet?.link?.toString() || "",
      script: helmet?.script?.toString() || "",
    }
  };
}

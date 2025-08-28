import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import { getPostCanonicalUrl, pillarSlugToTag, type PillarTag } from "@/lib/pillarSlugs";
import LoadingSpinner from "@/components/LoadingSpinner";
import BlogPillarDynamic from "./BlogPillarDynamic";
import { Navigate } from "react-router-dom";

const postRepository = new SupabasePostRepository();

/**
 * Legacy redirect component for old blog post URLs
 * Handles both pillar slugs and post slugs that come through /blog/:slug
 */
export default function BlogLegacyPostRedirect() {
  const { slug } = useParams<{ slug: string }>();

  // First check if this is actually a pillar slug
  const pillarTag = slug ? pillarSlugToTag(slug) : null;
  
  if (pillarTag) {
    // This is a pillar slug, render the dynamic pillar component directly
    // We need to pass the pillarSlug as a param to the component
    return <BlogPillarDynamic />;
  }

  // Otherwise, try to fetch as a post
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['legacy-post-redirect', slug],
    queryFn: () => postRepository.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    // If post not found, redirect to blog index
    return <Navigate to="/blog" replace />;
  }

  // If post has no pillar tag, keep at old URL structure
  if (!post.pillarTag) {
    return <Navigate to={`/blog/${slug}`} replace />;
  }

  // Redirect to new nested URL structure
  const canonicalUrl = getPostCanonicalUrl(post.slug, post.pillarTag as PillarTag);
  return <Navigate to={canonicalUrl} replace />;
}

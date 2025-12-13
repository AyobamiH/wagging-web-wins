import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import { EnhancedSupabasePostRepository } from "@/lib/repositories/supabase-adapters.enhanced";
import { LOVABLE_CATEGORIES, type LovableCategory as LovableCategoryType } from "@/lib/repositories/types";
import { LovableBreadcrumbs } from "@/components/lovable/LovableBreadcrumbs";
import { LovablePostCard } from "@/components/lovable/LovablePostCard";
import { LovableCTA } from "@/components/lovable/LovableCTA";
import { getCategoryTitle, getCategoryDescription } from "@/components/lovable/LovableCategoryCard";
import { trackLovableCategoryView } from "@/lib/analytics";

const postRepository = new EnhancedSupabasePostRepository();
const POSTS_PER_PAGE = 12;

function isValidCategory(cat: string): cat is LovableCategoryType {
  return LOVABLE_CATEGORIES.includes(cat as LovableCategoryType);
}

export default function LovableCategory() {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  // Validate category
  if (!category || !isValidCategory(category)) {
    return <Navigate to="/blog/lovable" replace />;
  }

  useEffect(() => {
    trackLovableCategoryView(category);
  }, [category]);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['lovable-category', category, page],
    queryFn: () => postRepository.listLovableByCategory(category, {
      limit: POSTS_PER_PAGE,
      offset: (page - 1) * POSTS_PER_PAGE,
    }),
  });

  const { data: totalPosts } = useQuery({
    queryKey: ['lovable-category-count', category],
    queryFn: () => postRepository.listLovableByCategory(category, { limit: 1000 }),
  });

  const totalCount = totalPosts?.length || 0;
  const hasMore = (posts?.length || 0) === POSTS_PER_PAGE && page * POSTS_PER_PAGE < totalCount;
  const categoryTitle = getCategoryTitle(category);
  const categoryDescription = getCategoryDescription(category);

  return (
    <>
      <Seo
        title={`${categoryTitle} | Lovable Content Hub`}
        description={`${categoryDescription}. Browse all ${categoryTitle.toLowerCase()} posts for Lovable builders.`}
        path={`/blog/lovable/${category}`}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Lovable", item: "/blog/lovable" },
          { name: categoryTitle, item: `/blog/lovable/${category}` },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "url": `https://tailwaggingwebdesign.com/blog/lovable/${category}`,
            "name": `${categoryTitle} - Lovable Content Hub`,
            "description": categoryDescription,
            "isPartOf": {
              "@type": "CollectionPage",
              "name": "Lovable Content Hub",
              "url": "https://tailwaggingwebdesign.com/blog/lovable"
            }
          }
        ]}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <LovableBreadcrumbs category={category} />

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {categoryTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {categoryDescription}
            </p>
            {totalCount > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                {totalCount} {totalCount === 1 ? 'post' : 'posts'}
              </p>
            )}
          </header>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 mb-12">
              <p className="text-muted-foreground">Failed to load posts. Please try again.</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {posts.map((post) => (
                  <LovablePostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mb-12">
                {page > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => p - 1)}
                  >
                    Previous
                  </Button>
                )}
                {hasMore && (
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => p + 1)}
                  >
                    Load More
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="text-center py-16 border border-dashed border-border rounded-xl mb-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  We're working on {categoryTitle.toLowerCase()} content. 
                  Check back soon or explore other categories.
                </p>
                <Button asChild variant="outline">
                  <a href="/blog/lovable">Browse All Categories</a>
                </Button>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <section className="mb-8">
            <LovableCTA variant="compact" location={`lovable_category_${category}`} />
          </section>
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import { EnhancedSupabasePostRepository } from "@/lib/repositories/supabase-adapters.enhanced";
import { LOVABLE_CATEGORIES, type LovableCategory } from "@/lib/repositories/types";
import { LovableBreadcrumbs } from "@/components/lovable/LovableBreadcrumbs";
import { LovableCategoryCard } from "@/components/lovable/LovableCategoryCard";
import { LovablePostCard } from "@/components/lovable/LovablePostCard";
import { LovableCTA } from "@/components/lovable/LovableCTA";
import { trackLovableHubView } from "@/lib/analytics";

const postRepository = new EnhancedSupabasePostRepository();

export default function LovableHub() {
  useEffect(() => {
    trackLovableHubView();
  }, []);

  // Fetch posts with pillar_tag = 'lovable'
  const { data: featuredPosts, isLoading: loadingFeatured } = useQuery({
    queryKey: ['lovable-featured'],
    queryFn: () => postRepository.listFeaturedLovable(3),
  });

  const { data: allLovablePosts, isLoading: loadingAll } = useQuery({
    queryKey: ['lovable-all'],
    queryFn: () => postRepository.listLovablePosts({ limit: 100 }),
  });

  // Category counts are now informational only (deprecated taxonomy)
  // In future, categories will be filtered by pillar_tag subcategories
  const categoryCounts: Record<LovableCategory, number> = {
    'guides': 0,
    'debug-diaries': 0,
    'case-studies': 0,
    'survival-notes': 0,
    'frameworks': 0,
  };

  // Count posts - temporarily still use extras.lovableCategory for display
  // This will be removed once all posts migrate to using pillar_tag only
  allLovablePosts?.forEach(post => {
    const cat = post.extras?.lovableCategory;
    if (cat && cat in categoryCounts) {
      categoryCounts[cat]++;
    }
  });

  const latestPosts = allLovablePosts?.slice(0, 6) || [];
  const hasContent = (allLovablePosts?.length || 0) > 0;

  return (
    <>
      <Seo
        title="Lovable | Tips, Guides & Debug Diaries for Lovable Builders"
        description="Master Lovable with practical guides, debug diaries, case studies, and frameworks. Real solutions from real projects to help you build faster."
        path="/blog/lovable"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Lovable", item: "/blog/lovable" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "url": "https://tailwaggingwebdesign.com/blog/lovable",
            "name": "Lovable Content Hub",
            "description": "Practical guides, debug diaries, case studies, and frameworks for Lovable builders.",
            "isPartOf": {
              "@type": "Blog",
              "name": "Tail Wagging Web Design Blog",
              "url": "https://tailwaggingwebdesign.com/blog"
            }
          }
        ]}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <LovableBreadcrumbs />

          {/* Hero Section */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Content Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Lovable
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Practical guides, debug diaries, and battle-tested frameworks for building with Lovable. 
              Real solutions from real projects.
            </p>
          </header>

          {/* Start Here Section */}
          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">🚀 Start Here</h2>
                <p className="text-muted-foreground">
                  New to Lovable? Start with our <strong>Guides</strong> for step-by-step tutorials. 
                  Hit a wall? Check <strong>Debug Diaries</strong> for real debugging sessions with solutions.
                  Want to see what's possible? Browse our <strong>Case Studies</strong>.
                </p>
              </div>
              <Button asChild size="lg">
                <Link to="/blog/lovable/guides">
                  Browse Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LOVABLE_CATEGORIES.map((category) => (
                <LovableCategoryCard 
                  key={category} 
                  category={category} 
                  postCount={categoryCounts[category]}
                />
              ))}
            </div>
          </section>

          {/* Featured Posts */}
          {loadingFeatured ? (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Featured</h2>
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
              </div>
            </section>
          ) : featuredPosts && featuredPosts.length > 0 ? (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Featured</h2>
              <div className="space-y-6">
                {featuredPosts.slice(0, 1).map((post) => (
                  <LovablePostCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
              {featuredPosts.length > 1 && (
                <div className="grid gap-6 sm:grid-cols-2 mt-6">
                  {featuredPosts.slice(1, 3).map((post) => (
                    <LovablePostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {/* Latest Posts */}
          {loadingAll ? (
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-video" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </section>
          ) : latestPosts.length > 0 ? (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Latest Posts</h2>
                {(allLovablePosts?.length || 0) > 6 && (
                  <Button variant="ghost" asChild>
                    <Link to="/blog?pillar=lovable">
                      View all
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <LovablePostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : (
            /* Placeholder when no content exists */
            <section className="mb-16 text-center py-16 border border-dashed border-border rounded-xl">
              <div className="max-w-md mx-auto">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-6">
                  We're working on the first batch of Lovable guides and tutorials. 
                  Check back soon or subscribe to get notified when new content drops.
                </p>
                <Button asChild>
                  <Link to="/contact">Get Notified</Link>
                </Button>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="mb-8">
            <LovableCTA location="lovable_hub_bottom" />
          </section>
        </div>
      </div>
    </>
  );
}

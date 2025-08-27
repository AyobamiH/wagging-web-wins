import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";

const postRepository = new SupabasePostRepository();

export default function BlogPillar6() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['pillar6-posts'],
    queryFn: () => postRepository.list({ pillar: 'pillar-6' }),
  });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">Unable to load Pillar 6 content. Please try again later.</p>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Offers, Pricing & Partnerships • Blog Pillar 6"
        description="Master pricing strategies, partnership playbooks, and referral systems that drive sustainable growth for your pet business."
        path="/blog/pillar/offers-pricing-partnerships"
        imageUrl="https://tailwaggingwebdesign.com/og/pillar6-hub.jpg"
        imageAlt="Blog Pillar 6: Offers, Pricing & Partnerships"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Offers, Pricing & Partnerships", item: "/blog/pillar/offers-pricing-partnerships" }
        ]}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Pillar 6
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Offers, Pricing & Partnerships
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Master pricing strategies, partnership playbooks, and referral systems that drive sustainable growth for your pet business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CalendlyEmbed
                buttonText="Book Strategy Call"
                className="bg-gradient-primary hover:scale-105 transition-all duration-200"
              />
              <Link to="/blog">
                <Button variant="outline">
                  View All Posts
                </Button>
              </Link>
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts?.map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50"
                >
                  <Link to={`/blog/${post.slug}`}>
                    {post.ogImageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.ogImageUrl}
                          alt={post.coverAlt || `${post.title} cover image`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Pillar 6
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
            <h2 className="text-2xl font-semibold mb-4">Ready to implement these strategies?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized guidance on pricing, partnerships, and growth strategies for your pet business.
            </p>
            <CalendlyEmbed
              buttonText="Book Free Strategy Session"
              className="bg-gradient-primary hover:scale-105 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </>
  );
}
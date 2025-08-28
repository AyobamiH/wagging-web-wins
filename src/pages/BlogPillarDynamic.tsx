import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Seo from "@/components/Seo";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import type { Post } from "@/lib/repositories/types";
import { 
  pillarSlugToTag, 
  getPillarTitle, 
  getPillarDescription,
  getPostCanonicalUrl,
  type PillarTag 
} from "@/lib/pillarSlugs";
import { trackNavClick, trackBlogPostView } from "@/lib/analytics";
import { useWebVitals } from "@/hooks/useWebVitals";

const postRepository = new SupabasePostRepository();

export default function BlogPillarDynamic() {
  const { pillarSlug } = useParams<{ pillarSlug: string }>();
  const pillarTag = pillarSlug ? pillarSlugToTag(pillarSlug) : null;

  useWebVitals();

  // Redirect if invalid pillar slug
  if (!pillarTag) {
    return <Navigate to="/blog" replace />;
  }

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['pillar-posts', pillarTag],
    queryFn: () => postRepository.list({ pillar: pillarTag }),
  });

  const pillarTitle = getPillarTitle(pillarTag);
  const pillarDescription = getPillarDescription(pillarTag);
  const pillarNumber = pillarTag.split('-')[1];

  // Special reading order for Pillar 1
  const getOrderedPosts = (posts: Post[], pillarTag: PillarTag): Post[] => {
    if (pillarTag === 'pillar-1') {
      const readingOrder = [
        'calendly-vs-built-in-booking-for-pet-sitters',
        'reduce-no-shows-pet-grooming-pet-sitting', 
        'automating-pet-sitter-care-updates-whatsapp-email-client-portal',
        'route-optimization-dog-walking-schedule-uk'
      ];
      
      const orderedPosts = readingOrder.map(slug => 
        posts.find(post => post.slug === slug)
      ).filter(Boolean) as Post[];
      
      // Add any remaining posts not in the reading order
      const remainingPosts = posts.filter(post => 
        !readingOrder.includes(post.slug)
      );
      
      return [...orderedPosts, ...remainingPosts];
    }
    
    // For other pillars, sort by published date
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  };

  const orderedPosts = getOrderedPosts(posts, pillarTag);

  return (
    <>
      <Seo 
        title={`${pillarTitle} • Pet Business Marketing`}
        description={`${pillarDescription} Complete guides for pet sitters, groomers, and other pet care professionals.`}
        path={`/blog/${pillarSlug}`}
        imageUrl={posts[0]?.ogImageUrl || "https://tailwaggingwebdesign.com/og/blog.jpg"}
        imageAlt={`${pillarTitle} guides for pet businesses`}
        keywords={[
          `pet ${pillarTitle.toLowerCase()}`, 
          "pet business marketing", 
          "pet sitting guides", 
          "pet grooming business",
          pillarSlug?.replace(/-/g, ' ')
        ].filter(Boolean)}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: pillarTitle, item: `/blog/${pillarSlug}` }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${pillarTitle} for Pet Businesses`,
            "description": pillarDescription,
            "url": `https://tailwaggingwebdesign.com/blog/${pillarSlug}`,
            "mainEntity": {
              "@type": "ItemList",
              "name": `${pillarTitle} Articles`,
              "description": `Essential guides for ${pillarTitle.toLowerCase()} in pet care businesses`
            }
          }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Pillar {pillarNumber}
              </Badge>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {pillarTitle}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {pillarDescription} These guides form the foundation of successful pet service businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalendlyEmbed 
                  buttonText="Book Free Consultation"
                  buttonSize="lg"
                  ariaLabel={`Book a free consultation to discuss ${pillarTitle.toLowerCase()}`}
                  trackingLocation={`${pillarTag}_hero`}
                />
                <Link to="/blog" onClick={() => trackNavClick('All Articles', '/blog', `${pillarTag}_header`)}>
                  <Button variant="outline" size="lg">
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Articles
                  </Button>
                </Link>
              </div>
            </div>

            {/* Special reading order for Pillar 1 */}
            {pillarTag === 'pillar-1' && (
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-full p-2 shrink-0 mt-1">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Start Here: Recommended Reading Order</h2>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>1.</strong> Calendly vs Built-In Booking → Choose your foundation</li>
                      <li><strong>2.</strong> No-Show Killers → Protect your schedule and margins</li>
                      <li><strong>3.</strong> Care Updates → Build trust and justify premium pricing</li>
                      <li><strong>4.</strong> Route Optimization → Scale efficiently while keeping margins</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-[2/1] bg-muted"></div>
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : orderedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No posts available for {pillarTitle} yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {orderedPosts.map((post, index) => (
                  <Card key={post.slug} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
                    {/* Image Thumbnail */}
                    {post.ogImageUrl && (
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src={post.ogImageUrl}
                          alt={post.coverAlt || `${post.title} thumbnail`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="315"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          Pillar {pillarNumber}
                        </Badge>
                        {pillarTag === 'pillar-1' && index < 4 && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            Step {index + 1}
                          </span>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link 
                        to={getPostCanonicalUrl(post.slug, pillarTag)}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
                        onClick={() => trackBlogPostView(post.title, post.slug, pillarTag, `${pillarTag}_post_grid`)}
                      >
                        Read Article
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your {pillarTitle}?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get personalized guidance on implementing these strategies for your specific pet service business. 
                Book a free consultation to discuss your current challenges and create an action plan.
              </p>
              <CalendlyEmbed 
                buttonText="Book Your Free Strategy Session"
                buttonSize="lg"
                ariaLabel={`Book a free strategy session to discuss ${pillarTitle.toLowerCase()}`}
                trackingLocation={`${pillarTag}_bottom_cta`}
              />
            </div>

            {/* Related Links */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Explore Other Pillars</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Link 
                  to="/blog" 
                  className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors" 
                  onClick={() => trackNavClick('All Marketing Pillars', '/blog', `${pillarTag}_related_links`)}
                >
                  <div className="bg-primary/20 rounded-full p-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">All Marketing Pillars</p>
                    <p className="text-sm text-muted-foreground">Explore all 6 pillars of pet business marketing</p>
                  </div>
                </Link>
                <Link 
                  to="/tools" 
                  className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors" 
                  onClick={() => trackNavClick('Business Tools Hub', '/tools', `${pillarTag}_related_links`)}
                >
                  <div className="bg-accent/20 rounded-full p-2">
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Business Tools Hub</p>
                    <p className="text-sm text-muted-foreground">Templates and calculators for pet professionals</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
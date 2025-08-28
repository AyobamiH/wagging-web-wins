
import { useState, useEffect } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import type { Post } from "@/lib/repositories/types";
import { trackNavClick, trackBlogPostView } from "@/lib/analytics";
import { useWebVitals } from "@/hooks/useWebVitals";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const postRepository = new SupabasePostRepository();

export default function BlogPillar2() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useWebVitals();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const pillarPosts = await postRepository.list({ pillar: 'pillar-2' });
        setPosts(pillarPosts);
      } catch (error) {
        console.error('Error fetching Pillar 2 posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const readingOrder = [
    'pet-care-homepage-f-pattern-conversion-teardown',
    'pet-care-pricing-page-3-tiers-anchor-add-ons',
    'pet-care-gallery-that-sells-before-after-reels-trust',
    'mobile-first-pet-sitter-ux-thumb-reach-tap-targets'
  ];

  const orderedPosts = readingOrder.map(slug => 
    posts.find(post => post.slug === slug)
  ).filter(Boolean) as Post[];

  return (
    <>
      <Seo
        title="Website UX & Conversion • Pet Care Professionals"
        description="Build websites that convert visitors into bookings. Master F-pattern layouts, pricing psychology, compelling galleries, and mobile-first UX that wins on every device."
        path="/blog/pillar-2"
        imageUrl="https://tailwaggingwebdesign.com/og/pet-care-homepage-f-pattern-conversion-teardown.jpg"
        imageAlt="Website UX and conversion optimization for pet care businesses"
        keywords={["pet care website design", "conversion optimization", "mobile first UX", "pricing page design", "pet business website", "F-pattern layout"]}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Website UX & Conversion", item: "/blog/pillar-2" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Website UX & Conversion for Pet Care Professionals",
            "description": "Build websites that convert visitors into bookings. Master F-pattern layouts, pricing psychology, compelling galleries, and mobile-first UX.",
            "url": "https://tailwaggingwebdesign.com/blog/pillar-2",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Pet Care Website UX Articles",
              "description": "Essential guides for building high-converting websites for pet care businesses"
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
                Pillar 2
              </Badge>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Website UX & Conversion
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Build websites that convert visitors into bookings. Master F-pattern layouts, 
                pricing psychology, compelling galleries, and mobile-first UX that wins on every device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalendlyEmbed 
                  buttonText="Get UX Help"
                  buttonSize="lg"
                  ariaLabel="Book a consultation for website UX help"
                  trackingLocation="pillar2_hero"
                />
                <Link to="/blog" onClick={() => trackNavClick('All Articles', '/blog', 'pillar2_header')}>
                  <Button variant="outline" size="lg">
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Articles
                  </Button>
                </Link>
              </div>
            </div>

            {/* Start Here Box */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 rounded-full p-2 shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">Start Here: Recommended Reading Order</h2>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>1.</strong> Homepage F-Pattern → Master the foundation of conversion design</li>
                    <li><strong>2.</strong> Pricing Psychology → Build pages that don't confuse or overwhelm</li>
                    <li><strong>3.</strong> Trust-Building Galleries → Show outcomes, not just pretty photos</li>
                    <li><strong>4.</strong> Mobile-First UX → Optimize for thumbs and one-hand use</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
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
                          Pillar 2
                        </Badge>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          Step {index + 1}
                        </span>
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
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
                        onClick={() => trackBlogPostView(post.title, post.slug, 'pillar-2', 'pillar2_post_grid')}
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
              <h2 className="text-2xl font-bold mb-4">Need Help Implementing These UX Strategies?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get personalized guidance on homepage optimization, pricing psychology, 
                and mobile-first design for your specific pet care business.
              </p>
              <CalendlyEmbed 
                buttonText="Book Your Free UX Consultation"
                buttonSize="lg"
                ariaLabel="Book a free UX consultation for your pet care website"
                trackingLocation="pillar2_bottom_cta"
              />
            </div>

            {/* Related Links */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Explore Other Pillars</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/blog/pillar-1" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors" onClick={() => trackNavClick('Pillar 1: Booking & Reliability', '/blog/pillar-1', 'pillar2_related_links')}>
                  <div className="bg-primary/20 rounded-full p-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pillar 1: Booking & Reliability</p>
                    <p className="text-sm text-muted-foreground">Foundation systems for pet businesses</p>
                  </div>
                </Link>
                <Link to="/blog/pillar-3" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors" onClick={() => trackNavClick('Pillar 3: Local SEO', '/blog/pillar-3', 'pillar2_related_links')}>
                  <div className="bg-accent/20 rounded-full p-2">
                    <BookOpen className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Pillar 3: Local SEO & Google Business Profile</p>
                    <p className="text-sm text-muted-foreground">Dominate local search results</p>
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

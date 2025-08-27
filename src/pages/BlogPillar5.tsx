import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import type { Post } from "@/lib/repositories/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Seo from "@/components/Seo";

const postRepository = new SupabasePostRepository();

export default function BlogPillar5() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['pillar5-posts'],
    queryFn: () => postRepository.list({ pillar: 'pillar-5' }),
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
        <p className="mt-2 text-muted-foreground">Unable to load Pillar 5 content. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Social Media, Stories & Email Marketing for Pet Businesses"
        description="Master social content, storytelling frameworks, email sequences, and content calendars that build trust and book more pet care services. Proven strategies for pet businesses."
        path="/blog/pillar-5"
        breadcrumbs={[
          { name: "Blog", item: "/blog" },
          { name: "Pillar 5: Social & Email Growth", item: "/blog/pillar-5" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Social Media, Stories & Email Marketing for Pet Businesses",
            "description": "Master social content, storytelling frameworks, email sequences, and content calendars that build trust and book more pet care services.",
            "url": "https://tailwaggingwebdesign.com/blog/pillar-5",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": posts.length,
              "itemListElement": posts.map((post, index) => ({
                "@type": "Article",
                "position": index + 1,
                "name": post.title,
                "description": post.excerpt,
                "url": `https://tailwaggingwebdesign.com/blog/${post.slug}`
              }))
            }
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="container relative mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl"
            >
              <Badge variant="secondary" className="mb-4 text-sm font-medium">
                Pillar 5
              </Badge>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Social, Stories & 
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Email Growth
                </span>
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-3xl mx-auto">
                Master social content, storytelling frameworks, email sequences, and content calendars that build trust and book more pet care services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <CalendlyEmbed
                  buttonText="Book Free Discovery Call"
                  buttonSize="lg"
                  className="min-w-[220px]"
                  ariaLabel="Book a Free Discovery Call for Pillar 5"
                  trackingLocation="pillar5_hero"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="font-medium">Story Frameworks</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="font-medium">Content Calendars</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span className="font-medium">Email Sequences</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Master Your Marketing Mix
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From viral social content to automated email sequences—everything you need to grow your pet care business online.
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            Pillar 5
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Read Article
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Ready to Transform Your Marketing?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Let's build a complete marketing system that attracts, engages, and converts pet owners into loyal clients.
              </p>
              <CalendlyEmbed
                buttonText="Book Strategy Session"
                buttonSize="lg"
                className="min-w-[220px]"
                ariaLabel="Book a Strategy Session for Pillar 5"
                trackingLocation="pillar5_bottom_cta"
              />
            </motion.div>

            {/* Cross-Pillar Navigation */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="font-semibold mb-4">Explore Other Pillars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blog/pillar-1" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">1</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Pillar 1: Booking & Reliability</p>
                    <p className="text-sm text-muted-foreground">Systems that convert and retain</p>
                  </div>
                </Link>
                
                <Link to="/blog/pillar-6" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">6</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Pillar 6: Offers & Partnerships</p>
                    <p className="text-sm text-muted-foreground">Pricing strategies that profit</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
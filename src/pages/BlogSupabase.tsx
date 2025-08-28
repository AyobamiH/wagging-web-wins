
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import { getPostCanonicalUrl, type PillarTag } from "@/lib/pillarSlugs";

const postRepository = new SupabasePostRepository();

export default function BlogSupabase() {
  const [selectedPillar, setSelectedPillar] = useState<string>("all");
  
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts', selectedPillar],
    queryFn: () => postRepository.list({
      pillar: selectedPillar === "all" ? undefined : selectedPillar,
      featuredFirst: true,
      limit: 50
    })
  });

  const pillars = [
    { id: "all", name: "All Posts", count: posts.length },
    { id: "pillar-1", name: "Booking & Reliability", count: posts.filter(p => p.pillarTag === "pillar-1").length },
    { id: "pillar-2", name: "Website UX & Conversion", count: posts.filter(p => p.pillarTag === "pillar-2").length },
    { id: "pillar-3", name: "Local SEO & GBP", count: posts.filter(p => p.pillarTag === "pillar-3").length },
    { id: "pillar-4", name: "Trust, Safety & Compliance", count: posts.filter(p => p.pillarTag === "pillar-4").length },
    { id: "pillar-5", name: "Client Experience & Retention", count: posts.filter(p => p.pillarTag === "pillar-5").length },
    { id: "pillar-6", name: "Content & Social Media", count: posts.filter(p => p.pillarTag === "pillar-6").length },
  ];

  const pillarHubs = [
    {
      id: "pillar-1",
      title: "Pet Business Foundations",
      description: "Master booking systems, reduce no-shows, automate updates, and optimize scheduling.",
      href: "/blog/booking-and-reliability",
      count: posts.filter(p => p.pillarTag === "pillar-1").length
    },
    {
      id: "pillar-2", 
      title: "Website UX & Conversion",
      description: "Build websites that convert visitors into bookings with proven UX strategies.",
      href: "/blog/website-ux-and-conversion",
      count: posts.filter(p => p.pillarTag === "pillar-2").length
    },
    {
      id: "pillar-3",
      title: "Local SEO & Google Business Profile", 
      description: "Master local search with Google Business Profile optimization and review strategies.",
      href: "/blog/local-seo-and-gbp",
      count: posts.filter(p => p.pillarTag === "pillar-3").length
    },
    {
      id: "pillar-4",
      title: "Trust, Safety & Compliance",
      description: "Build client trust with proper safety standards, forms, and GDPR compliance.",
      href: "/blog/trust-safety-and-compliance", 
      count: posts.filter(p => p.pillarTag === "pillar-4").length
    },
    {
      id: "pillar-5",
      title: "Client Experience & Retention",
      description: "Reduce cancellations and increase bookings with proven welcome sequences.",
      href: "/blog/client-experience-and-retention",
      count: posts.filter(p => p.pillarTag === "pillar-5").length
    },
    {
      id: "pillar-6",
      title: "Content & Social Media",
      description: "Create engaging content that builds authority and attracts ideal clients.",
      href: "/blog/content-and-social-media",
      count: posts.filter(p => p.pillarTag === "pillar-6").length
    }
  ];

  return (
    <>
      <Seo
        title="Pet Care Business Blog - Marketing Guides & Strategies"
        description="Comprehensive guides for pet care professionals. Master booking systems, local SEO, client retention, content marketing, and compliance for your pet business."
        path="/blog"
        imageUrl="/og/blog.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pet Care Business Marketing Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive guides to grow your pet care business. From booking systems to local SEO, 
            client retention to content marketing—everything you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Get Personalized Help
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#reviews">
                312+ Success Stories
              </Link>
            </Button>
          </div>
        </div>

        {/* Marketing Pillars Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            The 6 Marketing Pillars
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillarHubs.map((pillar) => (
              <Card key={pillar.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {pillar.id.split('-')[1]}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {pillar.count} Guide{pillar.count !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    <Link to={pillar.href}>
                      {pillar.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3">
                    {pillar.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium" asChild>
                    <Link to={pillar.href}>
                      Explore pillar →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {pillars.map((pillar) => (
              <Button
                key={pillar.id}
                variant={selectedPillar === pillar.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPillar(pillar.id)}
                className={`${selectedPillar === pillar.id ? '' : 'hover:bg-muted'}`}
              >
                {pillar.name}
                {pillar.count > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {pillar.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Calendly Embed */}
        <div className="mb-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Need Personalized Guidance?</h3>
            <p className="text-muted-foreground mb-4">
              Get tailored advice for your specific pet care business challenges and goals.
            </p>
            <CalendlyEmbed 
              buttonText="Book Free Strategy Call"
              buttonSize="lg"
              ariaLabel="Book a free strategy call for pet business marketing"
              trackingLocation="blog_hub"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {selectedPillar === "all" 
                ? "No posts available yet." 
                : `No posts available for ${pillars.find(p => p.id === selectedPillar)?.name}.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <Link to={getPostCanonicalUrl(post.slug, post.pillarTag as PillarTag)}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.ogImageUrl || "/og/blog.jpg"}
                      alt={post.coverAlt || `${post.title} cover image`}
                      width={400}
                      height={225}
                      loading="lazy"
                      decoding="async"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    {post.pillarTag && (
                      <Badge variant="outline" className="self-start mb-2 capitalize text-xs">
                        {post.pillarTag.replace('-', ' ')}
                      </Badge>
                    )}
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3 mb-2">
                      {post.excerpt}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </p>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Pet Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join 312+ pet care professionals who've grown their businesses with our proven strategies. 
              Get personalized guidance tailored to your specific goals and challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Your Growth Journey
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

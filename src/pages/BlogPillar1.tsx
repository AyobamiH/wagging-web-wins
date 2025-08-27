import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, BookOpen } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Seo from "@/components/Seo";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";
import type { Post } from "@/lib/repositories/types";

const postRepository = new SupabasePostRepository();

const BlogPillar1 = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const pillarPosts = await postRepository.list({ pillar: 'pillar-1' });
        setPosts(pillarPosts);
      } catch (error) {
        console.error('Error fetching Pillar 1 posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const readingOrder = [
    'calendly-vs-built-in-booking-for-pet-sitters',
    'reduce-no-shows-pet-grooming-pet-sitting', 
    'automating-pet-sitter-care-updates-whatsapp-email-client-portal',
    'route-optimization-dog-walking-schedule-uk'
  ];

  const orderedPosts = readingOrder.map(slug => 
    posts.find(post => post.slug === slug)
  ).filter(Boolean) as Post[];

  return (
    <>
      <Seo 
        title="Booking & Reliability • Pet Business Foundation"
        description="Master booking systems, reduce no-shows, automate care updates, and optimize scheduling to build a reliable pet business foundation. Complete guides for pet sitters and groomers."
        path="/blog/pillar-1"
        imageUrl="https://tailwaggingwebdesign.com/og/calendly-vs-built-in-booking-for-pet-sitters.jpg"
        imageAlt="Pet business booking and reliability systems"
        keywords={["pet booking systems", "no-show prevention", "pet sitting scheduling", "automated reminders", "pet grooming booking", "route optimization"]}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Pillar 1: Booking & Reliability", item: "/blog/pillar-1" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Booking & Reliability for Pet Businesses",
            "description": "Master booking systems, reduce no-shows, automate care updates, and optimize scheduling to build a reliable pet business foundation.",
            "url": "https://tailwaggingwebdesign.com/blog/pillar-1",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Pet Business Reliability Articles",
              "description": "Essential guides for building reliable booking and scheduling systems for pet care businesses"
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
                Pillar 1
              </Badge>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Booking, Reminders & Reliability
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Master the fundamentals that reduce booking friction, increase client trust, and protect your calendar. 
                These systems form the foundation of every successful pet service business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalendlyEmbed 
                  buttonText="Book Free Consultation"
                  buttonSize="lg"
                  ariaLabel="Book a free consultation to discuss your booking systems"
                  trackingLocation="pillar1_hero"
                />
                <Link to="/blog">
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
                    <li><strong>1.</strong> Calendly vs Built-In Booking → Choose your foundation</li>
                    <li><strong>2.</strong> No-Show Killers → Protect your schedule and margins</li>
                    <li><strong>3.</strong> Care Updates → Build trust and justify premium pricing</li>
                    <li><strong>4.</strong> Route Optimization → Scale efficiently while keeping margins</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="h-64 animate-pulse">
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
                  <Card key={post.slug} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          Pillar 1
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
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Booking Systems?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get personalized guidance on implementing these strategies for your specific pet service business. 
                Book a free consultation to discuss your current challenges and create an action plan.
              </p>
              <CalendlyEmbed 
                buttonText="Book Your Free Strategy Session"
                buttonSize="lg"
                ariaLabel="Book a free strategy session to discuss your booking systems"
                trackingLocation="pillar1_bottom_cta"
              />
            </div>

            {/* Related Links */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Explore Other Pillars</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/blog/pillar-6" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors">
                  <div className="bg-primary/20 rounded-full p-2">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pillar 6: Offers, Pricing & Partnerships</p>
                    <p className="text-sm text-muted-foreground">Strategic pricing and partnership systems</p>
                  </div>
                </Link>
                <Link to="/tools" className="flex items-center gap-3 p-3 bg-background rounded hover:bg-accent/50 transition-colors">
                  <div className="bg-accent/20 rounded-full p-2">
                    <BookOpen className="w-4 h-4 text-accent" />
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
};

export default BlogPillar1;
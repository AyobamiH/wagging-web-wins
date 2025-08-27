import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Star, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPillar3() {
  const posts = [
    {
      slug: "google-business-profile-pet-sitter-90-day-plan-uk",
      title: "Your First 90 Days of Google Business Profile (GBP): Posts, Products & Q&A That Rank",
      excerpt: "New to GBP or never quite made it work? Follow this 90-day plan to set up categories, add services and \"products,\" publish weekly posts, seed smart Q&As and earn reviews that help you rank—and get booked.",
      icon: CalendarDays,
      readTime: "8 min read"
    },
    {
      slug: "pet-sitter-service-area-pages-uk-local-seo",
      title: "Service-Area Pages Done Right: Towns, Proof & Unique Offers (No Doorways!)",
      excerpt: "You need visibility across multiple towns—but \"copy-paste\" pages get ignored. Use this structure to publish lean, unique town pages with proof, routes, reviews and a simple call-to-action that converts.",
      icon: MapPin,
      readTime: "6 min read"
    },
    {
      slug: "get-more-reviews-pet-groomer-pet-sitter-uk-keywords",
      title: "Reviews That Mention the Right Keywords (Without Being Spammy)",
      excerpt: "You don't need keyword-stuffed reviews—you need natural language that mentions the service, town and result. Here's how to ask (kindly), what to avoid, and the exact scripts to use.",
      icon: Star,
      readTime: "5 min read"
    },
    {
      slug: "best-photos-google-business-profile-pet-groomer-dog-walker",
      title: "Photo Strategy: 12 Shots Google Loves for Groomers, Walkers & Sitters",
      excerpt: "Photos are the fastest trust-signal on your profile. Use this 12-shot list and a monthly upload rhythm to show real care, safe handling and local presence—without overthinking.",
      icon: Camera,
      readTime: "4 min read"
    }
  ];

  return (
    <>
      <Seo
        title="Local SEO & Google Business Profile for Pet Care Pros"
        description="Master local SEO with our complete guide to Google Business Profile optimization, service area pages, review strategies, and photo tips for pet sitters, dog walkers, and groomers."
        path="/blog/pillar-3"
        imageUrl="/og/blog.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Local SEO & GBP", item: "/blog/pillar-3" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pillar 3: Local SEO & Google Business Profile
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Local SEO & Google Business Profile for Pet Care Pros
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master local search with proven strategies for Google Business Profile optimization, 
            service area pages, review generation, and photo content that ranks and converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Get Local SEO Help
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog">
                All Guides
              </Link>
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => {
            const Icon = post.icon;
            return (
              <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium" asChild>
                    <Link to={`/blog/${post.slug}`}>
                      Read guide →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to dominate local search?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized help implementing these local SEO strategies for your pet care business. 
              Book a free consultation to discuss your specific market and goals.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </div>

        {/* Related Pillars */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6">Explore Other Marketing Pillars</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-4" className="hover:text-primary transition-colors">
                    Trust, Safety & Compliance
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build client trust with proper safety standards, forms, crisis communication, and GDPR compliance.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-5" className="hover:text-primary transition-colors">
                    Client Experience & Retention
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reduce cancellations and increase bookings with proven welcome sequences and client communication.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-6" className="hover:text-primary transition-colors">
                    Content & Social Media
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create engaging content that builds authority and attracts ideal pet care clients consistently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
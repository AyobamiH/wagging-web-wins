
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, MousePointer, Camera, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPillar2() {
  const posts = [
    {
      slug: "pet-care-homepage-f-pattern-conversion-teardown",
      title: "What a High-Converting Pet-Care Homepage Looks Like (F-Pattern Teardown)",
      excerpt: "Your homepage should answer three questions in five seconds: Who are you? Where do you serve? What should I do next? Use this F-pattern teardown to turn visits into bookings—without redesigning your whole site.",
      icon: Layout,
      readTime: "8 min read"
    },
    {
      slug: "pet-care-pricing-page-3-tiers-anchor-add-ons",
      title: "Price Pages That Don't Confuse: 3 Tiers, 1 Anchor, Clear Add-Ons",
      excerpt: "A pricing page is a decision tool—not an invoice. Use three tiers, one obvious \"Most Booked\" plan, and 3–5 add-ons. Keep the copy outcome-focused and show the path to book.",
      icon: MousePointer,
      readTime: "7 min read"
    },
    {
      slug: "pet-care-gallery-that-sells-before-after-reels-trust",
      title: "Gallery Pages That Sell: Before/After, Reels & Trust Badges",
      excerpt: "People don't book because your photos are pretty. They book because your photos reduce risk. Use before/after storytelling, short reels, and trust badges to show gentle handling, outcomes, and consistency.",
      icon: Camera,
      readTime: "6 min read"
    },
    {
      slug: "mobile-first-pet-sitter-ux-thumb-reach-tap-targets",
      title: "Mobile-First for Walkers & Sitters: Thumb-Reach CTAs + Bigger Tap Targets",
      excerpt: "If your site frustrates thumbs, it bleeds bookings. Optimise for one-hand use: big tap targets, sticky actions, fast loads, and forms that don't feel like work.",
      icon: Smartphone,
      readTime: "5 min read"
    }
  ];

  return (
    <>
      <Seo
        title="Website UX & Conversion for Pet Care Professionals"
        description="Build websites that convert visitors into bookings. F-pattern layouts, pricing psychology, compelling galleries, and mobile-first UX that wins on every device."
        path="/blog/pillar-2"
        imageUrl="/og/blog.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Website UX & Conversion", item: "/blog/pillar-2" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pillar 2: Website UX & Conversion
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Website UX & Conversion for Pet Care Professionals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Build websites that convert visitors into bookings. Master F-pattern layouts, 
            pricing psychology, compelling galleries, and mobile-first UX that wins on every device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Get UX Help
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
              Need help implementing these UX strategies?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized guidance on homepage optimization, pricing psychology, 
              and mobile-first design for your specific pet care business.
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
                  <Link to="/blog/pillar-1" className="hover:text-primary transition-colors">
                    Pet Business Foundations
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Master booking systems, reduce no-shows, and build reliable operational foundations.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-3" className="hover:text-primary transition-colors">
                    Local SEO & Google Business Profile
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dominate local search with Google Business Profile optimization and review strategies.
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
                  Reduce cancellations and increase bookings with proven welcome sequences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

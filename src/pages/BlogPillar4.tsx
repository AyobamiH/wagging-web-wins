import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, AlertTriangle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPillar4() {
  const posts = [
    {
      slug: "safety-and-standards-page-aal-insurance-dbs-uk",
      title: "Pet-Care Safety & Standards: AAL, Insurance, DBS (UK)",
      excerpt: "Your Safety & Standards page is your trust engine. Here's exactly what to include—AAL licensing (if applicable), insurance, DBS, hygiene, incident response—plus copy you can paste into your site.",
      icon: Shield,
      readTime: "7 min read"
    },
    {
      slug: "pet-sitter-essential-forms-uk-terms-consent-emergencies",
      title: "The 5 Essential Pet-Sitting Forms (UK)",
      excerpt: "Cut back-and-forth and protect everyone with these five forms. They're short, plain-English, and cover what matters when things go right—and when they don't.",
      icon: FileText,
      readTime: "6 min read"
    },
    {
      slug: "pet-care-crisis-communications-kennel-cough-heatwaves-fireworks-uk",
      title: "Pet-Care Crisis Comms: Kennel Cough, Heatwaves & Fireworks",
      excerpt: "When something goes wrong, speed and tone matter. Use these brief templates to inform clients, reduce panic, and show leadership—while you keep pets safe.",
      icon: AlertTriangle,
      readTime: "5 min read"
    },
    {
      slug: "gdpr-data-privacy-cookie-ux-for-pet-care-websites-uk",
      title: "GDPR & Cookie UX for Pet-Care Sites (UK)",
      excerpt: "Privacy isn't scary. With a simple privacy notice, sensible forms, and a clean cookie banner, you'll protect clients and look professional. Here's the fast, friendly way.",
      icon: Lock,
      readTime: "4 min read"
    }
  ];

  return (
    <>
      <Seo
        title="Trust, Safety & Compliance for Pet Care Professionals"
        description="Build unshakeable client trust with comprehensive guides on safety standards, essential forms, crisis communication, and GDPR compliance for pet care businesses."
        path="/blog/pillar-4"
        imageUrl="/og/blog.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Trust, Safety & Compliance", item: "/blog/pillar-4" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pillar 4: Trust, Safety & Compliance
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trust, Safety & Compliance for Pet Care Professionals
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Build unshakeable client trust with comprehensive safety standards, 
            essential forms, crisis communication protocols, and GDPR compliance strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">
                Get Compliance Help
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
              Need help implementing these standards?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized guidance on safety protocols, compliance requirements, 
              and building trust systems for your specific pet care business.
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
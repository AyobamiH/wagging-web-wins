import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPillar2() {
  return (
    <>
      <Seo
        title="Pillar 2: Coming Soon - Advanced Pet Business Strategies"
        description="Pillar 2 content is currently in development. Check out our other comprehensive guides for pet care business growth and marketing strategies."
        path="/blog/pillar-2"
        imageUrl="/og/blog.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Pillar 2", item: "/blog/pillar-2" }
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            Pillar 2: In Development
          </Badge>
          <Construction className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pillar 2: Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We're working on comprehensive guides for Pillar 2. In the meantime, explore our other 
            pillar content covering everything from booking systems to client retention.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Why is Pillar 2 missing?</h3>
              <p className="text-sm text-muted-foreground">
                Pillar 2 content is currently being developed as part of our comprehensive 
                pet business marketing system. We're focusing on delivering high-quality, 
                actionable guides that provide real value for pet care professionals.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Explore Available Pillars</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">1</span>
                  </div>
                  <Badge variant="secondary">4 Guides</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-1" className="hover:text-primary transition-colors">
                    Pet Business Foundations
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Master booking systems, reduce no-shows, automate updates, and optimize scheduling.
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link to="/blog/pillar-1">
                    View guides →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">3</span>
                  </div>
                  <Badge variant="secondary">4 Guides</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-3" className="hover:text-primary transition-colors">
                    Local SEO & GBP
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Master local search with Google Business Profile optimization and review strategies.
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link to="/blog/pillar-3">
                    View guides →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">4</span>
                  </div>
                  <Badge variant="secondary">4 Guides</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-4" className="hover:text-primary transition-colors">
                    Trust, Safety & Compliance
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Build client trust with proper safety standards, forms, and GDPR compliance.
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link to="/blog/pillar-4">
                    View guides →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">5</span>
                  </div>
                  <Badge variant="secondary">4 Guides</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-5" className="hover:text-primary transition-colors">
                    Client Experience & Retention
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Reduce cancellations and increase bookings with proven welcome sequences.
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link to="/blog/pillar-5">
                    View guides →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">6</span>
                  </div>
                  <Badge variant="secondary">4 Guides</Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link to="/blog/pillar-6" className="hover:text-primary transition-colors">
                    Content & Social Media
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Create engaging content that builds authority and attracts ideal clients.
                </CardDescription>
                <Button variant="ghost" size="sm" className="p-0 h-auto mt-2" asChild>
                  <Link to="/blog/pillar-6">
                    View guides →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">Need Help Right Now?</h3>
            <p className="text-muted-foreground mb-4">
              Get personalized guidance for your pet care business while we complete Pillar 2.
            </p>
            <Button asChild>
              <Link to="/contact">
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
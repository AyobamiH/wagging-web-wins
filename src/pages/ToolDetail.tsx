import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { useToolsRegistry, trackToolClick } from "@/lib/useToolsRegistry";
import { ExternalLink, ArrowLeft, Share2, Calendar, Lightbulb, Users, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export default function ToolDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { tools, loading } = useToolsRegistry();
  
  const tool = tools.find(t => t.id === slug);

  const handleOpenTool = () => {
    if (tool) {
      trackToolClick(tool);
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool?.name,
          text: tool?.tagline,
          url: url,
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </section>
    );
  }

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  // Generate JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": tool.seo.jsonLdType || "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.url,
    "applicationCategory": tool.category,
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tail Wagging Websites Factory Northampton"
    }
  };

  return (
    <>
      <Seo
        title={`${tool.name} | Free Pet-Care Tool`}
        description={tool.description}
        path={`/tools/${tool.id}`}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Tools", item: "/tools" },
          { name: tool.name, item: `/tools/${tool.id}` }
        ]}
        jsonLd={[jsonLd]}
      />
      
      <section className="mx-auto max-w-4xl px-4 py-10">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/tools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {tool.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {tool.tagline}
              </p>
              
              <div className="flex flex-wrap gap-2 items-center">
                <StatusBadge status={tool.status} />
                <Badge variant="secondary">{tool.category}</Badge>
                {tool.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button onClick={handleOpenTool} size="lg">
              <ExternalLink className="h-5 w-5 mr-2" />
              Open Tool
            </Button>
            
            <Button variant="outline" onClick={handleShare} size="lg">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* What it does */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">What it does</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Who it's for */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Who it's for</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pet sitters and dog walkers
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Professional groomers
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pet-care business owners
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Veterinary practices
                </div>
              </div>
            </div>

            {/* Quick Steps */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick steps to get started</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    Click "Open Tool" to access {tool.name}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    Follow the on-screen instructions
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    Get instant results and actionable insights
                  </span>
                </li>
              </ol>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Is this tool really free?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! This tool is completely free to use. No hidden fees or subscriptions required.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Do I need to sign up?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most tools don't require signup. Some may ask for basic info to provide personalized results.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">How often is this tool updated?</h3>
                  <p className="text-sm text-muted-foreground">
                    We continuously improve our tools based on user feedback and industry best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tool Info */}
            <div className="bg-glass border border-surface rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Tool Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <StatusBadge status={tool.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Launched:</span>
                  <span>{new Date(tool.launchedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-glass border border-surface rounded-2xl p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto text-primary mb-3" />
              <h3 className="font-semibold mb-2">Need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a free consultation to get personalized guidance on using our tools.
              </p>
              <a
                href={CalendlyURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="w-full">
                  Book Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
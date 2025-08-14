import { useState, useCallback } from "react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/ToolCard";
import { ToolFilters } from "@/components/ToolFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { useToolsRegistry, Tool } from "@/lib/useToolsRegistry";
import { ExternalLink, Mail, Wrench } from "lucide-react";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export default function ToolsHub() {
  const { tools, loading, error } = useToolsRegistry();
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [email, setEmail] = useState("");

  const handleFilteredToolsChange = useCallback((newFilteredTools: Tool[]) => {
    setFilteredTools(newFilteredTools);
  }, []);

  const handleEmailCapture = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up email capture
    console.log("Email captured:", email);
    setEmail("");
    // Show success toast or feedback
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No tools match your filters</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Try adjusting your search terms or removing some filters to find more tools.
      </p>
    </div>
  );

  const LoadingState = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="text-destructive mb-4">⚠️</div>
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-4">
        We couldn't load the tools right now. Please try refreshing the page.
      </p>
      <Button onClick={() => window.location.reload()} variant="outline">
        Refresh Page
      </Button>
    </div>
  );

  return (
    <>
      <Seo
        title="Free Tools for Pet-Care Pros | Tail Wagging Websites"
        description="Discover free tools to grow your pet-care business. Website audits, automation builders, and more utilities to attract bookings and streamline operations."
        path="/tools"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Tools", item: "/tools" }]}
      />
      
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Wrench className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Free Tools for Pet-Care Pros
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Bookings made simpler. Less admin, more wagging tails. 
            Discover free utilities to grow your pet-care business.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={CalendlyURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Free Tools Walkthrough"
            >
              <Button size="lg" className="min-w-[250px]">
                <ExternalLink className="h-5 w-5 mr-2" />
                Book a Free Tools Walkthrough
              </Button>
            </a>
            
            <form onSubmit={handleEmailCapture} className="flex gap-2 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-[200px]"
              />
              <Button type="submit" variant="secondary" size="default">
                <Mail className="h-4 w-4 mr-1" />
                Join Updates
              </Button>
            </form>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && <ErrorState />}

        {/* Tools Content */}
        {!loading && !error && (
          <>
            {/* Filters */}
            <div className="mb-8">
              <ToolFilters 
                tools={tools} 
                onFilteredToolsChange={handleFilteredToolsChange}
              />
            </div>

            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}

        {/* Bottom CTA */}
        {!loading && !error && filteredTools.length > 0 && (
          <div className="text-center mt-16 p-8 rounded-2xl bg-glass border border-surface">
            <h2 className="text-2xl font-semibold mb-3">
              Need something custom?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We build tailored solutions for pet-care professionals. 
              Let's discuss your specific needs.
            </p>
            <a
              href={CalendlyURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Schedule a Custom Tools Consultation
              </Button>
            </a>
          </div>
        )}
      </section>
    </>
  );
}
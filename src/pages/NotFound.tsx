import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Page Not Found • Tail Wagging Websites"
        description="The page you're looking for doesn't exist. Return to our homepage to find what you need."
        path={location.pathname}
        noIndex={true}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
                <Link to="/blog">
                  <Search className="h-4 w-4" />
                  Browse Blog
                </Link>
              </Button>
            </div>
            
            <Button asChild variant="ghost" className="flex items-center gap-2 mx-auto">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/services" className="text-sm text-primary hover:underline">Services</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/tools" className="text-sm text-primary hover:underline">Tools</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/pricing" className="text-sm text-primary hover:underline">Pricing</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/contact" className="text-sm text-primary hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

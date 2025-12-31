import { Link } from "react-router-dom";
import { Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { trackCTAClick } from "@/lib/analytics";

interface LovableCTAProps {
  variant?: 'compact' | 'full';
  location?: string;
}

export function LovableCTA({ variant = 'full', location = 'lovable' }: LovableCTAProps) {
  const handleContactClick = () => {
    trackCTAClick('contact_form', location);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
        <p className="text-sm font-medium mb-3">If you're stuck, here are two ways we can help:</p>
        <div className="flex flex-wrap gap-3">
          <CalendlyEmbed 
            buttonText="Book a call"
            buttonSize="sm"
            ariaLabel="Book a consultation call"
            trackingLocation={location}
          />
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            onClick={handleContactClick}
          >
            <Link to="/contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact us
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20">
      <CardContent className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Need help with your Lovable project?</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Whether you're stuck on a bug, need architecture advice, or want a code review — we've got you covered.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CalendlyEmbed 
            buttonText="Book a free call"
            buttonSize="lg"
            ariaLabel="Book a free consultation call"
            trackingLocation={location}
          />
          <Button 
            variant="outline" 
            size="lg" 
            asChild
            onClick={handleContactClick}
          >
            <Link to="/contact">
              <MessageSquare className="h-5 w-5 mr-2" />
              Send a message
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

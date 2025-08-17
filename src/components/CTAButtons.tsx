import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CalendlyEmbed from "./CalendlyEmbed";

export const CTAButtons = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
    <CalendlyEmbed
      buttonText="Let's have a chat"
      buttonSize="lg"
      className="min-w-[220px]"
      ariaLabel="Book a Free 20-Minute Consult"
    />
    <Link to="/tools" aria-label="Explore Tools">
      <Button variant="secondary" size="lg" className="min-w-[160px]">
        Explore Tools
      </Button>
    </Link>
  </div>
);

export const SecondaryCTAs = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
    <Link to="/contact" aria-label="Request a Quote">
      <Button variant="secondary" size="lg" className="min-w-[180px]">
        Request a Quote
      </Button>
    </Link>
    <CalendlyEmbed
      buttonText="Let's have a chat"
      buttonSize="lg"
      className="min-w-[220px]"
      ariaLabel="Book a Free 20-Minute Consult"
    />
  </div>
);

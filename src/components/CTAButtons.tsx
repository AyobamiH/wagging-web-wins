import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export const CTAButtons = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
    <a
      href={CalendlyURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a Free 20-Minute Consult on Calendly"
    >
      <Button className="min-w-[220px]" size="lg">
        Let's have a chat
      </Button>
    </a>
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
    <a
      href={CalendlyURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a Free 20-Minute Consult on Calendly"
    >
      <Button size="lg" className="min-w-[220px]">
        Let's have a chat
      </Button>
    </a>
  </div>
);

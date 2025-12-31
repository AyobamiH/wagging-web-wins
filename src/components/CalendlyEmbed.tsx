import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { trackCalendlyOpen } from "@/lib/analytics";

interface CalendlyEmbedProps {
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonSize?: "default" | "sm" | "lg";
  className?: string;
  ariaLabel?: string;
  trackingLocation?: string;
}

const CALENDLY_URL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export const CalendlyEmbed = ({ 
  buttonText = "Book a Consultation",
  buttonVariant = "default",
  buttonSize = "default",
  className = "",
  ariaLabel = "Book a Free 20-Minute Consult",
  trackingLocation = "unknown"
}: CalendlyEmbedProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    trackCalendlyOpen(trackingLocation);
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant={buttonVariant}
        size={buttonSize}
        className={className}
        aria-label={ariaLabel}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 flex flex-col">
          <DialogHeader className="p-4 pb-2 shrink-0">
            <DialogTitle className="text-center">Schedule Your Free Consultation</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 px-4 pb-4">
            <iframe
              src={CALENDLY_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a consultation"
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendlyEmbed;
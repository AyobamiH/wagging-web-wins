import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendlyEmbedProps {
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonSize?: "default" | "sm" | "lg";
  className?: string;
  ariaLabel?: string;
}

const CALENDLY_URL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export const CalendlyEmbed = ({ 
  buttonText = "Book a Consultation",
  buttonVariant = "default",
  buttonSize = "default",
  className = "",
  ariaLabel = "Book a Free 20-Minute Consult"
}: CalendlyEmbedProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={buttonVariant}
        size={buttonSize}
        className={className}
        aria-label={ariaLabel}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Schedule Your Free Consultation</DialogTitle>
          </DialogHeader>
          <div className="flex-1 p-6 pt-2">
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
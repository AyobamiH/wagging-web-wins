import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLocation } from "react-router-dom";

interface PlanAssistantWidgetProps {
  onOpenQuestionnaire: () => void;
}

const PlanAssistantWidget = ({ onOpenQuestionnaire }: PlanAssistantWidgetProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const location = useLocation();

  // Removed auto-open behavior - widget only opens when user clicks
  useEffect(() => {
    // No auto-open functionality
  }, [location.pathname, hasInteracted]);

  const handleOpenQuestionnaire = () => {
    setHasInteracted(true);
    trackEvent('plan_assistant_opened', {
      location: location.pathname,
      trigger: 'manual'
    });
    onOpenQuestionnaire();
  };

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
    trackEvent('plan_assistant_dismissed', {
      location: location.pathname
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs animate-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Need help choosing?
            </p>
            <p className="text-xs text-muted-foreground">
              Take our quick quiz to find your perfect website package
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss plan assistant"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      {/* Main Widget Button */}
      <Button
        onClick={handleOpenQuestionnaire}
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Open plan selection assistant"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Get help choosing a plan</span>
      </Button>
    </div>
  );
};

export default PlanAssistantWidget;
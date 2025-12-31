import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

// SECURITY NOTE: This URL is public and safe to use in frontend code.
// Edge Functions handle sensitive operations server-side with secure secrets.
const SUPABASE_FUNCTIONS_URL = "https://viwxxjnehceedyctevau.supabase.co/functions/v1";

interface BuyPlanButtonProps {
  planName: string;
  planPrice: number;
  onboardingFee?: number;
  variant?: "default" | "outline";
  className?: string;
}

const BuyPlanButton = ({ 
  planName, 
  planPrice, 
  onboardingFee = 0,
  variant = "default",
  className = ""
}: BuyPlanButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    trackEvent('payment_initiated', {
      plan_name: planName,
      plan_price: planPrice,
      onboarding_fee: onboardingFee
    });
    setIsLoading(true);

    try {
      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-buy-plan-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          planPrice: parseFloat(planPrice.toString()),
          onboardingFee: parseFloat(onboardingFee.toString()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to initiate checkout");
      }

      const { url } = await response.json();
      if (!url) throw new Error("No checkout URL returned");
      
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Unable to start checkout process. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      variant={variant}
      size="lg"
      className={`w-full ${className}`}
    >
      {isLoading ? "Processing..." : "Pay Now"}
    </Button>
  );
};

export default BuyPlanButton;
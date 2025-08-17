import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    console.log("Checkout Details:", { planName, planPrice, onboardingFee });
    setIsLoading(true);

    try {
      const response = await fetch("https://backend-c469.onrender.com/create-buy-plan-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          planPrice: parseFloat(planPrice.toString()), // Ensure numeric value
          onboardingFee: parseFloat(onboardingFee.toString()), // Ensure numeric value
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        throw new Error("Failed to initiate checkout");
      }

      const { url } = await response.json();
      console.log("Redirecting to:", url);
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to start checkout process. Please try again or contact support.",
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
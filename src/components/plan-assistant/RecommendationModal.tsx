import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, ArrowRight } from "lucide-react";
import BuyPlanButton from "@/components/BuyPlanButton";
import { trackEvent } from "@/lib/analytics";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 79.99,
    description: "Perfect for Personal Portfolios or Small Websites",
    validityMonths: 36,
    onboardingFee: 100,
    features: [
      "Responsive Design: Works across all devices",
      "Mobile Friendly: Optimized for mobile users",
      "Basic SEO Setup: Simple keyword and on-page optimization",
      "User-friendly Navigation: Easy for visitors to navigate",
      "Integration with Basic Booking System: Simple calendar or form",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 128.79,
    description: "Small to Medium Businesses with Multiple Locations",
    validityMonths: 48,
    onboardingFee: 120,
    features: [
      "Custom Design: Fully tailored to your brand and business",
      "Mobile Optimization: Advanced responsiveness",
      "Advanced SEO Setup: Keyword optimization and metadata",
      "Improved Site Performance and Speed",
      "Organized Content Restructuring",
      "Basic Security Updates",
      "Booking System Integration",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 198.99,
    description: "Large Businesses with Advanced Needs",
    validityMonths: 48,
    onboardingFee: 160,
    features: [
      "Custom Design & Branding: Fully customized to your branding",
      "Full SEO Optimization: Includes Local SEO and keyword research",
      "Advanced Site Performance Improvements",
      "Flawless Mobile Responsiveness",
      "Full-scale Security Updates",
      "Web Accessibility Enhancements",
      "Regular Maintenance & Post-launch Support",
      "Advanced Booking Systems: Notifications & reminders",
    ],
    popular: false,
  },
];

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendationData?: {
    recommendedStyle: string;
    featureList: string[];
    suggestedPackage: { name: string; features: string[] };
  };
}

const RecommendationModal = ({ isOpen, onClose, recommendationData }: RecommendationModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Enhanced recommendation logic based on features and complexity
  const getRecommendedPlan = () => {
    if (!recommendationData) {
      return plans[1]; // Default to Professional
    }
    
    const features = recommendationData.featureList;
    const hasAdvancedFeatures = features.some(f => 
      f.includes('E-commerce') || 
      f.includes('Advanced Booking') || 
      f.includes('Content Management') ||
      f.includes('Local Search Enhancement')
    );
    
    const hasBasicFeatures = features.length <= 4 && !hasAdvancedFeatures;
    const hasEnterpriseFeatures = features.length > 7 || 
      features.some(f => f.includes('Advanced') || f.includes('Enhanced'));
    
    if (hasBasicFeatures) return plans[0]; // Basic
    if (hasEnterpriseFeatures) return plans[2]; // Enterprise
    return plans[1]; // Professional (default for most cases)
  };

  const recommendedPlan = getRecommendedPlan();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    trackEvent('plan_selected', {
      plan_id: planId,
      plan_name: plans.find(p => p.id === planId)?.name,
      is_recommended: planId === recommendedPlan.id
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border">
        <div className="p-8">
          <DialogHeader className="text-center mb-8">
            <DialogTitle className="text-3xl font-bold text-foreground mb-4">
              Your Personalized Recommendations
            </DialogTitle>
            <p className="text-lg text-muted-foreground">
              Based on your responses, here's what we recommend for your project
            </p>
          </DialogHeader>

          {recommendationData && (
            <>
              {/* Recommended Style Section */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Recommended Style: {recommendationData.recommendedStyle || "Modern & Professional"}
                </h3>
                <p className="text-muted-foreground">
                  Based on your answers, a <strong>{recommendationData.recommendedStyle || "Modern & Professional"}</strong> design style is recommended for your business. This style will resonate best with your target audience and set you apart from competitors.
                </p>
              </div>

              {/* Features List Section */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Recommended Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(recommendationData.featureList.length > 0 ? recommendationData.featureList : [
                    "Responsive Design",
                    "Contact Forms",
                    "SEO Optimization",
                    "Mobile-First Design"
                  ]).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Pricing Plans */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">
              Choose Your Perfect Package
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                    plan.id === recommendedPlan.id 
                      ? 'ring-2 ring-primary scale-105 bg-primary/5 border-primary shadow-lg' 
                      : 'border-border'
                  } ${
                    selectedPlan === plan.id ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  {plan.id === recommendedPlan.id && (
                    <div className="absolute -top-3 right-4">
                      <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Recommended
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-foreground">
                        £{plan.price.toFixed(2)}
                        <span className="text-base text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        + £{plan.onboardingFee} setup fee
                      </div>
                      <div className="text-sm text-accent font-semibold">
                        {plan.validityMonths} months validity
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Setup Fee:</span>
                          <span>£{plan.onboardingFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>First Month:</span>
                          <span>£{plan.price.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-border mt-2 pt-2 flex justify-between font-semibold text-foreground">
                          <span>Total Due Now:</span>
                          <span>£{(plan.onboardingFee + plan.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <BuyPlanButton
                        planName={plan.name}
                        planPrice={plan.price}
                        onboardingFee={plan.onboardingFee}
                        variant={plan.id === recommendedPlan.id ? "default" : "outline"}
                        className={`w-full font-semibold transition-all duration-300 ${
                          plan.id === recommendedPlan.id
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base py-3 h-12'
                            : 'text-base py-3 h-12'
                        }`}
                      />
                      {plan.id === recommendedPlan.id && (
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                            <Zap className="w-3 h-3" />
                            Best Match for Your Needs
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              All plans include 30-day money-back guarantee • No long-term contracts • Cancel anytime
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationModal;
import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap } from "lucide-react";
import BuyPlanButton from "@/components/BuyPlanButton";
import { trackEvent } from "@/lib/analytics";
import { PACKAGES, type Package } from "@/data/pricing";

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendationData?: {
    recommendedStyle: string;
    featureList: string[];
    suggestedPackage?: { name: string; features: string[] }; // optional, kept for backwards compatibility
  };
}

// simple, deterministic mapping -> Starter / Pro / Growth
const choosePackage = (features: string[] = []): Package => {
  const txt = features.join(" ").toLowerCase();

  const wantsAdvanced =
    /advanced|automation|automations|a\/b|conversion|content plan|crm|workflow|sequence|pipeline/.test(
      txt
    );

  if (wantsAdvanced || features.length >= 7) {
    return PACKAGES.find((p) => p.id === "growth") || PACKAGES[PACKAGES.length - 1];
  }

  if (features.length <= 4) {
    return PACKAGES.find((p) => p.id === "starter") || PACKAGES[0];
  }

  return PACKAGES.find((p) => p.id === "pro") || PACKAGES[1];
};

const RecommendationModal = ({ isOpen, onClose, recommendationData }: RecommendationModalProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const recommended = useMemo(
    () => choosePackage(recommendationData?.featureList || []),
    [recommendationData?.featureList]
  );

  const handleSelect = (pkg: Package) => {
    setSelectedId(pkg.id);
    trackEvent("plan_selected", {
      plan_id: pkg.id,
      plan_name: pkg.name,
      is_recommended: pkg.id === recommended.id,
      origin: "recommendation_modal",
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
              Based on your responses, here’s what we recommend for your project.
            </p>
          </DialogHeader>

          {recommendationData && (
            <>
              {/* Recommended style */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Recommended Style: {recommendationData.recommendedStyle || "Modern & Professional"}
                </h3>
                <p className="text-muted-foreground">
                  A <strong>{recommendationData.recommendedStyle || "Modern & Professional"}</strong> style will resonate with your audience and set you apart locally.
                </p>
              </div>

              {/* Features */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Recommended Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(recommendationData.featureList?.length
                    ? recommendationData.featureList
                    : ["Responsive Design", "Contact Forms", "SEO Optimization", "Mobile-First Design"]
                  ).map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Packages (one-time pricing, shared structure) */}
          <h3 className="text-2xl font-bold text-foreground text-center mb-6">
            Choose Your Perfect Package
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => {
              const isRecommended = pkg.id === recommended.id;
              const isSelected = selectedId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                    isRecommended ? "ring-2 ring-primary bg-primary/5 border-primary shadow-lg" : "border-border"
                  } ${isSelected ? "ring-2 ring-accent" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {isRecommended && (
                    <div className="absolute -top-3 right-4">
                      <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Recommended
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h4>
                    <p className="text-muted-foreground mb-4">{pkg.desc}</p>
                    <div>
                      <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground ml-1">one-time</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => handleSelect(pkg)}
                    >
                      Select {pkg.name}
                    </Button>

                    <BuyPlanButton
                      planName={pkg.name}
                      planPrice={pkg.priceValue}
                      onboardingFee={0}
                      variant={isRecommended ? "default" : "outline"}
                      className={`w-full font-semibold transition-all duration-300 ${
                        isRecommended
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base py-3 h-12"
                          : "text-base py-3 h-12"
                      }`}
                    />

                    {isRecommended && (
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                          <Zap className="w-3 h-3" />
                          Best Match for Your Needs
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              All packages are one-time pricing • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationModal;

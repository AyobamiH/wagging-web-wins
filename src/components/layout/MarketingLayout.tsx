import { useState } from "react";
import { Outlet } from "react-router-dom";
import ModernHeader from "./ModernHeader";
import SiteFooter from "./SiteFooter";
import SkipToContent from "../SkipToContent";
import { useWebVitals } from "@/hooks/useWebVitals";
import PlanAssistantWidget from "../plan-assistant/PlanAssistantWidget";
import QuestionnaireModal from "../plan-assistant/QuestionnaireModal";
import RecommendationModal from "../plan-assistant/RecommendationModal";

export default function MarketingLayout() {
  useWebVitals(); // Track Core Web Vitals globally
  
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);

  const handleQuestionnaireComplete = (recommendationId: string) => {
    // Mock recommendation data - replace with actual API call
    const mockRecommendationData = {
      recommendedStyle: "Modern & Professional",
      featureList: [
        "Responsive Design",
        "Contact Forms", 
        "SEO Optimization",
        "Mobile-First Design",
        "Social Media Integration"
      ],
      suggestedPackage: {
        name: "Professional",
        features: [
          "Custom Design",
          "Advanced SEO",
          "Mobile Optimization"
        ]
      }
    };
    
    setRecommendationData(mockRecommendationData);
    setIsRecommendationOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <ModernHeader />
      <main 
        role="main" 
        id="main-content" 
        tabIndex={-1} 
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </main>
      <SiteFooter />
      
      {/* Plan Assistant Widget */}
      <PlanAssistantWidget onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
      
      {/* Modals */}
      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onComplete={handleQuestionnaireComplete}
      />
      
      <RecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        recommendationData={recommendationData}
      />
    </div>
  );
}

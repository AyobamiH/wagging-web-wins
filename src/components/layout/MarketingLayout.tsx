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

  const handleQuestionnaireComplete = (recommendationId: string, questionnaire: Record<string, any>) => {
    // Generate personalized recommendations based on questionnaire data
    const generateRecommendations = (data: Record<string, any>) => {
      const services = Array.isArray(data.servicesOffered) ? data.servicesOffered : [];
      const features = Array.isArray(data.mustHaveFeatures) ? data.mustHaveFeatures : [];
      const budget = data.budgetRange || '';
      const websiteStyle = data.websiteStyle || 'Modern';
      const primaryGoal = data.primaryWebsiteGoal || '';
      
      // Determine recommended style
      let recommendedStyle = "Modern & Professional";
      if (websiteStyle === 'Playful') recommendedStyle = "Playful & Engaging";
      else if (websiteStyle === 'Elegant') recommendedStyle = "Elegant & Sophisticated";
      else if (websiteStyle === 'Minimalist') recommendedStyle = "Clean & Minimalist";
      else if (websiteStyle === 'Colorful') recommendedStyle = "Vibrant & Colorful";
      
      // Generate feature list based on services and goals
      const recommendedFeatures = [
        "Responsive Design",
        "Mobile Optimization",
        "Professional Branding"
      ];
      
      if (services.includes('Pet Booking') || features.includes('Online booking')) {
        recommendedFeatures.push("Advanced Booking System");
      }
      if (services.includes('Pet Grooming') || services.includes('Pet Boarding')) {
        recommendedFeatures.push("Service Gallery & Portfolio");
      }
      if (primaryGoal === 'Attract new clients') {
        recommendedFeatures.push("SEO Optimization", "Local Search Enhancement");
      }
      if (features.includes('Client testimonials')) {
        recommendedFeatures.push("Customer Review Integration");
      }
      if (data.needEcommerce === 'Yes') {
        recommendedFeatures.push("E-commerce Integration");
      }
      if (data.includeBlogOrNewsletter === 'Yes') {
        recommendedFeatures.push("Content Management System");
      }
      
      return {
        recommendedStyle,
        featureList: recommendedFeatures,
        suggestedPackage: {
          name: "Professional", // This will be determined by the modal logic
          features: recommendedFeatures
        }
      };
    };
    
    const recommendationData = generateRecommendations(questionnaire);
    setRecommendationData(recommendationData);
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
        onComplete={(id, data) => handleQuestionnaireComplete(id, data)}
      />
      
      <RecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        recommendationData={recommendationData}
      />
    </div>
  );
}

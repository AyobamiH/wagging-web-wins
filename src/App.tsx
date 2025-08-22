import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import MarketingLayout from "@/components/layout/MarketingLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import WhyDoDogs from "@/pages/WhyDoDogs";

// Lazy load components to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const TradesLanding = lazy(() => import("./pages/TradesLanding"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Services = lazy(() => import("./pages/Services"));
const WebsiteDesign = lazy(() => import("./pages/services/WebsiteDesign"));
const LocalSEO = lazy(() => import("./pages/services/LocalSEO"));
const Automations = lazy(() => import("./pages/services/Automations"));
const CarePlans = lazy(() => import("./pages/services/CarePlans"));
const SpeedUXAudits = lazy(() => import("./pages/services/SpeedUXAudits"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const ToolDetail = lazy(() => import("./pages/ToolDetail"));
const FAQ = lazy(() => import("./pages/FAQ"));
const WhyDoDogs = lazy(() => import("./pages/WhyDoDogs")); 
const Contact = lazy(() => import("./pages/Contact"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));


const queryClient = new QueryClient();

// Check if we're on the trades subdomain
const isTradesSubdomain = typeof window !== 'undefined' && 
  (window.location.hostname === 'trades.tailwaggingwebdesign.com' || 
   window.location.hostname === 'localhost' && window.location.search.includes('trades=true'));

// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageViewTracker />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<MarketingLayout />}>
              <Route path="/" element={isTradesSubdomain ? <TradesLanding /> : <Index />} />
              <Route path="/trades" element={<TradesLanding />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/website-design" element={<WebsiteDesign />} />
              <Route path="/services/local-seo" element={<LocalSEO />} />
              <Route path="/services/automations" element={<Automations />} />
              <Route path="/services/care-plans" element={<CarePlans />} />
              <Route path="/services/speed-ux-audits" element={<SpeedUXAudits />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/tools" element={<ToolsHub />} />
              <Route path="/tools/:slug" element={<ToolDetail />} />
              <Route path="/portfolio" element={<Navigate to="/tools" replace />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/why-do-dogs/" element={<WhyDoDogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/service-areas" element={<ServiceAreas />} />
              <Route path="/success/stripe/:sessionId" element={<PaymentSuccess />} />
              <Route path="/cancel" element={<PaymentCancel />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

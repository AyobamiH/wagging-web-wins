import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MarketingLayout from "@/components/layout/MarketingLayout";
import Services from "@/pages/Services";
import WebsiteDesign from "@/pages/services/WebsiteDesign";
import LocalSEO from "@/pages/services/LocalSEO";
import Automations from "@/pages/services/Automations";
import CarePlans from "@/pages/services/CarePlans";
import SpeedUXAudits from "@/pages/services/SpeedUXAudits";
import Pricing from "@/pages/Pricing";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/website-design" element={<WebsiteDesign />} />
            <Route path="/services/local-seo" element={<LocalSEO />} />
            <Route path="/services/automations" element={<Automations />} />
            <Route path="/services/care-plans" element={<CarePlans />} />
            <Route path="/services/speed-ux-audits" element={<SpeedUXAudits />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

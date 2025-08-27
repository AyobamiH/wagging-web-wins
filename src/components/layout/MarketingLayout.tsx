import { Outlet } from "react-router-dom";
import ModernHeader from "./ModernHeader";
import SiteFooter from "./SiteFooter";
import SkipToContent from "../SkipToContent";
import { useWebVitals } from "@/hooks/useWebVitals";

export default function MarketingLayout() {
  useWebVitals(); // Track Core Web Vitals globally
  
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
    </div>
  );
}

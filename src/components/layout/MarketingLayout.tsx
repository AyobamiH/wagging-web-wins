import { Outlet } from "react-router-dom";
import ModernHeader from "./ModernHeader";
import SiteFooter from "./SiteFooter";

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernHeader />
      <main role="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

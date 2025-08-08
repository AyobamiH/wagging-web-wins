import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main role="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

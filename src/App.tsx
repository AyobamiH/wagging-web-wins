// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReviewsProvider } from "@/contexts/ReviewsContext";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { lazy, Suspense, useEffect } from "react";
// import { trackPageView } from "@/lib/analytics";
// import MarketingLayout from "@/components/layout/MarketingLayout";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { AdminGuard } from "@/components/admin/AdminGuard";

// // Lazy load components to reduce initial bundle size
// const Index = lazy(() => import("./pages/Index"));
// const TradesLanding = lazy(() => import("./pages/TradesLanding"));
// const NotFound = lazy(() => import("./pages/NotFound"));
// const Services = lazy(() => import("./pages/Services"));
// const ServiceDetail =  lazy (() => import ("./pages/ServiceDetail"))
// const Pricing = lazy(() => import("./pages/Pricing"));
// const ToolsHub = lazy(() => import("./pages/ToolsHub"));
// const ToolDetail = lazy(() => import("./pages/ToolDetail"));
// const FAQ = lazy(() => import("./pages/FAQ"));
// const WhyDoDogs = lazy(() => import("./pages/WhyDoDogs")); 
// const WhyDogsGuideDetail = lazy(() => import("./pages/WhyDogsGuideDetail")); 
// const Contact = lazy(() => import("./pages/Contact"));
// const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
// const Location = lazy(() => import("./pages/Location"));
// const BlogSupabase = lazy(() => import("./pages/BlogSupabase"));
// const BlogPostSupabase =  lazy(()  => import("./pages/BlogPostSupabase"))
// const LovableHub = lazy(() => import("./pages/LovableHub"));
// const LovableCategory = lazy(() => import("./pages/LovableCategory"));
// const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
// const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
// const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
// const AuthPage = lazy(() => import("./components/auth/AuthPage"));
// const BlogList = lazy(() => import("./components/admin/BlogList"));
// const BlogEditor = lazy(() => import("./components/admin/BlogEditor"));


// const queryClient = new QueryClient();

// // Check if we're on the trades subdomain
// const isTradesSubdomain = typeof window !== 'undefined' && 
//   (window.location.hostname === 'trades.tailwaggingwebdesign.com' || 
//    window.location.hostname === 'localhost' && window.location.search.includes('trades=true'));

// // Component to track page views
// const PageViewTracker = () => {
//   const location = useLocation();
  
//   useEffect(() => {
//     trackPageView(location.pathname);
//   }, [location]);
  
//   return null;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider>
//       <AuthProvider>
//         <ReviewsProvider>
//           <TooltipProvider>
//             <Toaster />
//             <Sonner />
//             <PageViewTracker />
//             <Suspense fallback={<LoadingSpinner />}>
//               <Routes>
//                 <Route path="/auth" element={<AuthPage />} />
//                 <Route path="/admin/blog" element={
//                   <AdminGuard>
//                     <BlogList />
//                   </AdminGuard>
//                 } />
//                 <Route path="/admin/blog/:id" element={
//                   <AdminGuard>
//                     <BlogEditor />
//                   </AdminGuard>
//                 } />
//                 <Route element={<MarketingLayout />}>
//                   <Route path="/" element={isTradesSubdomain ? <TradesLanding /> : <Index />} />
//                   <Route path="/trades" element={<TradesLanding />} />
//                   <Route path="/services" element={<Services />} />
//                   <Route path="/services/:slug" element={<ServiceDetail />} />
//                   <Route path="/pricing" element={<Pricing />} />
//                   <Route path="/tools" element={<ToolsHub />} />
//                   <Route path="/tools/:slug" element={<ToolDetail />} />
//                   <Route path="/portfolio" element={<Navigate to="/tools" replace />} />
//                   <Route path="/faq" element={<FAQ />} />
//                   <Route path="/why-do-dogs/" element={<WhyDoDogs />} />
//                   <Route path="/why-do-dogs/:slug/" element={<WhyDogsGuideDetail />} />
//                   <Route path="/blog" element={<BlogSupabase />} />
//                   <Route path="/blog/lovable" element={<LovableHub />} />
//                   <Route path="/blog/lovable/:category" element={<LovableCategory />} />
//                   <Route path="/blog/:slug" element={<BlogPostSupabase />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/service-areas" element={<ServiceAreas />} />
//                   <Route path="/locations/:slug" element={<Location />} />
//                   <Route path="/success/stripe/:sessionId" element={<PaymentSuccess />} />
//                   <Route path="/cancel" element={<PaymentCancel />} />
//                   <Route path="/payment-failed" element={<PaymentFailed />} />
//                   {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//                   <Route path="*" element={<NotFound />} />
//                 </Route>
//               </Routes>
//             </Suspense>
//           </TooltipProvider>
//         </ReviewsProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;



// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReviewsProvider } from "@/contexts/ReviewsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import MarketingLayout from "@/components/layout/MarketingLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AdminGuard } from "@/components/admin/AdminGuard";

/**
 * Critical change:
 * - During SSR/prerender, DO NOT rely on Suspense (renderToString can't complete it).
 * - We keep lazy() for the client, but use eager imports on SSR so the server produces real HTML.
 */
const isSSR = import.meta.env.SSR;

/** -------------------------
 * Client-side (lazy) routes
 * ------------------------*/
const IndexLazy = lazy(() => import("./pages/Index"));
const TradesLandingLazy = lazy(() => import("./pages/TradesLanding"));
const NotFoundLazy = lazy(() => import("./pages/NotFound"));
const ServicesLazy = lazy(() => import("./pages/Services"));
const ServiceDetailLazy = lazy(() => import("./pages/ServiceDetail"));
const PricingLazy = lazy(() => import("./pages/Pricing"));
const ToolsHubLazy = lazy(() => import("./pages/ToolsHub"));
const ToolDetailLazy = lazy(() => import("./pages/ToolDetail"));
const FAQLazy = lazy(() => import("./pages/FAQ"));
const WhyDoDogsLazy = lazy(() => import("./pages/WhyDoDogs"));
const WhyDogsGuideDetailLazy = lazy(() => import("./pages/WhyDogsGuideDetail"));
const ContactLazy = lazy(() => import("./pages/Contact"));
const ServiceAreasLazy = lazy(() => import("./pages/ServiceAreas"));
const LocationLazy = lazy(() => import("./pages/Location"));
const BlogSupabaseLazy = lazy(() => import("./pages/BlogSupabase"));
const BlogPostSupabaseLazy = lazy(() => import("./pages/BlogPostSupabase"));
const LovableHubLazy = lazy(() => import("./pages/LovableHub"));
const LovableCategoryLazy = lazy(() => import("./pages/LovableCategory"));
const PaymentSuccessLazy = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancelLazy = lazy(() => import("./pages/PaymentCancel"));
const PaymentFailedLazy = lazy(() => import("./pages/PaymentFailed"));
const AuthPageLazy = lazy(() => import("./components/auth/AuthPage"));
const BlogListLazy = lazy(() => import("./components/admin/BlogList"));
const BlogEditorLazy = lazy(() => import("./components/admin/BlogEditor"));

/** -------------------------
 * Server-side (eager) routes
 * ------------------------*/
import IndexSSR from "./pages/Index";
import TradesLandingSSR from "./pages/TradesLanding";
import NotFoundSSR from "./pages/NotFound";
import ServicesSSR from "./pages/Services";
import ServiceDetailSSR from "./pages/ServiceDetail";
import PricingSSR from "./pages/Pricing";
import ToolsHubSSR from "./pages/ToolsHub";
import ToolDetailSSR from "./pages/ToolDetail";
import FAQSSR from "./pages/FAQ";
import WhyDoDogsSSR from "./pages/WhyDoDogs";
import WhyDogsGuideDetailSSR from "./pages/WhyDogsGuideDetail";
import ContactSSR from "./pages/Contact";
import ServiceAreasSSR from "./pages/ServiceAreas";
import LocationSSR from "./pages/Location";
import BlogSupabaseSSR from "./pages/BlogSupabase";
import BlogPostSupabaseSSR from "./pages/BlogPostSupabase";
import LovableHubSSR from "./pages/LovableHub";
import LovableCategorySSR from "./pages/LovableCategory";
import PaymentSuccessSSR from "./pages/PaymentSuccess";
import PaymentCancelSSR from "./pages/PaymentCancel";
import PaymentFailedSSR from "./pages/PaymentFailed";
import AuthPageSSR from "./components/auth/AuthPage";
import BlogListSSR from "./components/admin/BlogList";
import BlogEditorSSR from "./components/admin/BlogEditor";

/** Pick SSR vs Client component */
const Index = isSSR ? IndexSSR : IndexLazy;
const TradesLanding = isSSR ? TradesLandingSSR : TradesLandingLazy;
const NotFound = isSSR ? NotFoundSSR : NotFoundLazy;
const Services = isSSR ? ServicesSSR : ServicesLazy;
const ServiceDetail = isSSR ? ServiceDetailSSR : ServiceDetailLazy;
const Pricing = isSSR ? PricingSSR : PricingLazy;
const ToolsHub = isSSR ? ToolsHubSSR : ToolsHubLazy;
const ToolDetail = isSSR ? ToolDetailSSR : ToolDetailLazy;
const FAQ = isSSR ? FAQSSR : FAQLazy;
const WhyDoDogs = isSSR ? WhyDoDogsSSR : WhyDoDogsLazy;
const WhyDogsGuideDetail = isSSR ? WhyDogsGuideDetailSSR : WhyDogsGuideDetailLazy;
const Contact = isSSR ? ContactSSR : ContactLazy;
const ServiceAreas = isSSR ? ServiceAreasSSR : ServiceAreasLazy;
const Location = isSSR ? LocationSSR : LocationLazy;
const BlogSupabase = isSSR ? BlogSupabaseSSR : BlogSupabaseLazy;
const BlogPostSupabase = isSSR ? BlogPostSupabaseSSR : BlogPostSupabaseLazy;
const LovableHub = isSSR ? LovableHubSSR : LovableHubLazy;
const LovableCategory = isSSR ? LovableCategorySSR : LovableCategoryLazy;
const PaymentSuccess = isSSR ? PaymentSuccessSSR : PaymentSuccessLazy;
const PaymentCancel = isSSR ? PaymentCancelSSR : PaymentCancelLazy;
const PaymentFailed = isSSR ? PaymentFailedSSR : PaymentFailedLazy;
const AuthPage = isSSR ? AuthPageSSR : AuthPageLazy;
const BlogList = isSSR ? BlogListSSR : BlogListLazy;
const BlogEditor = isSSR ? BlogEditorSSR : BlogEditorLazy;

const queryClient = new QueryClient();

// Trades subdomain check (client-only; on SSR it will just be false)
const isTradesSubdomain =
  typeof window !== "undefined" &&
  (window.location.hostname === "trades.tailwaggingwebdesign.com" ||
    (window.location.hostname === "localhost" && window.location.search.includes("trades=true")));

// Page view tracking (client-only)
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

const AppRoutes = () => {
  const routes = (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/admin/blog"
        element={
          <AdminGuard>
            <BlogList />
          </AdminGuard>
        }
      />
      <Route
        path="/admin/blog/:id"
        element={
          <AdminGuard>
            <BlogEditor />
          </AdminGuard>
        }
      />

      <Route element={<MarketingLayout />}>
        <Route path="/" element={isTradesSubdomain ? <TradesLanding /> : <Index />} />
        <Route path="/trades" element={<TradesLanding />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/tools" element={<ToolsHub />} />
        <Route path="/tools/:slug" element={<ToolDetail />} />
        <Route path="/portfolio" element={<Navigate to="/tools" replace />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/why-do-dogs/" element={<WhyDoDogs />} />
        <Route path="/why-do-dogs/:slug/" element={<WhyDogsGuideDetail />} />
        <Route path="/blog" element={<BlogSupabase />} />
        <Route path="/blog/lovable" element={<LovableHub />} />
        <Route path="/blog/lovable/:category" element={<LovableCategory />} />
        <Route path="/blog/:slug" element={<BlogPostSupabase />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/locations/:slug" element={<Location />} />
        <Route path="/success/stripe/:sessionId" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentCancel />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  // SSR/prerender: no Suspense wrapper (avoids the renderToString + Suspense failure)
  if (isSSR) return routes;

  // Client: keep Suspense so lazy() still splits and loads fast
  return <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ReviewsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {!isSSR && <PageViewTracker />}
            <AppRoutes />
          </TooltipProvider>
        </ReviewsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

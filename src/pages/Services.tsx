import { Link, useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CheckCircle, Star, Phone, MapPin, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES, SLUGS, BASE_URL, SERVICE_AREA, type Slug } from "@/data/services";
import { PACKAGES } from "@/data/pricing";
import { useRef, useEffect, useState } from "react";
import { trackEvent, trackCTAClick, trackNavClick, trackFAQToggle } from "@/lib/analytics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Import service images
import servicesHeroImg from "@/assets/services-hero.jpg";
import serviceWebsiteDesignImg from "@/assets/service-website-design.jpg";
import serviceAutomationsImg from "@/assets/service-automations.jpg";
import serviceBookingImg from "@/assets/service-booking.jpg";
import serviceLocalSeoImg from "@/assets/service-local-seo.jpg";
import serviceBrandingImg from "@/assets/service-branding.jpg";
import serviceReviewsImg from "@/assets/service-reviews.jpg";
import servicePricingImg from "@/assets/service-pricing.jpg";
import serviceFaqImg from "@/assets/service-faq.jpg";

export default function Services() {
  // --- Service cards (UI + used in JSON-LD) ---
  const cards = SLUGS.map((slug) => ({
    href: `/services/${slug}`,
    title: SERVICES[slug].title,
    desc: SERVICES[slug].desc,
  }));

  // --- SEO: title, description, keywords, JSON-LD ---
  const keywords = [
    // Primary + locale
    "pet care web design services northampton",
    "pet website design northamptonshire",
    "pet business web design northampton",
    "pet web design agency northampton",
    "contact pet web designer northampton",

    // Niche service intents
    "dog walker website design",
    "dog groomer website designer northampton",
    "pet sitter website designer",
    "veterinary website design northampton",
    "pet daycare website design",
    "animal care website design",

    // Outcome / benefit
    "local seo for pet businesses northampton",
    "pet business lead generation websites",
    "fast mobile websites for pet care",
    "website automations for pet businesses",
    "pet care website maintenance plans",

    // Service-area discovery
    "pet web design northamptonshire",
    "pet website designer near me northampton",
    "northampton pet web design services",
    "northamptonshire pet website agency",
  ];

  type FAQItem = { q: string; a: string };
  const faqs: FAQItem[] = [
    {
      q: "How long does it take?",
      a: "Most pet care websites take 2-4 weeks from start to launch. This includes design, content creation, SEO setup, and testing. We provide regular updates throughout the process.",
    },
    {
      q: "Do you help with copy?",
      a: "Yes! We craft friendly, pet-care aligned copy and brand stories that resonate with pet owners. All packages include professional copywriting tailored to your business.",
    },
    {
      q: "What if I'm not tech-savvy?",
      a: "That's exactly why we exist. We handle all the technical setup, hosting, and maintenance. You just focus on running your pet care business while we manage the website.",
    },
    {
      q: "Can you update my existing site?",
      a: "Absolutely. We handle complete website migrations including content transfer, SEO preservation, and redirect setup to maintain your search rankings and ensure no downtime.",
    },
    {
      q: "Do I need to provide photos?",
      a: "While your own photos are great, they're not required. We can help source professional pet care imagery or guide you on taking better photos of your furry clients.",
    },
    {
      q: "Which pet-care businesses do you build websites for?",
      a: "Dog walkers, dog groomers, pet sitters, home boarders, dog trainers, cat sitters, house sitters, pet taxi providers, daycares, kennels and veterinary practices across Northamptonshire.",
    },
    {
      q: "Do you offer local SEO for 'near me' searches?",
      a: "Yes. We optimise Google Business Profile, service pages and location content to rank for 'near me' and town-specific queries in Northampton, Kettering, Milton Keynes and surrounding areas.",
    },
  ];

  // Unified page meta used across SEO + JSON-LD so content stays in sync
  const pageTitle = "Pet-Care Web Design Services in Northampton";
  const pageDescription =
    "Web design, local SEO, automations, care plans & audits for dog walkers, groomers, sitters and vets in Northamptonshire. Book a free consultation.";

  // Build FAQ JSON-LD directly from the same rendered array
  const faqJsonLd = faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));

  const jsonLd = [
    // Services catalog listing (main entity for this page)
    {
      "@context": "https://schema.org",
      "@type": "ServiceCatalog",
      "@id": BASE_URL + "/services#catalog",
      name: "Pet-Care Web Design Services",
      description: "Web design, local SEO, automations, care plans and audits for pet-care businesses in Northamptonshire.",
      url: BASE_URL + "/services",
      provider: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pet-Care Digital Services",
        itemListElement: cards.map((card, index) => ({
          "@type": "Offer",
          position: index + 1,
          "@id": BASE_URL + card.href + "#offer",
          name: card.title,
          description: card.desc,
          category: "Web Design Service",
          url: BASE_URL + card.href,
          audience: {
            "@type": "BusinessAudience",
            name: "Pet Care Business Owners",
          },
          itemOffered: {
            "@type": "Service",
            "@id": BASE_URL + card.href + "#service",
            name: card.title,
            serviceType: card.title,
            serviceLocation: {
              "@type": "Place",
              name: "Northampton, Northamptonshire",
            },
            areaServed: SERVICE_AREA.map((area) => area.name),
            provider: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
          },
        })),
      },
    },
    // ItemList (helps bots understand list of service links)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": BASE_URL + "/services#list",
      itemListElement: cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: BASE_URL + card.href,
        name: card.title,
      })),
    },
    // WebPage + Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": BASE_URL + "/services#webpage",
      url: BASE_URL + "/services",
      name: "Pet-Care Web Design Services in Northampton",
      description: pageDescription,
      inLanguage: "en-GB",
      dateModified: new Date().toISOString(),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: BASE_URL + "/og.png",
      },
      about: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
      isPartOf: { "@id": BASE_URL + "/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Services", item: BASE_URL + "/services" },
        ],
      },
    },
    // FAQ (ensure matching visible content below)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": BASE_URL + "/services#faq",
      mainEntity: faqJsonLd,
    },
  ];

  const PAGE_LOC = "services_hub";

  // --- Modern section UX state/refs + tracking ---
  const SECTION_ORDER: Slug[] = ["website-design", "local-seo", "automations", "care-plans", "speed-ux-audits"];

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleExpanded = (slug: Slug, next?: boolean) => {
    const val = next ?? !expanded[slug];
    setExpanded((m) => ({ ...m, [slug]: val }));
    trackEvent(val ? "service_section_expand" : "service_section_collapse", { slug, location: PAGE_LOC });
  };

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sectionHoverTimers = useRef<Record<string, number>>({});

  const scrollToSection = (slug: Slug) => {
    const el = typeof document !== "undefined" ? document.getElementById(slug) : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      trackEvent("services_section_nav_click", { slug, location: PAGE_LOC });
    }
  };

  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const slug = el.id as Slug;
          if (entry.isIntersecting && !seen.has(slug)) {
            seen.add(slug);
            trackEvent("service_section_impression", {
              slug,
              service_title: SERVICES[slug]?.title,
              location: PAGE_LOC,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTION_ORDER.forEach((slug) => {
      const el = sectionRefs.current[slug];
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const onSectionEnter = (slug: Slug) => {
    prefetchOnHover(slug);
    sectionHoverTimers.current[slug] = window.setTimeout(() => {
      trackEvent("service_section_hover_300ms", { slug, location: PAGE_LOC, dwell_ms: 300 });
      delete sectionHoverTimers.current[slug];
    }, 300);
  };
  const onSectionLeave = (slug: Slug) => {
    const t = sectionHoverTimers.current[slug];
    if (t) {
      clearTimeout(t);
      delete sectionHoverTimers.current[slug];
    }
  };

  // --- Hover dwell + keyboard activation (single, conflict-free implementation) ---
  const navigate = useNavigate();
  const hoverTimers = useRef<Record<string, number>>({});

  // very defensive: works with GA4 (gtag) or GTM (dataLayer); no-op if absent
  const track = (event: string, props?: Record<string, any>) => {
    if (typeof window === "undefined") return;
    (window as any).gtag?.("event", event, props);
    (window as any).dataLayer?.push?.({ event, ...props });
  };

  // --- Lightweight prefetch on hover (HTML + rel=prefetch). Adjust if you add route-level code splitting.
  const addPrefetchLink = (href: string) => {
    if (typeof document === "undefined") return;
    const existing = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
    if (existing) return;
    const l = document.createElement("link");
    l.rel = "prefetch";
    l.href = href;
    document.head.appendChild(l);
  };
  const prefetchOnHover = (slug: Slug) => {
    const href = `/services/${slug}`;
    try { addPrefetchLink(href); } catch {}
    try { fetch(href, { mode: "no-cors" }); } catch {}
  };

  const onCardEnter = (slug: Slug, index: number) => {
    // Warm up navigation target
    prefetchOnHover(slug);

    hoverTimers.current[slug] = window.setTimeout(() => {
      track("service_card_hover_200ms", { slug, index, page: "services" });
      trackEvent("service_card_hover", {
        slug,
        service_title: SERVICES[slug].title,
        position: index + 1,
        dwell_ms: 200,
        location: PAGE_LOC,
      });
      delete hoverTimers.current[slug];
    }, 200);
  };

  const onCardLeave = (slug: Slug) => {
    const t = hoverTimers.current[slug];
    if (t) {
      clearTimeout(t);
      delete hoverTimers.current[slug];
    }
  };

  const activateCard = (slug: Slug, index: number) => {
    track("service_card_click", { slug, index, page: "services" });
    trackEvent("service_card_click", {
      slug,
      service_title: SERVICES[slug].title,
      position: index + 1,
      location: PAGE_LOC,
    });
    navigate(`/services/${slug}`);
  };

  const onCardKeyDown = (e: React.KeyboardEvent<HTMLElement>, slug: Slug, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateCard(slug, index);
    }
  };

  return (
    <>
      <Seo
        title="Pet-Care Web Design Services in Northampton | Tail Wagging Websites Factory"
        description="Web design, local SEO, automations, care plans & audits for dog walkers, groomers, sitters and vets in Northamptonshire. Book a free consultation."
        path="/services"
        keywords={keywords}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Services", item: "/services" }]}
        jsonLd={jsonLd}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to Grow Your Pet-Care Business.
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We design modern websites and smart automations that help dog walkers, groomers, pet sitters, trainers and home-boarders attract more bookings with less admin.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild onClick={() => trackCTAClick("hero_cta", "consultation")}>
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild onClick={() => trackCTAClick("hero_cta", "pricing")}>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={servicesHeroImg}
              alt="Friendly pet care business scene with dog walker and dogs"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Service Sections with Images */}
        <div className="space-y-16 mb-16">
          {/* 1. Custom Website Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceWebsiteDesignImg}
                alt="Clean laptop mockup displaying pet care website design"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Custom Website Design</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Your website should feel friendly, professional, and built for pet parents — not a generic template.
              </p>
              <h3 className="font-semibold mb-2">Includes:</h3>
              <ul className="space-y-2 mb-4">
                {["Clean, mobile-first layouts", "Scroll-based storytelling", "Strong CTAs", "Accessibility-focused", "Fast performance"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Perfect for:</strong> Dog walkers, groomers, sitters, trainers.
              </p>
              <Button asChild onClick={() => trackCTAClick("service_cta", "website-design")}>
                <Link to="/services/website-design">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* 2. Smart Automations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-4">Smart Automations</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Stop spending hours sending reminders or answering the same questions.
              </p>
              <h3 className="font-semibold mb-2">We automate:</h3>
              <ul className="space-y-2 mb-4">
                {["Booking confirmations", "Appointment reminders", "Review requests", "Cancellation notices", "Lead nurturing messages"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-primary mb-4">
                Saves 5–10 hours per week instantly.
              </p>
              <Button asChild onClick={() => trackCTAClick("service_cta", "automations")}>
                <Link to="/services/automations">Learn More</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceAutomationsImg}
                alt="Modern automation flowchart with pet care icons"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* 3. Booking & Scheduling System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceBookingImg}
                alt="Smartphone displaying pet care booking calendar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Booking & Scheduling System Setup</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We integrate a clean, reliable booking system into your site.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Systems supported:</strong> Calendly, Trafft, Acuity, Timely, custom booking pages.
              </p>
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="space-y-2 mb-4">
                {["Online bookings", "Payment/deposit collection", "Automated reminders", "Two-way sync", "Client notes"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild onClick={() => trackCTAClick("service_cta", "booking")}>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>

          {/* 4. Google Business Profile + Local SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-4">Google Business Profile + Local SEO</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We help you appear on Google when pet owners search:
              </p>
              <ul className="space-y-1 mb-4 text-sm">
                <li>"dog walker near me"</li>
                <li>"pet sitter Northampton"</li>
                <li>"best groomer in my area"</li>
              </ul>
              <h3 className="font-semibold mb-2">Includes:</h3>
              <ul className="space-y-2 mb-4">
                {["Google Business Profile setup", "Local SEO optimisation", "On-page SEO", "Map ranking improvements", "Review strategy"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild onClick={() => trackCTAClick("service_cta", "local-seo")}>
                <Link to="/services/local-seo">Learn More</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceLocalSeoImg}
                alt="Google Maps style illustration with paw-shaped location pins"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* 5. Branding + Copywriting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceBrandingImg}
                alt="Brand moodboard with colors, typography, and pet care icons"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Branding + Copywriting</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Build trust instantly with friendly, pet-care aligned branding and warm, human copy.
              </p>
              <h3 className="font-semibold mb-2">Includes:</h3>
              <ul className="space-y-2 mb-4">
                {["Brand story", "Service descriptions", "Taglines", "Typography + colour palettes", "Friendly pet-care icons"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild onClick={() => trackCTAClick("service_cta", "branding")}>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>

          {/* 6. Review Booster System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-4">Review Booster System</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Get more 5-star reviews automatically.
              </p>
              <h3 className="font-semibold mb-2">System includes:</h3>
              <ul className="space-y-2 mb-4">
                {["Automated review requests", "Private filter page", "Google review funnel", "Review widgets for your site"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild onClick={() => trackCTAClick("service_cta", "reviews")}>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={serviceReviewsImg}
                alt="Floating 5-star review cards with pet owner testimonials"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Pricing Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Choose a package designed for your stage</h2>
            <p className="text-muted-foreground">Starter – perfect for new pet pros  |  Pro – for growing businesses  |  Enterprise – full automations + scale</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`rounded-xl border p-6 ${pkg.popular ? 'border-primary shadow-lg' : 'border-border'}`}>
                {pkg.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold mb-2">{pkg.price}</div>
                <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" asChild onClick={() => trackCTAClick("pricing_preview", "view_pricing")}>
              <Link to="/pricing">View Full Pricing Details</Link>
            </Button>
          </div>
        </motion.div>

        {/* Who We Help (SEO Section) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-muted/30 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Who We Help</h2>
          <p className="text-center text-muted-foreground mb-8">
            We specialise in websites and digital systems for:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Dog walkers",
              "Groomers",
              "Pet sitters",
              "Home boarders",
              "Dog trainers",
              "Cat sitters",
              "House sitters",
              "Pet taxi providers",
              "Daycares",
              "Kennels"
            ].map((business) => (
              <div key={business} className="flex items-center gap-2 p-3 rounded-lg bg-background/60 border">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{business}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger
                      onClick={() => trackFAQToggle(faq.q, "services", "open")}
                      className="text-left hover:no-underline"
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={serviceFaqImg}
                alt="Playful dog tilting head with question mark"
                className="w-full max-w-[300px] rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to look more professional and get more pet-care bookings?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's build a website that attracts pet owners and makes your business run smoother.
          </p>
          <Button size="lg" asChild onClick={() => trackCTAClick("final_cta", "contact")}>
            <Link to="/contact">Let's Build Your New Website</Link>
          </Button>
        </motion.div>

      </section>
    </>
  );
}

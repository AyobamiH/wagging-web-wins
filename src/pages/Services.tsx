import { Link, useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CheckCircle, Star, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES, SLUGS, BASE_URL, SERVICE_AREA, type Slug } from "@/data/services";
import { useRef, useEffect, useState } from "react";
import { trackEvent, trackCTAClick, trackNavClick, trackFAQToggle } from "@/lib/analytics";
import { ChevronRight } from "lucide-react";

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
      q: "Which pet-care businesses do you build websites for?",
      a: "Dog walkers, dog groomers, pet sitters, pet daycares and veterinary practices across Northamptonshire.",
    },
    {
      q: "Do you offer local SEO for 'near me' searches?",
      a: "Yes. We optimise Google Business Profile, service pages and location content to rank for 'near me' and town-specific queries in Northampton, Kettering, Milton Keynes and surrounding areas.",
    },
    {
      q: "Can you automate bookings and client follow-ups?",
      a: "Absolutely. We connect forms, calendars and CRMs to send confirmations, reminders and updates automatically.",
    },
    {
      q: "What's included in your pricing packages?",
      a: "Our packages range from £750-£3,500 and include website design, SEO setup, Google Business Profile optimization, contact forms, and mobile responsiveness. Higher packages add automations, content marketing, and conversion optimization.",
    },
    {
      q: "How long does a website project typically take?",
      a: "Most pet care websites take 2-4 weeks from start to launch. This includes design, content creation, SEO setup, and testing. We provide regular updates throughout the process.",
    },
    {
      q: "Do you help migrate existing websites?",
      a: "Yes, we handle complete website migrations including content transfer, SEO preservation, and redirect setup to maintain your search rankings and ensure no downtime.",
    },
    {
      q: "Which areas of Northamptonshire do you cover?",
      a: "We serve all of Northamptonshire including Northampton, Kettering, Wellingborough, Daventry, Corby, Rushden, Towcester, plus Milton Keynes and Banbury.",
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

        <header className="max-w-3xl mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Pet-Care Web Design Services in Northampton</h1>
          <p className="mt-3 text-muted-foreground">
            Websites, <strong>local SEO</strong> and <strong>automations</strong> built for how pet parents shop.
            We help dog walkers, groomers, pet sitters and vets across <strong>Northamptonshire</strong> get found,
            look professional and turn clicks into bookings.
          </p>
          {/* NAP chip: keep UI local-only, keep full address in JSON-LD */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border bg-card/60 px-2.5 py-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Northampton, Northamptonshire
            </span>
            <a
              href="tel:+447402342694"
              className="inline-flex items-center gap-1 rounded-full border bg-card/60 px-2.5 py-1 hover:bg-card"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              +44 7402 342694
            </a>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {SLUGS.map((slug, i) => {
            const c = SERVICES[slug];
            return (
              <article
                key={slug}
                role="link"
                tabIndex={0}
                aria-label={`Learn more: ${c.title}`}
                onClick={() => activateCard(slug, i)}
                onKeyDown={(e) => onCardKeyDown(e, slug, i)}
                onMouseEnter={() => onCardEnter(slug, i)}
                onMouseLeave={() => onCardLeave(slug)}
                className="
                  group relative cursor-pointer rounded-lg border border-surface bg-glass p-5
                  transition
                  hover:bg-glass-hover hover:shadow-md hover:border-primary/40
                  active:scale-[0.99]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
              >
                <div
                    className="
                      pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition
                      group-hover:opacity-100
                    "
                    aria-hidden="true"
                    role="presentation"
                  >
                    {/* Scrim: strong bottom gradient + blur when supported */}
                    <div className="
                          absolute inset-0 rounded-lg ring-1 ring-border
                          bg-gradient-to-t from-background/95 via-background/80 to-background/20
                          supports-[backdrop-filter]:backdrop-blur-sm
                        "
                      />

                    {/* Content: bottom stack of 2–3 bullets */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <ul className="space-y-1.5 text-[13px] text-foreground">
                        {SERVICES[slug].includes.slice(0, 3).map((b) => (
                          <li key={b} className="flex gap-2">
                            <CheckCircle className="h-3.5 w-3.5 text-primary flex-none mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>

                {/* visual CTA; the whole card is the actionable link */}
                <div className="inline-flex items-center gap-1 text-sm font-medium">
                  <span className="underline underline-offset-4">Learn more</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Trust Strip */}
        <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-center">What locals say</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">"Groomer in Kettering: +38% bookings in 6 weeks"</p>
                <p className="text-xs text-muted-foreground">— Professional Pet Grooming, Kettering</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">"Dog Walker in Northampton: 2 hours/day saved via automations"</p>
                <p className="text-xs text-muted-foreground">— Happy Paws Walking Service, Northampton</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Service Sections */}
        <div className="mb-12">
          {/* Sticky jump nav */}
          <div className="sticky top-16 z-10 -mx-4 px-4 py-2 bg-gradient-to-b from-background/80 via-background/60 to-transparent backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-border/40">
            <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Jump to service">
              {SECTION_ORDER.map((slug) => {
                const s = SERVICES[slug];
                return (
                  <button
                    key={slug}
                    role="tab"
                    aria-controls={slug}
                    onClick={() => scrollToSection(slug)}
                    className="shrink-0 rounded-full border bg-card/60 px-3 py-1.5 text-sm hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-10">
            {SECTION_ORDER.map((slug, idx) => {
              const d = SERVICES[slug];
              const showAll = !!expanded[slug];
              const inc = showAll ? d.includes : d.includes.slice(0, 6);
              const out = showAll ? d.outcomes : d.outcomes.slice(0, 6);
              return (
                <motion.section
                  key={slug}
                  id={slug}
                  ref={(el) => (sectionRefs.current[slug] = el)}
                  className="scroll-mt-24 group rounded-2xl border bg-card/50 p-6 transition hover:bg-card/70"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  onMouseEnter={() => onSectionEnter(slug)}
                  onMouseLeave={() => onSectionLeave(slug)}
                >
                  <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr] items-start">
                    {/* Left: summary + actions */}
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">{d.title}</h2>
                      <p className="mt-2 text-muted-foreground max-w-3xl">{d.intro}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          asChild
                          onClick={() =>
                            trackEvent("service_section_cta", { slug, action: "view_details", location: PAGE_LOC })
                          }
                        >
                          <Link to={`/services/${slug}`}>View full details</Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          onClick={() => trackCTAClick("get_quote_section", slug)}
                        >
                          <Link to="/contact">Get quote</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Right: interactive includes/outcomes */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border bg-background/60 p-4">
                        <p className="font-medium mb-2">Includes</p>
                        <ul className="grid gap-2">
                          {inc.map((item) => (
                            <motion.li
                              key={item}
                              className="rounded-lg border bg-card/50 px-3 py-2 text-sm text-muted-foreground flex items-start gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border bg-background/60 p-4">
                        <p className="font-medium mb-2">Outcomes</p>
                        <ul className="grid gap-2">
                          {out.map((item) => (
                            <motion.li
                              key={item}
                              className="rounded-lg border bg-card/50 px-3 py-2 text-sm text-muted-foreground flex items-start gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {(d.includes.length > 6 || d.outcomes.length > 6) && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toggleExpanded(slug)}
                        className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                      >
                        {showAll ? "Show less" : "Show more"}
                      </button>
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>
        </div>

        {/* Service area for local SEO */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Areas We Serve</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6">
            {SERVICE_AREA.map((area) => (
              <Link
                key={area.slug}
                to={`/locations/${area.slug}`}
                className="p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors text-center group"
                onClick={() => trackNavClick(area.name, `/locations/${area.slug}`, "services_areas_grid")}
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{area.name}</span>
              </Link>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div
            className="p-6 bg-muted/30 rounded-lg border text-center"
            onClick={() => trackCTAClick("midpage_cta_block", "consultation_service_page")}
          >
            <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
            <p className="text-sm text-muted-foreground mb-4">Book a free consultation to discuss your pet care business needs</p>
            <CTAButtons className="justify-center" />
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-8">
          <CTAButtons className="justify-center sm:justify-start" />

          {/* Inline helper: Calendly + contact form */}
          <div className="mt-3 text-center sm:text-left text-sm text-muted-foreground">
            Need a hand choosing a package? 
            <a
              href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
              className="font-medium underline ml-1"
              onClick={() => trackCTAClick("calendly_inline_link", "services_page")}
            >
              Book a Calendly slot
            </a>
            
            <span className="mx-2">•</span>
            <Link
              to="/contact"
              className="font-medium underline"
              onClick={() => trackCTAClick("contact_form_link", "services_page")}
            >
              Contact form
            </Link>
          </div>

          <div className="mt-4 text-center sm:text-left">
            <Button variant="default" size="sm" asChild>
              <a href="tel:+447402342694" onClick={() => trackCTAClick("call", "services_page_call")}>
                Call +44 7402 342694
              </a>
            </Button>
          </div>
        </div>

        {/* Expanded FAQ that mirrors JSON-LD */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="rounded-lg border p-4 bg-card/50"
                onToggle={(e) => trackFAQToggle(item.q, "services_faq", e.currentTarget.open ? "open" : "close")}
              >
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

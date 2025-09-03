import { useEffect } from "react";
import pawprintOg from "@/assets/pawprint-og.png";
import pawprintSquare from "@/assets/pawprint-square.png";

export type Breadcrumb = { name: string; item: string };

interface SeoProps {
  title: string;
  description: string;
  path: string; // canonical path e.g. "/services"
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
  breadcrumbs?: Breadcrumb[];
  jsonLd?: any[]; // additional page-specific JSON-LD blocks
  keywords?: string[];
  price?: string;
  availability?: string;
  noIndex?: boolean;
  canonicalOverride?: string;
  hreflang?: { lang: string; href: string }[];
}

const BRAND = {
  name: "Tail Wagging Websites Factory Northampton",
  phone: "+44 7402 342694",
  locality: "Northampton",
  countryCode: "GB",
  countryName: "United Kingdom",
  sameAs: [
    "https://www.tiktok.com/@tailwaggingwebdesigns",
    "https://www.instagram.com/tailwaggingwebdesigns",
    "https://www.threads.net/@tailwaggingwebdesigns",
    "https://www.linkedin.com/in/john-haastrup/",
  ],
};

export function Seo({
  title,
  description,
  path,
  imageUrl,
  imageAlt,
  type = "website",
  breadcrumbs,
  jsonLd = [],
  keywords = [],
  price,
  availability,
  noIndex = false,
  canonicalOverride,
  hreflang = []
}: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonical = origin + path;
    const img = imageUrl || pawprintOg;

    document.title = title;

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el!);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
      return el;
    };

    // Basic metas
    ensureMeta('meta[name="description"]', { name: "description", content: description });
    ensureMeta('meta[name="viewport"]', { name: "viewport", content: "width=device-width, initial-scale=1" });
    
    // Set robots meta (noindex if specified, otherwise default)
    const robotsContent = noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    // in Seo.tsx, inside useEffect where robotsContent is set
const robotsContent = noIndex
  ? "noindex, follow"
  : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    ensureMeta('meta[name="robots"]', { name: "robots", content: robotsContent });
    
    // Keywords if provided
    if (keywords.length > 0) {
      ensureMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
    }

    // Open Graph
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', { property: "og:description", content: description });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: type });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    ensureMeta('meta[property="og:image"]', { property: "og:image", content: img });
    ensureMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    ensureMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    ensureMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: imageAlt || "Tail Wagging Websites - Pet Care Web Design" });
    ensureMeta('meta[property="og:site_name"]', { property: "og:site_name", content: BRAND.name });
    ensureMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_GB" });

    // Twitter
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: img });
    ensureMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: imageAlt || "Tail Wagging Websites - Pet Care Web Design" });
    
    // Additional SEO meta tags
    ensureMeta('meta[name="author"]', { name: "author", content: "Ayobami Haastrup" });
    ensureMeta('meta[name="theme-color"]', { name: "theme-color", content: "#2563eb" });
    ensureMeta('meta[name="msapplication-TileColor"]', { name: "msapplication-TileColor", content: "#2563eb" });

    // Canonical (use override if provided, otherwise construct from origin + path)
    const finalCanonical = canonicalOverride || canonical;
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = finalCanonical;

    // Hreflang tags if provided
    if (hreflang.length > 0) {
      // Remove existing hreflang links
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
      
      // Add new hreflang links
      hreflang.forEach(({ lang, href }) => {
        const hreflangLink = document.createElement("link");
        hreflangLink.rel = "alternate";
        hreflangLink.hreflang = lang;
        hreflangLink.href = href;
        document.head.appendChild(hreflangLink);
      });
    }

    // JSON-LD: Enhanced schema with professional services
    const baseJsonLd: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: BRAND.name,
        url: origin,
        description: "Professional web design and digital marketing services for pet care businesses in Northampton",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/tools?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: BRAND.name,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: pawprintSquare,
          width: 512,
          height: 512
        },
        image: pawprintOg,
        telephone: BRAND.phone,
        areaServed: [
          { "@type": "City", name: "Northampton" },
          { "@type": "City", name: "Kettering" },
          { "@type": "City", name: "Wellingborough" },
          { "@type": "City", name: "Daventry" },
          { "@type": "Country", name: BRAND.countryName }
        ],
        sameAs: BRAND.sameAs,
        knowsAbout: [
          "Pet Care Website Design",
          "Local SEO for Pet Businesses",
          "Mobile-First Web Development",
          "Pet Business Automation",
          "Google Business Profile Optimization",
          "Conversion Rate Optimization",
          "E-commerce for Pet Stores",
          "Booking System Integration"
        ],
        serviceType: [
          "Website Design",
          "Search Engine Optimization",
          "Digital Marketing",
          "Business Automation",
          "Web Development",
          "UX/UI Design",
          "Content Management"
        ],
        foundingDate: "2023",
        founder: {
          "@type": "Person",
          name: "Ayobami Haastrup",
          jobTitle: "Web Designer & Digital Marketing Specialist"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "50"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${origin}/#localbusiness`,
        name: BRAND.name,
        url: origin,
        telephone: BRAND.phone,
        priceRange: "££-£££",
        address: {
          "@type": "PostalAddress",
          addressLocality: BRAND.locality,
          addressCountry: BRAND.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "52.2405",
          longitude: "-0.9027"
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00"
          }
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pet Care Web Services",
          itemListElement: [
            {
              "@type": "Offer",
              "@id": `${origin}/services/website-design`,
              name: "Website Design for Pet Care Businesses",
              description: "Mobile-first website design specifically for dog walkers, groomers, pet sitters and trainers",
              url: `${origin}/services/website-design`,
              category: "Web Design",
              ...(price && { price: price }),
              ...(availability && { availability: availability }),
              eligibleRegion: {
                "@type": "Country",
                name: "United Kingdom"
              }
            },
            {
              "@type": "Offer", 
              "@id": `${origin}/services/local-seo`,
              name: "Local SEO for Pet Services",
              description: "Local search optimization to help pet care businesses be found by nearby customers",
              url: `${origin}/services/local-seo`,
              category: "SEO Services"
            },
            {
              "@type": "Offer",
              "@id": `${origin}/services/automations`,
              name: "Pet Business Automation",
              description: "Automated workflows for booking confirmations, reminders, and customer communication",
              url: `${origin}/services/automations`,
              category: "Business Automation"
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Pet Care Website Design & Digital Marketing",
        provider: {
          "@type": "Organization",
          name: BRAND.name
        },
        areaServed: [
          { "@type": "City", name: "Northampton" },
          { "@type": "City", name: "Kettering" },
          { "@type": "City", name: "Wellingborough" },
          { "@type": "City", name: "Daventry" }
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Pet Care Business Owners"
        },
        category: "Web Design and Digital Marketing"
      },
    ];

    // Breadcrumbs if provided
    const breadcrumbJson = breadcrumbs && breadcrumbs.length > 0
      ? [{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: origin + b.item,
          })),
        }]
      : [];

    const allJson = [...baseJsonLd, ...breadcrumbJson, ...jsonLd];

    // Remove previous JSON-LD (ours)
    document.querySelectorAll('script[data-managed="jsonld"]').forEach((n) => n.remove());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-managed", "jsonld");
    script.text = JSON.stringify(allJson);
    document.head.appendChild(script);

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, path, imageUrl, imageAlt, type, JSON.stringify(breadcrumbs), JSON.stringify(jsonLd), JSON.stringify(keywords), price, availability, noIndex, canonicalOverride, JSON.stringify(hreflang)]);

  return null;
}

export default Seo;

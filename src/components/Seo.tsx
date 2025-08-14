import { useEffect } from "react";

export type Breadcrumb = { name: string; item: string };

interface SeoProps {
  title: string;
  description: string;
  path: string; // canonical path e.g. "/services"
  imageUrl?: string;
  type?: "website" | "article";
  breadcrumbs?: Breadcrumb[];
  jsonLd?: any[]; // additional page-specific JSON-LD blocks
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
  type = "website",
  breadcrumbs,
  jsonLd = [],
}: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonical = origin + path;
    const img = imageUrl || `${origin}/og.png`;

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

    // Open Graph
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', { property: "og:description", content: description });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: type });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    ensureMeta('meta[property="og:image"]', { property: "og:image", content: img });

    // Twitter
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: img });

    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

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
          "Google Business Profile Optimization"
        ],
        serviceType: [
          "Website Design",
          "Search Engine Optimization",
          "Digital Marketing",
          "Business Automation",
          "Web Development"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: BRAND.name,
        url: origin,
        telephone: BRAND.phone,
        areaServed: [
          { "@type": "City", name: "Northampton" },
          { "@type": "City", name: "Kettering" },
          { "@type": "City", name: "Wellingborough" },
          { "@type": "City", name: "Daventry" }
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: BRAND.locality,
          addressCountry: BRAND.countryCode,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pet Care Web Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Design for Pet Care Businesses",
                description: "Mobile-first website design specifically for dog walkers, groomers, pet sitters and trainers"
              }
            },
            {
              "@type": "Offer", 
              itemOffered: {
                "@type": "Service",
                name: "Local SEO for Pet Services",
                description: "Local search optimization to help pet care businesses be found by nearby customers"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service", 
                name: "Pet Business Automation",
                description: "Automated workflows for booking confirmations, reminders, and customer communication"
              }
            }
          ]
        }
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
  }, [title, description, path, imageUrl, type, JSON.stringify(breadcrumbs), JSON.stringify(jsonLd)]);

  return null;
}

export default Seo;

import { Helmet } from "react-helmet-async";
import pawprintOg from "@/assets/pawprint-og.png";

const CANONICAL_ORIGIN = "https://tailwaggingwebdesign.com";

export type Breadcrumb = { name: string; item: string };

interface SeoHelmetProps {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
  breadcrumbs?: Breadcrumb[];
  jsonLd?: any[];
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

/**
 * SSR-compatible SEO component using react-helmet-async
 * Works both during server-side pre-rendering and client-side navigation
 */
export function SeoHelmet({
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
}: SeoHelmetProps) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  const canonical = canonicalOverride || `${CANONICAL_ORIGIN}${safePath}`;
  const img = imageUrl || pawprintOg;
  const robotsContent = noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Build organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: CANONICAL_ORIGIN,
    logo: `${CANONICAL_ORIGIN}${pawprintOg}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.phone,
      contactType: "Customer Service",
      areaServed: BRAND.countryCode,
      availableLanguage: "en"
    },
    sameAs: BRAND.sameAs
  };

  // Build website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: CANONICAL_ORIGIN,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${CANONICAL_ORIGIN}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Build LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: "Professional website design and digital services for pet care businesses in Northamptonshire",
    url: CANONICAL_ORIGIN,
    telephone: BRAND.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.locality,
      addressCountry: BRAND.countryName
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 52.2405,
        longitude: -0.9027
      },
      geoRadius: "50000"
    },
    sameAs: BRAND.sameAs
  };

  // Build breadcrumb schema if provided
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item
    }))
  } : null;

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
    breadcrumbSchema,
    ...jsonLd
  ].filter(Boolean);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />
      
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Hreflang */}
      {hreflang.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || "Tail Wagging Websites - Pet Care Web Design"} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={imageAlt || "Tail Wagging Websites - Pet Care Web Design"} />

      {/* Price & availability (for products/services) */}
      {price && <meta property="product:price:amount" content={price} />}
      {availability && <meta property="product:availability" content={availability} />}

      {/* Structured Data */}
      {allSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Re-export for backward compatibility
export const Seo = SeoHelmet;

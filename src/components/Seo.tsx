/**
 * SEO Component using react-helmet-async for SSR compatibility
 * 
 * This component handles all meta tags, Open Graph, Twitter Cards, and JSON-LD
 * structured data. It works with both server-side rendering (prerendering) and
 * client-side SPA navigation.
 */
import { Helmet } from "react-helmet-async";
import pawprintOg from "@/assets/pawprint-og.png";

const CANONICAL_ORIGIN = "https://tailwaggingwebdesign.com";
const DEFAULT_TITLE = "Tail Wagging Websites | Pet Care Web Design";
const DEFAULT_DESCRIPTION = "Mobile-first websites and automations for dog walkers, groomers, sitters and trainers in Northamptonshire.";

export type Breadcrumb = { name: string; item: string };

interface SeoProps {
  title?: string;
  description?: string;
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

function Seo({
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
  const safePath = path.startsWith("/") ? path : `/${path}`;
  const canonical = canonicalOverride || `${CANONICAL_ORIGIN}${safePath}`;
  
  // Fallback chains for SEO resilience
  const safeTitle = title || DEFAULT_TITLE;
  const safeDescription = description || DEFAULT_DESCRIPTION;
  const img = imageUrl?.startsWith('http') 
    ? imageUrl 
    : imageUrl 
      ? `${CANONICAL_ORIGIN}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
      : `${CANONICAL_ORIGIN}${pawprintOg}`;
  
  const robotsContent = noIndex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND.name,
    "url": CANONICAL_ORIGIN,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${CANONICAL_ORIGIN}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "url": CANONICAL_ORIGIN,
    "logo": `${CANONICAL_ORIGIN}${pawprintOg}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BRAND.phone,
      "contactType": "customer service",
      "areaServed": BRAND.countryCode,
      "availableLanguage": "English"
    },
    "sameAs": BRAND.sameAs
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": BRAND.name,
    "image": `${CANONICAL_ORIGIN}${pawprintOg}`,
    "@id": CANONICAL_ORIGIN,
    "url": CANONICAL_ORIGIN,
    "telephone": BRAND.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BRAND.locality,
      "addressCountry": BRAND.countryName
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.2405,
      "longitude": -0.9027
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": BRAND.sameAs,
    "priceRange": "££"
  };

  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": `${CANONICAL_ORIGIN}${crumb.item}`
    }))
  } : null;

  const allSchemas = [
    websiteSchema,
    organizationSchema,
    localBusinessSchema,
    breadcrumbSchema,
    ...jsonLd
  ].filter(Boolean);

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robotsContent} />
      
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <link rel="canonical" href={canonical} />

      {hreflang.map((lang) => (
        <link key={lang.lang} rel="alternate" hrefLang={lang.lang} href={lang.href} />
      ))}

      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || "Tail Wagging Websites - Pet Care Web Design"} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={imageAlt || "Tail Wagging Websites - Pet Care Web Design"} />

      {price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content="GBP" />
        </>
      )}
      {availability && (
        <meta property="product:availability" content={availability} />
      )}

      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { Seo };
export default Seo;

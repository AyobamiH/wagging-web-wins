// src/pages/ServiceAreas.tsx
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import NorthamptonMap from "@/components/NorthamptonMap";
import { SERVICE_AREAS_SUMMARY } from "@/data/location";
import { BASE_URL } from "@/data/services";

export default function ServiceAreas() {
  const areas = SERVICE_AREAS_SUMMARY;

  // Build JSON-LD blocks with absolute URLs
  const canonicalUrl = `${BASE_URL}/service-areas`;
  const areaServedLd = areas.map((a) => ({
    "@type": "City",
    name: a.name,
    ...(a.county ? { addressRegion: a.county } : {}),
    addressCountry: "GB",
  }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: areas.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/locations/${a.slug}`,
      name: `${a.name} pet website design`,
    })),
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: "Pet Website Design Services",
    provider: {
      "@type": "Organization",
      name: "Tail Wagging Websites Factory Northampton",
      telephone: "+447402342694",
      url: BASE_URL,
    },
    serviceType: "Website Design",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Pet Care Businesses",
    },
    areaServed: areaServedLd,
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: "Pet Website Design Service Areas | Northamptonshire Coverage",
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    dateModified: new Date().toISOString(),
    description:
      "Professional pet website design services across Northamptonshire and nearby towns.",
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: canonicalUrl },
    ],
  };

  return (
    <>
      <Seo
        title="Pet Website Design Service Areas | Northamptonshire Coverage"
        description="Professional pet website design services across Northamptonshire. We serve Northampton, Kettering, Wellingborough, Daventry, Corby, Rushden, Towcester, Milton Keynes & Banbury for dog walkers, groomers, vets & pet businesses."
        path="/service-areas"
        keywords={[
          "pet website design northamptonshire",
          "dog walker website kettering",
          "pet groomer website wellingborough",
          "vet website design daventry",
          "pet business websites corby",
          "dog daycare website rushden",
          "pet sitter website towcester",
          "animal care website milton keynes",
          "veterinary website banbury",
          "local pet web design northamptonshire",
          "northampton pet website designer",
          "kettering dog walker web design",
          "wellingborough pet business websites",
          "daventry animal care web design",
          "pet web design service area",
          "northamptonshire pet website coverage",
          "local pet business web designer",
          "pet website design near me",
          "dog walking website northampton",
          "pet grooming website kettering",
          "veterinary practice website wellingborough",
          "pet training website daventry",
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Service Areas", item: "/service-areas" }]}
        jsonLd={[serviceLd, webPageLd, breadcrumbsLd, itemListLd]}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Pet Website Design Across Northamptonshire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional website design and SEO services for dog walkers, groomers, pet sitters, vets,
            and animal care businesses throughout our service areas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {areas.map((a) => (
            <Link
              key={a.slug}
              to={`/locations/${a.slug}`}
              aria-label={`View ${a.name} service area`}
              className="
                group block rounded-lg border border-border p-6 hover:shadow-md transition
                hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
              "
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {a.name}
                  </h2>
                  {a.description && (
                    <p className="text-muted-foreground text-sm">{a.description}</p>
                  )}
                </div>
              </div>

              {a.postcodes && a.postcodes.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Postcodes covered:</span>{" "}
                  {a.postcodes.join(", ")}
                </div>
              )}

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                View details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book your free consultation to discuss your pet business website needs. We’ll create a
            custom solution that helps you attract more clients in your local area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CalendlyEmbed buttonText="Book Free Consultation" buttonSize="lg" className="min-w-[200px]" />
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+447402342694" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call +44 7402 342694
              </a>
            </Button>
          </div>
        </div>
      </section>

      <NorthamptonMap />
    </>
  );
}

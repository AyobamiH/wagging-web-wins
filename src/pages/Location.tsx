import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Phone } from "lucide-react";

import { BASE_URL, SERVICES, SLUGS, type Slug } from "@/data/services";
import { getLocation, SERVICE_AREA } from "@/data/location";

export default function Location() {
  const { slug } = useParams<{ slug: string }>();
  const location = getLocation(slug);

  if (!location) {
    return <Navigate to="/service-areas" replace />;
  }

  const services = [...SLUGS].map((s) => ({
    title: SERVICES[s].title,
    href: `/services/${s}`,
  }));

  const path = `/locations/${location.slug}`;
  const title = `Pet-Care Web Design in ${location.name} | Tail Wagging Websites Factory`;
  const description = `Professional pet care website design and local SEO services in ${location.name}, ${location.county}. Helping dog walkers, groomers, and pet sitters get more bookings.`;

  // JSON-LD
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}#webpage`,
    name: `Pet-Care Web Design in ${location.name}`,
    description: `Professional pet care website design services in ${location.name}, ${location.county}`,
    url: `${BASE_URL}${path}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BASE_URL}/service-areas` },
        { "@type": "ListItem", position: 3, name: location.name, item: `${BASE_URL}${path}` },
      ],
    },
  };

  const placeNode: any = {
    "@type": "Place",
    name: location.name,
    containedInPlace: { "@type": "Place", name: location.county },
  };
  if (location.lat && location.lng) {
    placeNode.geo = { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng };
  }

  const serviceNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}${path}#service`,
    name: `Pet-Care Web Design Services in ${location.name}`,
    description: location.description,
    provider: { "@id": `${BASE_URL}/#localbusiness` },
    areaServed: placeNode,
    serviceType: "Web Design",
    category: "Pet Care Web Design",
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Service Areas", item: "/service-areas" },
          { name: location.name, item: path },
        ]}
        // keep your keywords if your app uses them internally; Google ignores meta keywords
        jsonLd={[webPage, serviceNode]}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>→</li>
            <li><Link to="/service-areas" className="hover:text-primary">Service Areas</Link></li>
            <li>→</li>
            <li className="text-foreground">{location.name}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Pet-care web design in {location.name}
              </h1>
              <p className="text-muted-foreground">{location.county}</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl">
            {location.description}
          </p>
        </header>

        {/* Contact Info */}
        <div className="mb-10 p-6 bg-muted/30 rounded-lg border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold mb-1">Contact Us</h2>
              <p className="text-sm text-muted-foreground">
                Northampton, Northamptonshire
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+447402342694" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +44 7402 342694
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Why choose us for your {location.name} pet care business?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {location.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card/50">
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <p className="text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services in this city */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Our services in {location.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="p-5 rounded-lg border bg-card/50 hover:bg-card transition-colors group"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to Service Areas */}
        <div className="mb-8 text-center">
          <Link to="/service-areas" className="inline-flex items-center gap-2 text-primary hover:underline">
            ← View all service areas
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-lg bg-muted/30 border">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to grow your {location.name} pet care business?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let's discuss how we can help you attract more local customers and streamline your operations.
          </p>
          <CTAButtons className="justify-center" />
        </div>

        {/* Nearby areas */}
        {location.nearby.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">We also serve nearby areas</h3>
            <div className="flex flex-wrap gap-2">
              {location.nearby.map((n) => (
                <span key={n} className="rounded-full border px-2.5 py-1 text-sm">
                  {n}
                </span>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}

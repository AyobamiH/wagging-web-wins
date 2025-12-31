// src/pages/ServiceAreas.tsx
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight, Check, Star } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import NorthamptonMap from "@/components/NorthamptonMap";
import { SERVICE_AREAS_SUMMARY } from "@/data/location";
import { BASE_URL } from "@/data/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import service images
import servicesHero from "@/assets/services-hero.jpg";
import serviceWebsiteDesign from "@/assets/service-website-design.jpg";
import serviceAutomations from "@/assets/service-automations.jpg";
import serviceLocalSeo from "@/assets/service-local-seo.jpg";
import serviceBranding from "@/assets/service-branding.jpg";

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
    name: "Service Areas – Pet-Care Website Design Across Northamptonshire",
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
        title="Service Areas – Pet-Care Website Design Across Northamptonshire | Tail Wagging Websites Factory"
        description="Tail Wagging Websites Factory builds websites, automations and SEO for pet-care businesses across Northamptonshire. Serving Northampton, Wellingborough, Kettering, Daventry, Rushden, Towcester, Corby, Milton Keynes & Banbury."
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
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Service Areas", item: "/service-areas" }]}
        jsonLd={[serviceLd, webPageLd, breadcrumbsLd, itemListLd]}
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Pet-Care Website Design Across Northamptonshire and Beyond
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From Northampton to Kettering, Wellingborough to Daventry – we help dog walkers, 
                groomers, sitters, vets and trainers thrive online in every town.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Book a Free Local Website Audit</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={servicesHero}
                alt="Dog walker with two dogs in a Northamptonshire village at sunset"
                className="rounded-2xl shadow-lg w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Map & Locations Directory */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Service Areas Across Northamptonshire
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're proud to serve pet-care businesses throughout Northamptonshire and surrounding areas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                to={`/locations/${a.slug}`}
                aria-label={`View ${a.name} service area`}
                className="
                  group block rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all
                  hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {a.name}
                    </h3>
                    {a.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">{a.description}</p>
                    )}
                  </div>
                </div>

                {a.postcodes && a.postcodes.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                    <span className="font-medium">Postcodes:</span>{" "}
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
        </div>
      </section>

      {/* 3. Why Local Matters */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Working With a Local Specialist Matters for Your Pet-Care Business
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Local market expertise:</strong>
                    <p className="text-muted-foreground">
                      We understand Northamptonshire's pet-care market – your site is optimised for local search terms.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">In-person consultations:</strong>
                    <p className="text-muted-foreground">
                      We can meet in your town to plan your site and understand your business needs.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">Proven local success:</strong>
                    <p className="text-muted-foreground">
                      We've built websites for dog walkers, groomers and sitters across your area, so we know what converts.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-muted/50 p-8 text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Based in Northampton, serving all of Northamptonshire with pride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Services for Your Area */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services for Your Area
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to attract more pet owners and grow your business locally.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Custom Websites */}
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={serviceWebsiteDesign}
                  alt="Laptop with pet-care website design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Custom Websites</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Your site built for pet owners near you. Mobile-first, fast, and conversion-optimised.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services/website-design">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Smart Automations */}
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={serviceAutomations}
                  alt="Workflow for pet-care automations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Smart Automations</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Booking confirmations, reminders and reviews – saving you hours every week.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services/automations">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Local SEO & Google Profile */}
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={serviceLocalSeo}
                  alt="Local SEO search for pet-care business"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Local SEO & Google Profile</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Rank for "dog walker [town]", get on maps and outrank competitors.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services/local-seo">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Brand & Copywriting */}
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={serviceBranding}
                  alt="Brand moodboard for pet-care business"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Brand & Copywriting</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Warm, pet-friendly messaging tailored to your business and town.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials from Local Clients */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Northamptonshire Pet-Care Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we've helped local businesses grow their online presence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah M.",
                business: "Groomer in Kettering",
                quote: "My site now appears top on Google! I've had a 40% increase in bookings since launching.",
                rating: 5
              },
              {
                name: "James T.",
                business: "Dog Walker in Northampton",
                quote: "The automation system saves me hours every week. Highly recommend!",
                rating: 5
              },
              {
                name: "Emma R.",
                business: "Pet Sitter in Wellingborough",
                quote: "Professional, local, and they really understand the pet-care business.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-card rounded-xl border border-border p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ - Service Area Specific */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Service Area FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our coverage and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-card rounded-xl border border-border">
            <AccordionItem value="villages">
              <AccordionTrigger className="px-6">
                Do you work with villages around Northamptonshire?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Yes! We serve all nearby villages and rural areas. Remote consultations are available, 
                and we can travel to meet you in person if needed. Our local expertise extends throughout 
                the entire county.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="targeting">
              <AccordionTrigger className="px-6">
                Can you target my specific town in Google results?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Absolutely. We use local SEO strategies, geo-tagging, Google Business Profile optimization, 
                and location-specific content to help you rank for searches in your town and surrounding areas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cost">
              <AccordionTrigger className="px-6">
                What does it cost?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                All packages apply equally to every town we serve. We have options for every budget, 
                from starter websites to full enterprise solutions. <Link to="/pricing" className="text-primary hover:underline">View our pricing page</Link> for details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="px-6">
                Do you offer ongoing support after launch?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Yes! We offer care plans that include updates, security monitoring, performance optimization, 
                and technical support. You're never left on your own after your site goes live.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 7. Final CTA - Local Discovery Call */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Pet-Care Business in Your Town?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free discovery call and let's discuss how we can help you attract more clients in Northamptonshire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CalendlyEmbed buttonText="Book Your Free Local Call" buttonSize="lg" />
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+447402342694" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call +44 7402 342694
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Map & Contact */}
      <NorthamptonMap />
    </>
  );
}

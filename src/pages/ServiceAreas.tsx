import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import NorthamptonMap from "@/components/NorthamptonMap";

export default function ServiceAreas() {
  const serviceAreas = [
    {
      area: "Northampton",
      description: "Our main base of operations, serving the town center and surrounding villages.",
      postcodes: ["NN1", "NN2", "NN3", "NN4", "NN5"]
    },
    {
      area: "Wellingborough", 
      description: "Comprehensive pet website services for businesses in Wellingborough and nearby areas.",
      postcodes: ["NN8", "NN9", "NN29"]
    },
    {
      area: "Kettering",
      description: "Professional web design for pet care businesses across Kettering and surrounding villages.",
      postcodes: ["NN14", "NN15", "NN16"]
    },
    {
      area: "Daventry",
      description: "Expert website design and SEO services for pet businesses in Daventry area.", 
      postcodes: ["NN11"]
    },
    {
      area: "Towcester",
      description: "Local web design expertise for pet care providers in Towcester and surrounding area.",
      postcodes: ["NN12"]
    },
    {
      area: "Rushden",
      description: "Specialized pet business websites for Rushden and the local community.",
      postcodes: ["NN10"]
    },
    {
      area: "Corby",
      description: "Professional web design services for pet care businesses throughout Corby.",
      postcodes: ["NN17", "NN18"]
    },
    {
      area: "Milton Keynes",
      description: "Extended service area covering Milton Keynes for larger pet care operations.",
      postcodes: ["MK1-MK19"]
    },
    {
      area: "Banbury",
      description: "Cross-county service extension to Banbury for established pet care businesses.",
      postcodes: ["OX15", "OX16", "OX17"]
    }
  ];

  return (
    <>
      <Seo
        title="Pet Website Design Service Areas | Northamptonshire Coverage"
        description="Professional pet website design services across Northamptonshire. We serve Northampton, Kettering, Wellingborough, Daventry, Corby, Rushden, Towcester, Milton Keynes & Banbury for dog walkers, groomers, vets & pet businesses."
        path="/service-areas"
        keywords={[
          // Primary location + service combinations
          "pet website design northamptonshire",
          "dog walker website kettering",
          "pet groomer website wellingborough", 
          "vet website design daventry",
          "pet business websites corby",
          "dog daycare website rushden",
          "pet sitter website towcester",
          "animal care website milton keynes",
          "veterinary website banbury",
          // Local SEO terms
          "local pet web design northamptonshire",
          "northampton pet website designer",
          "kettering dog walker web design",
          "wellingborough pet business websites",
          "daventry animal care web design",
          // Service area coverage
          "pet web design service area",
          "northamptonshire pet website coverage",
          "local pet business web designer",
          "pet website design near me",
          // Business types + locations
          "dog walking website northampton",
          "pet grooming website kettering", 
          "veterinary practice website wellingborough",
          "pet training website daventry"
        ]}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Service Areas", item: "/service-areas" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://tailwagginwebdesign.com/service-areas#service",
            "name": "Pet Website Design Services",
            "provider": {
              "@type": "Organization",
              "name": "Tail Wagging Websites Factory Northampton",
              "telephone": "+447402342694",
              "url": "https://tailwagginwebdesign.com/"
            },
            "areaServed": serviceAreas.map(area => ({
              "@type": "City",
              "name": area.area,
              "addressRegion": "Northamptonshire",
              "addressCountry": "GB"
            })),
            "serviceType": "Website Design",
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "Pet Care Businesses"
            }
          },
          {
            "@context": "https://schema.org", 
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
              { "@type": "ListItem", "position": 2, "name": "Service Areas", "item": "https://tailwagginwebdesign.com/service-areas" }
            ]
          }
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Pet Website Design Across Northamptonshire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional website design and SEO services for dog walkers, groomers, pet sitters, vets, and animal care businesses throughout our service areas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {serviceAreas.map((location) => (
            <div key={location.area} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{location.area}</h2>
                  <p className="text-muted-foreground text-sm mb-3">{location.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Postcodes covered:</span> {location.postcodes.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book your free consultation to discuss your pet business website needs. We'll create a custom solution that helps you attract more clients in your local area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CalendlyEmbed
              buttonText="Book Free Consultation"
              buttonSize="lg"
              className="min-w-[200px]"
            />
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
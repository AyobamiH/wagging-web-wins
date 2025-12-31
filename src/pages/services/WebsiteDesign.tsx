import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WebsiteDesign() {
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Design & Rebuilds",
    description: "Clean, fast websites for pet care that convert browsers into bookings.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
        title="Pet Care Website Design | Mobile-First Sites That Convert | Northampton"
        description="Professional website design for dog walkers, groomers, pet sitters & trainers. Mobile-first, conversion-optimized sites that turn visitors into clients."
        path="/services/website-design"
        keywords={[
          "pet care website design",
          "dog walker website design",
          "pet grooming website",
          "pet sitter website design",
          "mobile-first pet websites",
          "conversion optimized pet sites",
          "Northampton pet website design",
          "responsive pet care websites"
        ]}
        price="From £497"
        availability="InStock"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Website Design", item: "/services/website-design" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://tailwaggingwebdesign.com/services/website-design",
            name: "Pet Care Website Design",
            description: "Professional website design for dog walkers, groomers, pet sitters & trainers",
            provider: {
              "@type": "Organization",
              name: "Tail Wagging Websites Factory Northampton"
            },
            offers: {
              "@type": "Offer",
              name: "Website Design Package",
              price: "497",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
              validFrom: "2023-01-01"
            },
            areaServed: [
              { "@type": "City", name: "Northampton" },
              { "@type": "City", name: "Kettering" },
              { "@type": "City", name: "Wellingborough" }
            ],
            audience: {
              "@type": "BusinessAudience",
              businessType: "Pet Care Business"
            }
          }
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Clean, fast websites that turn browsers into bookings.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">What you get</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Mobile-first, accessible design with clear service pages and pricing ranges</li>
              <li>Copywriting that explains benefits in plain English</li>
              <li>Booking/contact flows connected to your email/Sheets/CRM</li>
              <li>Google Analytics + Search Console setup</li>
            </ul>
          </article>
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Outcomes</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Higher trust and conversion</li>
              <li>Fewer abandoned enquiries</li>
            </ul>
            <div className="mt-4">
              <h3 className="font-medium">FAQ</h3>
              <p className="text-sm mt-2"><strong>Timeline:</strong> Typical build 2–4 weeks depending on scope.</p>
              <p className="text-sm mt-1"><strong>Content:</strong> We can write it with short interviews and your notes.</p>
            </div>
          </article>
        </div>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

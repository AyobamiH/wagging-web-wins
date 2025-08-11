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
        title="Website Design for Pet Care | Tail Wagging Websites"
        description="Mobile-first, accessible design with clear services, pricing ranges and simple booking flows."
        path="/services/website-design"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Website Design & Rebuilds", item: "/services/website-design" },
        ]}
        jsonLd={serviceJsonLd}
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

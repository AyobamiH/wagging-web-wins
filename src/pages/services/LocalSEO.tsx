import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

export default function LocalSEO() {
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Local SEO & Content",
    description: "Local SEO for pet care: GBP optimisation, on-page SEO, and helpful location pages.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
        title="Local SEO for Pet Care | Tail Wagging Websites"
        description="Be found by nearby pet parents. GBP optimisation, on-page SEO, schema, and simple content plans."
        path="/services/local-seo"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Local SEO & Content", item: "/services/local-seo" },
        ]}
        jsonLd={serviceJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Be found by nearby pet parents.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Includes</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Google Business Profile optimisation (categories, services, photos, posts)</li>
              <li>On-page SEO: titles, meta descriptions, internal linking, schema</li>
              <li>Location/service pages with natural, non-spammy copy</li>
              <li>Light content plan: 4–8 blog topics that answer real owner questions</li>
            </ul>
          </article>
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Outcomes</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Improved rankings for “[service] near me”</li>
              <li>More qualified enquiries</li>
            </ul>
          </article>
        </div>
        <div className="mt-6">
          <Link to="/contact" className="underline">Book a Free Consult</Link>
        </div>
      </section>
    </>
  );
}

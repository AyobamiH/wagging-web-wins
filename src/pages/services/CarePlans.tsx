import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CarePlans() {
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Care Plans",
    description: "Keep your site fast, secure, backed up and updated with monthly care.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
        title="Website Care Plans | Tail Wagging Websites"
        description="Updates, backups, monitoring, small edits, and quarterly performance checks."
        path="/services/care-plans"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Website Care Plans", item: "/services/care-plans" },
        ]}
        jsonLd={serviceJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">We keep your site fast, secure, and up to date.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Plans include</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Updates, backups, uptime/security monitoring</li>
              <li>Small content edits each month</li>
              <li>Quarterly performance/SEO check and quick wins</li>
            </ul>
          </article>
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Outcomes</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Peace of mind and steady performance</li>
            </ul>
          </article>
        </div>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Choose a Care Plan</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

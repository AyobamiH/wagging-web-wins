import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Automations() {
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automations & CRM",
    description: "Automate forms to Sheets/CRM, confirmations, reminders, and review requests.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
        title="Automations & CRM for Pet Care | Tail Wagging Websites"
        description="Automate the busywork behind every booking: forms → CRM, auto-emails/WhatsApp, and review nudges."
        path="/services/automations"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Automations & CRM", item: "/services/automations" },
        ]}
        jsonLd={serviceJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Automate the busywork behind every booking.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Examples we set up</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Contact/booking forms → Google Sheets/CRM</li>
              <li>Auto-emails/WhatsApp confirmations and reminders</li>
              <li>Review request nudges after completed services</li>
              <li>Intake questionnaires and digital T&Cs</li>
            </ul>
          </article>
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Benefits</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Less chasing. Fewer no-shows. Faster follow-ups.</li>
            </ul>
          </article>
        </div>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Talk About Automations</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

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
  title="Automations & CRM for Pet Businesses | Bookings, Reminders & Workflows"
  description="Connect forms, calendars and CRMs to automate bookings, confirmations, reminders and follow-ups. Save admin time and reduce no-shows."
  path="/services/automations"
  keywords={[
    "pet business automations northampton",
    "crm for dog walkers and groomers",
    "booking reminders automation pet care",
    "pet website forms to crm",
    "n8n zapier pet business",
    "automated pet care workflows",
    "client updates automation pet sitting",
    "whatsapp email sms reminders pet business",
    "reduce no shows pet care",
    "automations for vets and groomers"
  ]}
  breadcrumbs={[
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Automations & CRM", item: "/services/automations" }
  ]}
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://tailwagginwebdesign.com/services/automations#service",
      "name": "Automations & CRM for Pet Businesses",
      "description": "Automate forms to Sheets/CRM, confirmations, reminders, and review requests.",
      "serviceType": "Workflow Automation",
      "url": "https://tailwagginwebdesign.com/services/automations",
      "areaServed": ["Northampton","Wellingborough","Kettering","Daventry","Towcester","Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"],
      "provider": { "@type": "Organization", "@id": "https://tailwagginwebdesign.com/#org" },
      "serviceOutput": "Automated bookings, confirmations, reminders and client updates via email/SMS.",
      "offers": { "@type": "Offer", "url": "https://tailwagginwebdesign.com/contact", "priceCurrency": "GBP", "eligibleRegion": "GB" },
      "potentialAction": {
        "@type": "ScheduleAction",
        "target": "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call",
        "name": "Book a consultation"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tailwagginwebdesign.com/services/automations#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Which tools can you integrate?", "acceptedAnswer": { "@type": "Answer", "text": "Calendly, Google Calendar, Sheets, WhatsApp/email, popular CRMs and payment links." } },
        { "@type": "Question", "name": "Can I send automated reminders and updates?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—confirmations, reminders, route updates and feedback requests can run hands-free." } },
        { "@type": "Question", "name": "Is there a dashboard?", "acceptedAnswer": { "@type": "Answer", "text": "We can provide a simple dashboard for leads and bookings, plus weekly email summaries." } }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://tailwagginwebdesign.com/services/automations#webpage",
      "url": "https://tailwagginwebdesign.com/services/automations",
      "name": "Automations & CRM for Pet Businesses",
      "inLanguage": "en-GB",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tailwagginwebdesign.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Automations & CRM", "item": "https://tailwagginwebdesign.com/services/automations" }
        ]
      }
    }
  ]}
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

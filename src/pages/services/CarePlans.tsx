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
  title="Website Care Plans for Pet Businesses | Security, Updates & Support"
  description="Keep your pet website fast, secure and up-to-date. Monthly updates, backups, monitoring, and small content edits included."
  path="/services/care-plans"
  keywords={[
    "pet website maintenance northampton",
    "website care plans pet business",
    "wordpress maintenance pet care",
    "security updates backups monitoring",
    "core web vitals maintenance",
    "monthly website support pet business",
    "pet website content updates",
    "uptime monitoring pet websites",
    "website support northamptonshire"
  ]}
  breadcrumbs={[
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Website Care Plans", item: "/services/care-plans" }
  ]}
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://tailwagginwebdesign.com/services/care-plans#service",
      "name": "Website Care Plans for Pet Businesses",
      "serviceType": "Website Maintenance",
      "url": "https://tailwagginwebdesign.com/services/care-plans",
      "areaServed": ["Northampton","Wellingborough","Kettering","Daventry","Towcester","Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"],
      "provider": { "@type": "Organization", "@id": "https://tailwagginwebdesign.com/#org" },
      "offers": { "@type": "Offer", "url": "https://tailwagginwebdesign.com/contact", "priceCurrency": "GBP", "eligibleRegion": "GB" },
      "serviceOutput": "Faster load times, reliable uptime and proactive security for pet-care websites."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tailwagginwebdesign.com/services/care-plans#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What’s included each month?", "acceptedAnswer": { "@type": "Answer", "text": "Updates, backups, monitoring, malware scanning, performance checks and small content edits." } },
        { "@type": "Question", "name": "Do you support non-WordPress sites?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—static sites and common CMS setups are supported. We’ll confirm during onboarding." } },
        { "@type": "Question", "name": "Can I upgrade or cancel anytime?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—plans are flexible. You can change tiers or cancel with notice per your agreement." } }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://tailwagginwebdesign.com/services/care-plans#webpage",
      "url": "https://tailwagginwebdesign.com/services/care-plans",
      "name": "Website Care Plans for Pet Businesses",
      "inLanguage": "en-GB",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tailwagginwebdesign.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Website Care Plans", "item": "https://tailwagginwebdesign.com/services/care-plans" }
        ]
      }
    }
  ]}
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

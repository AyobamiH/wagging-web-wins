import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function SpeedUXAudits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Speed & UX Audits",
    description: "Plain-English report with quick wins for images, scripts, and layout shift.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
  title="Speed & UX Audits for Pet Websites | Fix What Slows Bookings"
  description="Plain-English audits with priorities and quick wins. Improve Core Web Vitals, UX friction and conversion paths for pet-care sites."
  path="/services/speed-ux-audits"
  keywords={[
    "website speed audit pet business",
    "core web vitals audit northampton",
    "lighthouse audit pet websites",
    "ux audit dog groomer website",
    "conversion rate optimisation pet care",
    "page speed improvements northampton",
    "cls lcp tbt fixes pet websites",
    "mobile usability pet business site"
  ]}
  breadcrumbs={[
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Speed & UX Audits", item: "/services/speed-ux-audits" }
  ]}
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://tailwagginwebdesign.com/services/speed-ux-audits#service",
      "name": "Speed & UX Audits for Pet Websites",
      "serviceType": "Website Audit",
      "url": "https://tailwagginwebdesign.com/services/speed-ux-audits",
      "areaServed": ["Northampton","Wellingborough","Kettering","Daventry","Towcester","Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"],
      "provider": { "@type": "Organization", "@id": "https://tailwagginwebdesign.com/#org" },
      "serviceOutput": "Prioritised action list to improve speed, UX and conversions.",
      "offers": { "@type": "Offer", "url": "https://tailwagginwebdesign.com/contact", "priceCurrency": "GBP", "eligibleRegion": "GB" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tailwagginwebdesign.com/services/speed-ux-audits#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What will I get in the audit?", "acceptedAnswer": { "@type": "Answer", "text": "A clear report with metrics, plain-English findings and a prioritised fix list with effort/impact." } },
        { "@type": "Question", "name": "Do you help implement the fixes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—implementation support is available as a follow-on engagement or care plan." } },
        { "@type": "Question", "name": "Will this improve my rankings?", "acceptedAnswer": { "@type": "Answer", "text": "Fixing speed and UX improves user experience and can support better SEO and conversion rates." } }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://tailwagginwebdesign.com/services/speed-ux-audits#webpage",
      "url": "https://tailwagginwebdesign.com/services/speed-ux-audits",
      "name": "Speed & UX Audits for Pet Websites",
      "inLanguage": "en-GB",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tailwagginwebdesign.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Speed & UX Audits", "item": "https://tailwagginwebdesign.com/services/speed-ux-audits" }
        ]
      }
    }
  ]}
/>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Fix what slows visitors (and Google) down.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Deliverables</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Plain-English report: wins, impact, effort</li>
              <li>Quick fixes for images, scripts, and layout shift</li>
              <li>Optional implementation within a week</li>
            </ul>
          </article>
        </div>
        <div className="mt-6 flex gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Try Our UX Audit Tool</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Website UX Audit Tool</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="https://tools.tailwaggingwebdesign.com"
                  className="w-full h-full border-0 rounded-lg"
                  title="UX Audit Tool"
                  loading="lazy"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Link to="/contact">
            <Button variant="secondary" size="lg">Request Professional Audit</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

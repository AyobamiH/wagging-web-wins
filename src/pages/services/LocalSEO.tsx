import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LocalSEO() {
 

  return (
    <>
      <Seo
  title="Local SEO & Content for Pet Businesses | Northampton & Northamptonshire"
  description="Rank for ‘near me’ searches. GBP optimisation, service pages, location content and reviews strategy for dog walkers, groomers, sitters & vets."
  path="/services/local-seo"
  keywords={[
    "local seo pet business northampton",
    "pet seo agency northamptonshire",
    "google business profile for pet businesses",
    "pet website content writing",
    "near me rankings pet care",
    "dog walker seo northampton",
    "dog groomer seo northampton",
    "veterinary practice seo northampton",
    "local citations pet business",
    "service area pages northamptonshire",
    "reviews strategy pet care",
    "map pack rankings pet business"
  ]}
  breadcrumbs={[
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Local SEO & Content", item: "/services/local-seo" }
  ]}
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://tailwagginwebdesign.com/services/local-seo#service",
      "name": "Local SEO & Content for Pet Businesses",
      "serviceType": "SEO Service",
      "url": "https://tailwagginwebdesign.com/services/local-seo",
      "areaServed": ["Northampton","Wellingborough","Kettering","Daventry","Towcester","Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"],
      "provider": { "@type": "Organization", "@id": "https://tailwagginwebdesign.com/#org" },
      "offers": { "@type": "Offer", "url": "https://tailwagginwebdesign.com/contact", "priceCurrency": "GBP", "eligibleRegion": "GB" },
      "serviceOutput": "Improved local visibility, higher map pack rankings and qualified web enquiries."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tailwagginwebdesign.com/services/local-seo#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Do you optimise Google Business Profile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—categories, services, posts, Q&A, images and tracking to drive enquiries." } },
        { "@type": "Question", "name": "Will you write service and location pages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes—we create helpful, trustworthy content that targets local intent without keyword stuffing." } },
        { "@type": "Question", "name": "How soon can I see results?", "acceptedAnswer": { "@type": "Answer", "text": "You can see early movement in weeks; competitive towns can take longer. We share clear progress updates." } }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://tailwagginwebdesign.com/services/local-seo#webpage",
      "url": "https://tailwagginwebdesign.com/services/local-seo",
      "name": "Local SEO & Content for Pet Businesses",
      "inLanguage": "en-GB",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tailwagginwebdesign.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Local SEO & Content", "item": "https://tailwagginwebdesign.com/services/local-seo" }
        ]
      }
    }
  ]}
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
          <Link to="/contact">
            <Button size="lg">Book a Free Consult</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

// import { Link } from "react-router-dom";
// import Seo from "@/components/Seo";

// export default function Services() {
//   const cards = [
//     { href: "/services/website-design", title: "Website Design & Rebuilds", desc: "Clean, mobile-first sites that convert browsers to bookings." },
//     { href: "/services/local-seo", title: "Local SEO & Content", desc: "Be found for ‘near me’ searches with honest, useful content." },
//     { href: "/services/automations", title: "Automations & CRM", desc: "Cut admin with forms → Sheets/CRM and smart follow-ups." },
//     { href: "/services/care-plans", title: "Website Care Plans", desc: "Keep your site fast, secure and updated monthly." },
//     { href: "/services/speed-ux-audits", title: "Speed & UX Audits", desc: "Fix what slows visitors and Google down." },
//   ];

//   return (
//     <>
//       <Seo
//         title="Services for Pet Care | Tail Wagging Websites Factory"
//         description="Services built for how pet parents shop: design, local SEO, automations, care plans and audits."
//         path="/services"
//         keywords={[
//           "pet care web services",
//           "dog walker website design",
//           "pet business local SEO",
//           "pet grooming website",
//           "website automation for pet businesses",
//           "pet care website maintenance",
//           "UX audit for pet websites"
//         ]}
//         breadcrumbs={[{ name: "Home", item: "/" }, { name: "Services", item: "/services" }]}
//         jsonLd={[
//           {
//             "@context": "https://schema.org",
//             "@type": "ServiceCatalog",
//             name: "Pet Care Web Services",
//             description: "Complete web design and digital marketing services for pet care businesses",
//             provider: {
//               "@type": "Organization",
//               name: "Tail Wagging Websites Factory Northampton"
//             },
//             hasOfferCatalog: {
//               "@type": "OfferCatalog",
//               name: "Pet Care Digital Services",
//               itemListElement: cards.map((card, index) => ({
//                 "@type": "Offer",
//                 "@id": `https://tailwaggingwebdesign.com${card.href}`,
//                 name: card.title,
//                 description: card.desc,
//                 url: `https://tailwaggingwebdesign.com${card.href}`,
//                 category: "Web Design Service"
//               }))
//             }
//           }
//         ]}
//       />
//       <section className="mx-auto max-w-6xl px-4 py-10">
//         <h1 className="text-3xl font-bold tracking-tight">Digital services that grow your pet care business.</h1>
//         <p className="mt-3 text-muted-foreground max-w-2xl">
//           From stunning websites to local SEO and smart automations — everything you need to attract more customers, look professional, and save time on admin work.
//         </p>
//         <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {cards.map((c) => (
//             <Link key={c.href} to={c.href} className="rounded-lg border p-5 hover:shadow-md transition-shadow">
//               <h2 className="font-semibold">{c.title}</h2>
//               <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";

export default function Services() {
  // --- Service cards (UI + used in JSON-LD) ---
  const cards = [
    { href: "/services/website-design", title: "Website Design & Rebuilds", desc: "Clean, mobile-first sites that convert visitors into bookings." },
    { href: "/services/local-seo", title: "Local SEO & Content", desc: "Be found in ‘near me’ searches with trustworthy, useful content." },
    { href: "/services/automations", title: "Automations & CRM", desc: "Cut admin with forms → Sheets/CRM, reminders, and smart follow-ups." },
    { href: "/services/care-plans", title: "Website Care Plans", desc: "Keep your site fast, secure, and updated monthly." },
    { href: "/services/speed-ux-audits", title: "Speed & UX Audits", desc: "Fix the issues slowing down visitors and Google." },
  ];

  const serviceArea = [
    "Northampton", "Wellingborough", "Kettering", "Daventry", "Towcester",
    "Rushden", "Corby", "Milton Keynes", "Banbury", "Northamptonshire"
  ];

  // --- SEO: title, description, keywords, JSON-LD ---
  const keywords = [
    // Primary + locale
    "pet care web design services northampton",
    "pet website design northamptonshire",
    "pet business web design northampton",
    "pet web design agency northampton",
    "contact pet web designer northampton",

    // Niche service intents
    "dog walker website design",
    "dog groomer website designer northampton",
    "pet sitter website designer",
    "veterinary website design northampton",
    "pet daycare website design",
    "animal care website design",

    // Outcome / benefit
    "local seo for pet businesses northampton",
    "pet business lead generation websites",
    "fast mobile websites for pet care",
    "website automations for pet businesses",
    "pet care website maintenance plans",

    // Service-area discovery
    "pet web design northamptonshire",
    "pet website designer near me northampton",
    "northampton pet web design services",
    "northamptonshire pet website agency",
  ];

  const orgId = "https://tailwagginwebdesign.com/#org";
  const baseUrl = "https://tailwagginwebdesign.com";

  const jsonLd = [
    // Organization reference (safe, reusable)
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: "Tail Wagging Websites Factory Northampton",
      url: baseUrl + "/",
      logo: baseUrl + "/og.png",
      telephone: "+447402342694",
      areaServed: serviceArea,
      contactPoint: [{
        "@type": "ContactPoint",
        telephone: "+447402342694",
        contactType: "sales",
        availableLanguage: ["English"]
      }]
    },
    // Services catalog listing (main entity for this page)
    {
      "@context": "https://schema.org",
      "@type": "ServiceCatalog",
      "@id": baseUrl + "/services#catalog",
      name: "Pet-Care Web Design Services",
      description: "Web design, local SEO, automations, care plans and audits for pet-care businesses in Northamptonshire.",
      url: baseUrl + "/services",
      provider: { "@id": orgId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pet-Care Digital Services",
        itemListElement: cards.map((card, index) => ({
          "@type": "Offer",
          position: index + 1,
          "@id": baseUrl + card.href + "#offer",
          name: card.title,
          description: card.desc,
          category: "Web Design Service",
          url: baseUrl + card.href,
          itemOffered: {
            "@type": "Service",
            "@id": baseUrl + card.href + "#service",
            name: card.title,
            serviceType: card.title,
            areaServed: serviceArea,
            provider: { "@id": orgId }
          }
        }))
      }
    },
    // ItemList (helps bots understand list of service links)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": baseUrl + "/services#list",
      itemListElement: cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: baseUrl + card.href,
        name: card.title
      }))
    },
    // WebPage + Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": baseUrl + "/services#webpage",
      url: baseUrl + "/services",
      name: "Pet-Care Web Design Services in Northampton",
      about: { "@id": orgId },
      isPartOf: { "@id": baseUrl + "/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl + "/" },
          { "@type": "ListItem", position: 2, name: "Services", item: baseUrl + "/services" }
        ]
      }
    },
    // FAQ (ensure matching visible content below)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": baseUrl + "/services#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which pet-care businesses do you build websites for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dog walkers, dog groomers, pet sitters, pet daycares and veterinary practices across Northamptonshire."
          }
        },
        {
          "@type": "Question",
          name: "Do you offer local SEO for ‘near me’ searches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We optimise Google Business Profile, service pages and location content to rank for ‘near me’ and town-specific queries."
          }
        },
        {
          "@type": "Question",
          name: "Can you automate bookings and client follow-ups?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We integrate forms, calendars and CRMs to send confirmations, reminders and updates automatically."
          }
        }
      ]
    },
    // Optional: WebSite node (if not already globally output elsewhere)
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": baseUrl + "/#website",
      url: baseUrl + "/",
      name: "Tail Wagging Websites Factory Northampton",
      publisher: { "@id": orgId },
      inLanguage: "en-GB",
      potentialAction: {
        "@type": "SearchAction",
        target: baseUrl + "/search?q={query}",
        "query-input": "required name=query"
      }
    }
  ];

  return (
    <>
      <Seo
        title="Pet-Care Web Design Services in Northampton | Tail Wagging Websites Factory"
        description="Web design, local SEO, automations, care plans & audits for dog walkers, groomers, sitters and vets in Northamptonshire. Book a free consultation."
        path="/services"
        keywords={keywords}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Services", item: "/services" }]}
        jsonLd={jsonLd}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Pet-Care Web Design Services in Northampton
          </h1>
          <p className="mt-3 text-muted-foreground">
            Websites, <strong>local SEO</strong> and <strong>automations</strong> built for how pet parents shop.
            We help dog walkers, groomers, pet sitters and vets across <strong>Northamptonshire</strong> get found,
            look professional and turn clicks into bookings.
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.href}
              className="rounded-lg border border-surface bg-glass p-5 hover:bg-glass-hover transition-all duration-200"
            >
              <h2 className="font-semibold text-foreground">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4">
                <Button asChild  size="sm" className="rounded-lg border p-5 hover:shadow-md transition-shadow">
                  <Link to={c.href} aria-label={`Learn more about ${c.title}`}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Service area for local SEO */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Areas We Serve</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {serviceArea.join(", ")}.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-8">
          <CTAButtons className="justify-center sm:justify-start" />
          <div className="mt-4 text-center sm:text-left">
            <Button variant="default" size="sm" asChild>
              <a href="tel:+447402342694">Call +44 7402 342694</a>
            </Button>
          </div>
        </div>

        {/* Visible FAQ that mirrors JSON-LD */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold">FAQs</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">
                Which pet-care businesses do you build websites for?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Dog walkers, dog groomers, pet sitters, pet daycares and veterinary practices across Northamptonshire.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">
                Do you offer local SEO for ‘near me’ searches?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. We optimise your Google Business Profile, service pages and location content to rank for town and ‘near me’ searches.
              </p>
            </details>
            <details className="rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">
                Can you automate bookings and client follow-ups?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Absolutely. We connect forms, calendars and CRMs to send confirmations, reminders and updates automatically.
              </p>
            </details>
          </div>
        </div>

        <section className="bg-muted/40 border-y">
          <div className="mx-auto max-w-6xl px-4 py-8">
            
          </div>
        </section>
      </section>
    </>
  );
}
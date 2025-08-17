import Seo from "@/components/Seo";
import { CTAButtons, SecondaryCTAs } from "@/components/CTAButtons";
import { CheckCircle2 } from "lucide-react";

export default function Index() {
  return (
    <>
      <Seo
        title="Pet Website Design & Automations in Northampton | Tail Wagging Websites Factory"
        description="Fast, mobile-first pet websites and automations for dog walkers, groomers, sitters, trainers & vets across Northamptonshire. Local SEO & Google Business Profile included. Book a free consult."
        path="/"
        keywords={[
          // Primary + locale
          "pet website designer northampton",
          "pet web design northamptonshire",
          "northampton web design for pet businesses",
          "pet website designer near me northampton",
          // Core niches
          "dog groomer website design northampton",
          "dog walker websites northampton",
          "pet sitter website designer northampton",
          "veterinary website design northampton",
          "pet trainer website design",
          // Outcomes / tech
          "mobile-first pet websites",
          "core web vitals pet websites",
          "local seo for pet businesses northampton",
          "google business profile setup pet business",
          "pet business automations crm northampton",
          "booking reminders automation pet care",
          "pet website maintenance northampton",
          // Broader capture
          "pet business websites uk",
          "pet web design agency northampton",
          "northampton web design"
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://tailwagginwebdesign.com/#org",
                "name": "Tail Wagging Websites Factory Northampton",
                "url": "https://tailwagginwebdesign.com/",
                "logo": "https://tailwagginwebdesign.com/og.png",
                "telephone": "+447402342694",
                "sameAs": [
                  "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
                ],
                "areaServed": [
                  "Northampton","Wellingborough","Kettering","Daventry","Towcester",
                  "Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"
                ],
                "contactPoint": [{
                  "@type": "ContactPoint",
                  "telephone": "+447402342694",
                  "contactType": "sales",
                  "availableLanguage": ["English"]
                }]
              },
              {
                "@type": "WebSite",
                "@id": "https://tailwagginwebdesign.com/#website",
                "url": "https://tailwagginwebdesign.com/",
                "name": "Tail Wagging Websites Factory Northampton",
                "publisher": { "@id": "https://tailwagginwebdesign.com/#org" },
                "inLanguage": "en-GB"
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://tailwagginwebdesign.com/#local",
                "name": "Pet Web Design & Automations – Tail Wagging Websites Factory Northampton",
                "url": "https://tailwagginwebdesign.com/",
                "image": "https://tailwagginwebdesign.com/og.png",
                "telephone": "+447402342694",
                "priceRange": "££",
                "areaServed": [
                  "Northampton","Wellingborough","Kettering","Daventry","Towcester",
                  "Rushden","Corby","Milton Keynes","Banbury","Northamptonshire"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "GB",
                  "addressRegion": "Northamptonshire",
                  "addressLocality": "Northampton"
                },
                "knowsAbout": [
                  "pet website design","local seo for pet businesses","google business profile",
                  "core web vitals","website automations","crm integrations"
                ],
                "review": [
                  {
                    "@type": "Review",
                    "reviewBody": "Our new website tripled online bookings in just 6 weeks. The automated reminders alone save me 2 hours every day.",
                    "author": { "@type": "Person", "name": "Sarah M." }
                  },
                  {
                    "@type": "Review",
                    "reviewBody": "Finally, a website that actually explains our pricing clearly. We're getting better quality leads and fewer price shoppers.",
                    "author": { "@type": "Person", "name": "Mike T." }
                  }
                ],
                "potentialAction": [
                  {
                    "@type": "ContactAction",
                    "target": "https://tailwagginwebdesign.com/contact",
                    "name": "Request a quote"
                  },
                  {
                    "@type": "ScheduleAction",
                    "target": "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call",
                    "name": "Book a consultation"
                  }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Pet-Care Digital Services",
                  "itemListElement": [
                    { "@type": "Offer", "name": "Website Design & Rebuilds", "url": "https://tailwagginwebdesign.com/services/website-design" },
                    { "@type": "Offer", "name": "Local SEO & Content", "url": "https://tailwagginwebdesign.com/services/local-seo" },
                    { "@type": "Offer", "name": "Automations & CRM", "url": "https://tailwagginwebdesign.com/services/automations" },
                    { "@type": "Offer", "name": "Website Care Plans", "url": "https://tailwagginwebdesign.com/services/care-plans" },
                    { "@type": "Offer", "name": "Speed & UX Audits", "url": "https://tailwagginwebdesign.com/services/speed-ux-audits" }
                  ]
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://tailwagginwebdesign.com/#webpage",
                "url": "https://tailwagginwebdesign.com/",
                "name": "Pet Website Design & Automations in Northampton",
                "description": "Fast, mobile-first pet websites and automations for dog walkers, groomers, sitters, trainers & vets across Northamptonshire.",
                "isPartOf": { "@id": "https://tailwagginwebdesign.com/#website" },
                "inLanguage": "en-GB",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" }
                  ]
                }
              },
              {
                "@type": "HowTo",
                "@id": "https://tailwagginwebdesign.com/#how-it-works",
                "name": "How it works",
                "description": "Three simple steps from discovery to launch.",
                "step": [
                  { "@type": "HowToStep", "name": "Discover", "text": "A short call to map goals, audience, and must-have features." },
                  { "@type": "HowToStep", "name": "Build", "text": "Mobile-first design, copywriting, and technical setup." },
                  { "@type": "HowToStep", "name": "Launch & grow", "text": "SEO basics, analytics, and optional care plan with updates." }
                ]
              }
            ]
          }
        ]}
      />

      <section className="hero">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <p className="text-xs font-medium text-muted-foreground">Tail Wagging Websites Factory Northampton</p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Websites that turn pet parents into paying clients — automatically.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            We build mobile-first websites and smart automations for dog walkers, groomers, pet sitters and trainers in Northampton — so you get more bookings while doing less admin work.
          </p>
          <CTAButtons className="mt-6" />
        </div>
      </section>

      <section aria-labelledby="trust" className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            "Specialists in pet care businesses — we know your customers' journey.",
            "Mobile-first design — 80% of pet bookings happen on phones.",
            "Local SEO & Google Business Profile setup included as standard.",
            "Smart automations: booking confirmations, review requests, lead nurturing.",
          ].map((text) => (
            <div key={text} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="value" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="value" className="text-2xl font-semibold tracking-tight">Why it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "More bookings, fewer tire-kickers",
              body:
                "Clear service descriptions, upfront pricing, and simple booking flows that qualify leads before they contact you.",
            },
            {
              title: "Lightning-fast pages that rank",
              body:
                "Optimised for Google's Core Web Vitals and mobile-first indexing. Fast sites rank higher and convert better.",
            },
            {
              title: "Automations that save hours weekly",
              body:
                "Smart workflows for booking confirmations, payment reminders, review requests, and follow-up sequences.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-lg border p-5 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how" className="bg-muted/40 border-y">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 id="how" className="text-2xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Discover",
                b: "A short call to map goals, audience, and must-have features.",
              },
              {
                t: "Build",
                b: "Mobile-first design, copywriting, and technical setup.",
              },
              {
                t: "Launch & grow",
                b: "SEO basics, analytics, and optional care plan with updates.",
              },
            ].map((s, i) => (
              <li key={s.t} className="rounded-lg border p-5 bg-background">
                <p className="text-sm font-medium text-primary">Step {i + 1}</p>
                <h3 className="mt-1 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="proof" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="proof" className="text-2xl font-semibold tracking-tight">What clients say</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              q: "Our new website tripled online bookings in just 6 weeks. The automated reminders alone save me 2 hours every day.",
              a: "— Sarah M., Professional Dog Walker, Northampton",
            },
            {
              q: "Finally, a website that actually explains our pricing clearly. We're getting better quality leads and fewer price shoppers.",
              a: "— Mike T., Mobile Pet Groomer, Kettering",
            },
          ].map((t, idx) => (
            <blockquote key={idx} className="rounded-lg border p-5 bg-card">
              <p className="">“{t.q}”</p>
              <footer className="mt-2 text-sm text-muted-foreground">{t.a}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section aria-labelledby="closing" className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h2 id="closing" className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Ready to look professional and get more bookings?
        </h2>
        <SecondaryCTAs className="mt-6 justify-center" />
      </section>
    </>
  );
}

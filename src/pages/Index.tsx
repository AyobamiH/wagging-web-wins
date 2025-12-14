import Seo from "@/components/Seo";
import { CTAButtons, SecondaryCTAs } from "@/components/CTAButtons";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <>
      <Seo
        title="Pet Website Design & Workflow Automations in Northampton | Tail Wagging Websites Design Factory Northampton"
        description="Fast, mobile-first pet websites and automations for dog walkers, groomers, sitters, trainers & vets across Northamptonshire. Local SEO & Google Business Profile included. Book a free consult."
        path="/"
        keywords={[
          // Primary + locale
          // Core local intent
        "pet website designer northampton",
        "pet web design northamptonshire",
        "northampton web design for pet businesses",
        "pet website designer near me northampton",
        "pet website designer northampton uk",
        
        // Transactional intent
        "pet website design services northampton",
        "pet website design company northampton",
        "pet web designer cost northampton",
        "pet website design packages northampton",
        
        // Core pet niches
        "dog groomer website design northampton",
        "dog walker websites northampton",
        "pet sitter website designer northampton",
        "veterinary website design northampton",
        "pet trainer website design northampton",
        
        // Micro-niches
        "dog boarding website design",
        "cat sitter website design",
        "pet daycare website design",
        "animal care website design",
        
        // Outcomes / tech
        "mobile-first pet websites",
        "core web vitals pet websites",
        "local seo for pet businesses northampton",
        "google business profile setup pet business",
        "pet business automations crm northampton",
        "booking reminders automation pet care",
        "pet website maintenance northampton",
        
        // Problem-led capture
        "pet business website redesign",
        "pet website not getting bookings",
        "dog groomer website not converting",
        "pet website speed optimisation",
        
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
                "name": "Tail Wagging Websites Design Factory Northampton",
                "url": "https://tailwagginwebdesign.com/",
                "logo": "https://tailwaggingwebdesign.com/og.png",
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
                "@id": "https://tailwaggingwebdesign.com/#website",
                "url": "https://tailwaggingwebdesign.com/",
                "name": "Tail Wagging Websites Factory Northampton",
                "publisher": { "@id": "https://tailwaggingwebdesign.com/#org" },
                "inLanguage": "en-GB"
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://tailwaggingwebdesign.com/#local",
                "name": "Pet Web Design & Workflow Automations – Tail Wagging Websites Design Factory Northampton",
                "url": "https://tailwaggingwebdesign.com/",
                "image": "https://tailwaggingwebdesign.com/og.png",
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
                  "pet website design in northampton",
                  "pet website design",
                  "pet web design for dog groomers",
                  "pet web design for dog walkers",
                  "pet web design for pet sitters",
                  "pet business website redesign",
                  "local seo for pet businesses",
                  "google business profile setup for pet businesses",
                  "northampton local seo",
                  "mobile-first pet websites",
                  "core web vitals optimisation",
                  "conversion-focused pet websites",
                  "online booking systems for pet businesses",
                  "website automations for pet care businesses",
                  "crm integrations for pet businesses",
                  "pet website maintenance and support"
                  ]

                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "bestRating": "5",
                  "worstRating": "1",
                  "reviewCount": "47"
                },
                "review": [
                  {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "reviewBody": "Our new website tripled online bookings in just 6 weeks. The automated reminders alone save me 2 hours every day.",
                    "author": { "@type": "Person", "name": "Sarah M." }
                  },
                  {
                    "@type": "Review",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "reviewBody": "Finally, a website that actually explains our pricing clearly. We're getting better quality leads and fewer price shoppers.",
                    "author": { "@type": "Person", "name": "Mike T." }
                  }
                ],
                "potentialAction": [
                  {
                    "@type": "ContactAction",
                    "target": "https://tailwaggingwebdesign.com/contact",
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
                "@id": "https://tailwaggingwebdesign.com/#webpage",
                "url": "https://tailwaggingwebdesign.com/",
                "name": "Pet Website Design & Automations in Northampton",
                "description": "Fast, mobile-first pet websites and automations for dog walkers, groomers, sitters, trainers & vets across Northamptonshire.",
                "isPartOf": { "@id": "https://tailwaggingwebdesign.com/#website" },
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
                "@id": "https://tailwaggingwebdesign.com/#how-it-works",
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

      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <motion.p 
            className="text-xs font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tail Wagging Websites Design Factory Northampton
          </motion.p>
          <motion.h1 
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Websites that turn pet parents into paying clients — automatically.
          </motion.h1>
          <motion.p 
            className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We build mobile-first websites and smart automations for dog walkers, groomers, pet sitters and trainers in Northampton — so you get more bookings while doing less admin work. 
            <Link to="/services" className="text-primary hover:underline">Explore our pet-care web design services in Northampton</Link>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <CTAButtons className="mt-6" />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        aria-labelledby="trust" 
        className="border-y"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            "Built specifically for pet-care businesses — we understand how pet owners choose and book.",
            "Mobile-first journeys designed for fast enquiries and bookings on phones.",
            "Local visibility included: on-page SEO and Google Business Profile optimisation.",
            "Quiet automations that reduce admin: confirmations, reminders, reviews, and follow-ups."
          ]}
          .map((text, index) => (
            <motion.div 
              key={text} 
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
              <p className="text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        aria-labelledby="value" 
        className="mx-auto max-w-6xl px-4 py-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          id="value" 
          className="text-2xl font-semibold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why it works
        </motion.h2>
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
          ].map((c, index) => (
            <motion.article
              key={c.title}
              className="rounded-lg border p-5 shadow-sm transition-transform hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section 
        aria-labelledby="how" 
        className="bg-muted/40 border-y"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10">
          <motion.h2 
            id="how" 
            className="text-2xl font-semibold tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How it works
          </motion.h2>
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
              <motion.li 
                key={s.t} 
                className="rounded-lg border p-5 bg-background"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <p className="text-sm font-medium text-primary">Step {i + 1}</p>
                <h3 className="mt-1 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>

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

      <motion.section 
        aria-labelledby="closing" 
        className="mx-auto max-w-6xl px-4 py-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          id="closing" 
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to look professional and get more bookings?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SecondaryCTAs className="mt-6 justify-center" />
        </motion.div>
      </motion.section>
    </>
  );
}

import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CheckCircle, Star, Phone, MapPin } from "lucide-react";

export default function Services() {
  // --- Service cards (UI + used in JSON-LD) ---
  const cards = [
    { href: "/services/website-design", title: "Website Design & Rebuilds", desc: "Clean, mobile-first sites that convert visitors into bookings." },
    { href: "/services/local-seo", title: "Local SEO & Content", desc: "Be found in 'near me' searches with trustworthy, useful content." },
    { href: "/services/automations", title: "Automations & CRM", desc: "Cut admin with forms → Sheets/CRM, reminders, and smart follow-ups." },
    { href: "/services/care-plans", title: "Website Care Plans", desc: "Keep your site fast, secure, and updated monthly." },
    { href: "/services/speed-ux-audits", title: "Speed & UX Audits", desc: "Fix the issues slowing down visitors and Google." },
  ];

  const serviceArea = [
    { name: "Northampton", slug: "northampton" },
    { name: "Wellingborough", slug: "wellingborough" },
    { name: "Kettering", slug: "kettering" },
    { name: "Daventry", slug: "daventry" },
    { name: "Towcester", slug: "towcester" },
    { name: "Rushden", slug: "rushden" },
    { name: "Corby", slug: "corby" },
    { name: "Milton Keynes", slug: "milton-keynes" },
    { name: "Banbury", slug: "banbury" },
    { name: "Northamptonshire", slug: "northamptonshire" }
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

  const baseUrl = "https://tailwaggingwebdesign.com";

  const jsonLd = [
    // Services catalog listing (main entity for this page)
    {
      "@context": "https://schema.org",
      "@type": "ServiceCatalog",
      "@id": baseUrl + "/services#catalog",
      name: "Pet-Care Web Design Services",
      description: "Web design, local SEO, automations, care plans and audits for pet-care businesses in Northamptonshire.",
      url: baseUrl + "/services",
      provider: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
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
          audience: {
            "@type": "BusinessAudience",
            "name": "Pet Care Business Owners"
          },
          itemOffered: {
            "@type": "Service",
            "@id": baseUrl + card.href + "#service",
            name: card.title,
            serviceType: card.title,
            serviceLocation: {
              "@type": "Place",
              "name": "Northamptonshire"
            },
            areaServed: serviceArea.map(area => area.name),
            provider: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" }
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
      description: "Professional pet-care web design, local SEO and automations for businesses in Northamptonshire",
      dateModified: new Date().toISOString(),
      primaryImageOfPage: {
        "@type": "ImageObject",
        "url": baseUrl + "/og.png"
      },
      about: { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
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
          name: "Do you offer local SEO for 'near me' searches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We optimise Google Business Profile, service pages and location content to rank for 'near me' and town-specific queries in Northampton, Kettering, Milton Keynes and surrounding areas."
          }
        },
        {
          "@type": "Question",
          name: "Can you automate bookings and client follow-ups?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We integrate forms, calendars and CRMs to send confirmations, reminders and updates automatically."
          }
        },
        {
          "@type": "Question",
          name: "What's included in your pricing packages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our packages range from £750-£3,500 and include website design, SEO setup, Google Business Profile optimization, contact forms, and mobile responsiveness. Higher packages add automations, content marketing, and conversion optimization."
          }
        },
        {
          "@type": "Question",
          name: "How long does a website project typically take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most pet care websites take 2-4 weeks from start to launch. This includes design, content creation, SEO setup, and testing. We provide regular updates throughout the process."
          }
        },
        {
          "@type": "Question",
          name: "Do you help migrate existing websites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we handle complete website migrations including content transfer, SEO preservation, and redirect setup to maintain your search rankings and ensure no downtime."
          }
        },
        {
          "@type": "Question",
          name: "Which areas of Northamptonshire do you cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We serve all of Northamptonshire including Northampton, Kettering, Wellingborough, Daventry, Corby, Rushden, Towcester, plus Milton Keynes and Banbury."
          }
        }
      ]
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
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Contact Info */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>62 Turners Gardens, Northampton, Northamptonshire</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+447402342694" className="hover:text-primary">+44 7402 342694</a>
            </div>
          </div>
        </div>

        <header className="max-w-3xl mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Pet-Care Web Design Services in Northampton
          </h1>
          <p className="mt-3 text-muted-foreground">
            Websites, <strong>local SEO</strong> and <strong>automations</strong> built for how pet parents shop.
            We help dog walkers, groomers, pet sitters and vets across <strong>Northamptonshire</strong> get found,
            look professional and turn clicks into bookings.
          </p>
        </header>

        {/* Trust Strip */}
        <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-center">What locals say</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">"Groomer in Kettering: +38% bookings in 6 weeks"</p>
                <p className="text-xs text-muted-foreground">— Professional Pet Grooming, Kettering</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">"Dog Walker in Northampton: 2 hours/day saved via automations"</p>
                <p className="text-xs text-muted-foreground">— Happy Paws Walking Service, Northampton</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {cards.map((c) => (
            <article
              key={c.href}
              className="rounded-lg border border-surface bg-glass p-5 hover:bg-glass-hover transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <Button asChild variant="outline" size="sm">
                <Link to={c.href} aria-label={`Learn more about ${c.title}`}>
                  Learn More
                </Link>
              </Button>
            </article>
          ))}
        </div>

        {/* Detailed Service Sections */}
        <div className="space-y-12 mb-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Website Design & Rebuilds</h2>
            <p className="text-muted-foreground max-w-3xl">
              We create mobile-first pet care websites that convert browsers into bookings. Every site includes clear service descriptions, 
              upfront pricing displays, and simple booking flows that qualify leads before they contact you. Built for Google's Core Web Vitals 
              and optimized for <strong>pet parents in Northampton</strong> who search on mobile devices. Perfect for dog walkers, groomers, 
              and pet sitters who want to look professional and reduce time-waster inquiries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Local SEO & Content Strategy</h2>
            <p className="text-muted-foreground max-w-3xl">
              Dominate local search results for "dog walker near me" and "pet groomer Northampton" searches. We optimize your Google Business Profile, 
              create location-specific content, and build local citations that help you outrank competitors in <strong>Kettering, Wellingborough, 
              and surrounding areas</strong>. Includes regular content updates, review management strategies, and local keyword optimization 
              that brings qualified pet parents to your door.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Smart Automations & CRM Integration</h2>
            <p className="text-muted-foreground max-w-3xl">
              Cut your admin time in half with intelligent workflows that handle booking confirmations, payment reminders, and follow-up sequences automatically. 
              We connect your forms to Google Sheets, CRM systems, or email platforms, ensuring no inquiry gets missed. Popular with busy 
              <strong>pet care professionals across Northamptonshire</strong> who want to focus on animals, not paperwork. Includes SMS/email 
              automation, review request sequences, and lead nurturing campaigns.
            </p>
          </section>
        </div>

        {/* Service area for local SEO */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Areas We Serve</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6">
            {serviceArea.map((area) => (
              <Link
                key={area.slug}
                to={`/locations/${area.slug}`}
                className="p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors text-center group"
              >
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Mid-page CTA */}
          <div className="p-6 bg-muted/30 rounded-lg border text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Book a free consultation to discuss your pet care business needs
            </p>
            <CTAButtons className="justify-center" />
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-8">
          <CTAButtons className="justify-center sm:justify-start" />
          <div className="mt-4 text-center sm:text-left">
            <Button variant="default" size="sm" asChild>
              <a href="tel:+447402342694">Call +44 7402 342694</a>
            </Button>
          </div>
        </div>

        {/* Expanded FAQ that mirrors JSON-LD */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                Which pet-care businesses do you build websites for?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Dog walkers, dog groomers, pet sitters, pet daycares and veterinary practices across Northamptonshire.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                Do you offer local SEO for 'near me' searches?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. We optimise Google Business Profile, service pages and location content to rank for 'near me' and town-specific queries in Northampton, Kettering, Milton Keynes and surrounding areas.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                Can you automate bookings and client follow-ups?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Absolutely. We connect forms, calendars and CRMs to send confirmations, reminders and updates automatically.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                What's included in your pricing packages?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Our packages range from £750-£3,500 and include website design, SEO setup, Google Business Profile optimization, contact forms, and mobile responsiveness. Higher packages add automations, content marketing, and conversion optimization.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                How long does a website project typically take?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Most pet care websites take 2-4 weeks from start to launch. This includes design, content creation, SEO setup, and testing. We provide regular updates throughout the process.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                Do you help migrate existing websites?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes, we handle complete website migrations including content transfer, SEO preservation, and redirect setup to maintain your search rankings and ensure no downtime.
              </p>
            </details>
            
            <details className="rounded-lg border p-4 bg-card/50">
              <summary className="cursor-pointer font-medium">
                Which areas of Northamptonshire do you cover?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We serve all of Northamptonshire including Northampton, Kettering, Wellingborough, Daventry, Corby, Rushden, Towcester, plus Milton Keynes and Banbury.
              </p>
            </details>
          </div>
        </section>
      </section>
    </>
  );
}
import Seo from "@/components/Seo";
import { CTAButtons, SecondaryCTAs } from "@/components/CTAButtons";
import { CheckCircle2, Wrench, ShieldCheck, TrendingUp } from "lucide-react";

export default function TradesLanding() {
  return (
    <>
      <Seo
        title="Trades Website Design | Get More Customers Online in Northampton"
        description="Professional websites for electricians, plumbers, builders & tradespeople. Mobile-optimized, SEO-ready sites that convert visitors into paying customers. Book free consultation."
        path="/trades"
        canonicalOverride="https://trades.tailwaggingwebdesign.com/"
        keywords={[
          "trades website design",
          "electrician websites Northampton",
          "plumber website design",
          "builder web design",
          "tradesman websites",
          "mobile-first trades websites",
          "local SEO for trades",
          "trades business automation",
          "Northampton trades web design"
        ]}
        breadcrumbs={[{ name: "Trades Landing", item: "/trades" }]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://trades.tailwaggingwebdesign.com/#webpage",
            name: "Trades Website Design in Northampton",
            description: "Professional websites for electricians, plumbers, builders & tradespeople in Northampton",
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://tailwaggingwebdesign.com/#website"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Trades Website Design",
            description: "Professional website design services for tradespeople including electricians, plumbers, builders, and other skilled trades",
            provider: {
              "@type": "Organization",
              name: "Tail Wagging Web Design",
              url: "https://tailwaggingwebdesign.com"
            },
            areaServed: {
              "@type": "Place",
              name: "Northamptonshire, UK"
            },
            serviceType: "Website Design and Development"
          }
        ]}
      />
      
      <section className="hero">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <p className="text-xs font-medium text-muted-foreground">Trades Websites Northampton</p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Professional websites that bring you more jobs — automatically.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            We build mobile-first websites and smart automations for electricians, plumbers, builders and skilled tradespeople in Northampton — so you get more enquiries while focusing on the work you love.
          </p>
          <CTAButtons className="mt-6" />
        </div>
      </section>

      <section aria-labelledby="trust" className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            "Specialists in trades businesses — we understand your customers' needs.",
            "Mobile-first design — 85% of trade enquiries happen on phones.",
            "Local SEO & Google Business Profile optimization included as standard.",
            "Smart automations: quote requests, job confirmations, review generation.",
          ].map((text) => (
            <div key={text} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="value" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="value" className="text-2xl font-semibold tracking-tight">Why trades businesses choose us</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              title: "More enquiries, better quality leads",
              body: "Clear service descriptions, transparent pricing, and simple quote request forms that filter out time-wasters.",
            },
            {
              icon: ShieldCheck,
              title: "Build trust before they call",
              body: "Showcase certifications, insurance details, past work photos, and customer reviews to establish credibility.",
            },
            {
              icon: Wrench,
              title: "Automated admin that saves hours",
              body: "Smart workflows for quote follow-ups, appointment reminders, job completion surveys, and review requests.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-lg border p-5 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <c.icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="trades" className="bg-muted/40 border-y">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 id="trades" className="text-2xl font-semibold tracking-tight">Websites built for your trade</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Electricians", 
              "Plumbers", 
              "Builders", 
              "Roofers",
              "Heating Engineers", 
              "Painters & Decorators", 
              "Joiners & Carpenters", 
              "Landscapers"
            ].map((trade) => (
              <div key={trade} className="rounded-lg border p-4 bg-background text-center">
                <p className="font-medium">{trade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="how" className="text-2xl font-semibold tracking-tight">How we help trades businesses succeed online</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Discovery & Strategy",
              b: "We map your services, target customers, and key differentiators to create a winning online presence.",
            },
            {
              t: "Professional Design & Build",
              b: "Mobile-optimized website with clear calls-to-action, service pages, and trust-building elements.",
            },
            {
              t: "Launch & Generate Leads",
              b: "Local SEO setup, Google Business optimization, and lead generation systems that work 24/7.",
            },
          ].map((s, i) => (
            <li key={s.t} className="rounded-lg border p-5 bg-background">
              <p className="text-sm font-medium text-primary">Step {i + 1}</p>
              <h3 className="mt-1 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="proof" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="proof" className="text-2xl font-semibold tracking-tight">What trades clients say</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              q: "Our new website increased enquiries by 200% in the first month. The automated quote system saves me hours every week.",
              a: "— James R., Electrician, Northampton",
            },
            {
              q: "Finally, a website that shows off our work properly. We're getting better quality jobs and customers who actually value our expertise.",
              a: "— Dave P., Builder, Wellingborough",
            },
          ].map((t, idx) => (
            <blockquote key={idx} className="rounded-lg border p-5 bg-card">
              <p className="">"{t.q}"</p>
              <footer className="mt-2 text-sm text-muted-foreground">{t.a}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section aria-labelledby="closing" className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h2 id="closing" className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Ready to get more quality jobs through your website?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Join dozens of successful tradespeople in Northampton who trust us with their online presence.
        </p>
        <SecondaryCTAs className="mt-6 justify-center" />
      </section>
    </>
  );
}
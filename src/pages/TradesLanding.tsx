import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Wrench, ShieldCheck, TrendingUp, Phone, Mail, MapPin, Zap, Hammer, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { trackCTAClick } from "@/lib/analytics";

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
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <CalendlyEmbed
              buttonText="Book Free Consultation"
              buttonSize="lg"
              className="bg-primary hover:bg-primary/90"
              trackingLocation="trades_hero"
            />
            <Link to="/tools">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => trackCTAClick('view_work', 'trades_hero')}
              >
                View Our Work
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
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

      <section id="services" aria-labelledby="value" className="mx-auto max-w-6xl px-4 py-10">
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

      {/* Pricing & Packages Section */}
      <section id="pricing" aria-labelledby="packages" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="packages" className="text-2xl font-semibold tracking-tight text-center">
          Website Packages for Trade Businesses
        </h2>
        <p className="mt-3 text-muted-foreground text-center max-w-2xl mx-auto">
          Choose the perfect package for your trade business. All packages include mobile optimization, local SEO, and lead generation features.
        </p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "£1,499",
              description: "Perfect for solo tradespeople getting started online",
              features: [
                "5-page mobile-first website",
                "Contact forms & quote requests",
                "Google Business Profile setup",
                "Basic local SEO optimization",
                "SSL certificate & hosting included"
              ]
            },
            {
              name: "Professional",
              price: "£2,799",
              popular: true,
              description: "Most popular choice for established trade businesses",
              features: [
                "10-page comprehensive website",
                "Online booking system integration",
                "Customer review showcase",
                "Advanced SEO & speed optimization",
                "Lead tracking & analytics",
                "Email automation sequences"
              ]
            },
            {
              name: "Enterprise",
              price: "£4,299",
              description: "For larger trade companies with multiple services",
              features: [
                "Unlimited pages & service areas",
                "Multi-location optimization",
                "Staff profiles & portfolios",
                "Advanced automation workflows",
                "CRM integration",
                "Priority support & maintenance"
              ]
            }
          ].map((pkg) => (
            <div key={pkg.name} className={`rounded-lg border p-6 ${pkg.popular ? 'border-primary shadow-lg' : ''} relative`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{pkg.price}</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>
              <ul className="mt-4 space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <CalendlyEmbed
                buttonText="Get Started"
                className="w-full"
                buttonVariant={pkg.popular ? "default" : "outline"}
                trackingLocation={`trades_${pkg.name.toLowerCase()}_package`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-muted/40 border-y">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {[
              {
                q: "How long does it take to build a trades website?",
                a: "Most trade websites are completed within 2-3 weeks. This includes design, development, content creation, and local SEO setup. We'll provide a detailed timeline during your consultation."
              },
              {
                q: "Do you help with Google Business Profile and local SEO?",
                a: "Absolutely! Local SEO is crucial for trades businesses. We optimize your Google Business Profile, set up local directory listings, and ensure your website ranks well for local search terms like 'electrician near me'."
              },
              {
                q: "Can I update the website content myself?",
                a: "Yes! We build all websites on user-friendly platforms that allow you to easily update text, add photos of your work, and manage your services. We also provide training and ongoing support."
              },
              {
                q: "What's included in the automation features?",
                a: "Our automation includes quote request follow-ups, appointment reminders, job completion surveys, and review request emails. This helps you stay connected with customers and generate more positive reviews."
              },
              {
                q: "Do you provide ongoing support and maintenance?",
                a: "Yes! All packages include 3 months of free updates and support. After that, we offer affordable maintenance plans starting from £99/month to keep your website secure, fast, and up-to-date."
              },
              {
                q: "How do you ensure my website gets found by local customers?",
                a: "We implement comprehensive local SEO strategies including location-based keywords, Google Business Profile optimization, local directory submissions, and schema markup to help you rank higher in local search results."
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-lg border bg-background p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
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
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <CalendlyEmbed
            buttonText="Book Free Consultation"
            buttonSize="lg"
            trackingLocation="trades_bottom_cta"
          />
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => trackCTAClick('get_quote_email', 'trades_bottom_cta')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Get Quote via Email
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
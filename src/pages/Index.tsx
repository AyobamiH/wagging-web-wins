import Seo from "@/components/Seo";
import { CTAButtons, SecondaryCTAs } from "@/components/CTAButtons";
import { CheckCircle2 } from "lucide-react";

export default function Index() {
  return (
    <>
      <Seo
        title="Pet Care Web Design in Northampton | Tail Wagging Websites Factory"
        description="Mobile-first websites and automations for dog walkers, groomers, sitters and trainers. Clear pricing, local SEO, and faster pages. Book a free consult."
        path="/"
        breadcrumbs={[{ name: "Home", item: "/" }]}
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

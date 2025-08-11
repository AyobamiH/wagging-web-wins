import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <>
      <Seo
        title="Web Design Pricing for Pet Care | Transparent Packages"
        description="Starter, Pro and Growth packages with clear deliverables. Flexible payment options."
        path="/pricing"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Pricing", item: "/pricing" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Clear, transparent starting prices.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Exact quotes follow discovery, but we publish realistic starting points so you can plan.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            name: "Starter — from £750",
            desc: "For new pet care businesses. One-page or simple multi-section site, basic SEO, contact form, GBP setup.",
          },{
            name: "Pro — from £1,950",
            desc: "Multi-page site with services, pricing, reviews, blog, local SEO, simple automations.",
          },{
            name: "Growth — from £3,500",
            desc: "Everything in Pro plus advanced automations, content plan, and conversion experiments.",
          }].map((p) => (
            <article key={p.name} className="rounded-lg border p-5">
              <h2 className="font-semibold">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Payment plans available. Non-profits/charities — ask for reduced rates.</p>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

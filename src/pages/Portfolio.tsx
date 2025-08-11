import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const items = [
    { client: "Happy Paws", location: "Leeds", mix: "Design, SEO, Automations", result: "Bookings up 28% in 6 weeks." },
    { client: "Northants Grooming Co.", location: "Northampton", mix: "Rebuild, Local SEO", result: "Calls increased and better-qualified leads." },
    { client: "Sunny Walks", location: "Bristol", mix: "Design, Care Plan", result: "Faster site, clearer pricing, fewer questions." },
  ];

  return (
    <>
      <Seo
        title="Portfolio | Tail Wagging Websites"
        description="Recent work focused on clarity, trust, speed, and a simple path to book."
        path="/portfolio"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Portfolio", item: "/portfolio" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Recent work that’s built to convert.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Every project focuses on clarity, trust, speed, and a simple path to book.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <article key={i.client} className="rounded-lg border p-5">
              <p className="text-sm font-medium">{i.client} • {i.location}</p>
              <p className="text-sm text-muted-foreground">Service mix: {i.mix}</p>
              <p className="mt-2 text-sm"><strong>Result:</strong> {i.result}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">See More Projects</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

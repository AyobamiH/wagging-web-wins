import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function Services() {
  const cards = [
    { href: "/services/website-design", title: "Website Design & Rebuilds", desc: "Clean, mobile-first sites that convert browsers to bookings." },
    { href: "/services/local-seo", title: "Local SEO & Content", desc: "Be found for ‘near me’ searches with honest, useful content." },
    { href: "/services/automations", title: "Automations & CRM", desc: "Cut admin with forms → Sheets/CRM and smart follow-ups." },
    { href: "/services/care-plans", title: "Website Care Plans", desc: "Keep your site fast, secure and updated monthly." },
    { href: "/services/speed-ux-audits", title: "Speed & UX Audits", desc: "Fix what slows visitors and Google down." },
  ];

  return (
    <>
      <Seo
        title="Services for Pet Care | Tail Wagging Websites Factory"
        description="Services built for how pet parents shop: design, local SEO, automations, care plans and audits."
        path="/services"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Services", item: "/services" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Digital services that grow your pet care business.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          From stunning websites to local SEO and smart automations — everything you need to attract more customers, look professional, and save time on admin work.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} to={c.href} className="rounded-lg border p-5 hover:shadow-md transition-shadow">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

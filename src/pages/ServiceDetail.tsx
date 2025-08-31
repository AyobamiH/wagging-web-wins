// src/pages/ServiceDetail.tsx
import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CheckCircle } from "lucide-react";
import { getService, BASE_URL, SERVICE_AREA } from "@/data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/services" replace />;

  const url = `${BASE_URL}/services/${service.slug}`;
  const title = `${service.title} | Pet-Care Web Design Northampton`;
  const description = service.desc;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.intro,
      serviceType: service.title,
      areaServed: SERVICE_AREA,
      provider: { "@id": `${BASE_URL}/#localbusiness` },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: service.title,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#localbusiness` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={`/services/${service.slug}`}
        jsonLd={jsonLd}
      />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-4 text-sm">
          <Link to="/" className="underline underline-offset-4">Home</Link> ›{" "}
          <Link to="/services" className="underline underline-offset-4">Services</Link> ›{" "}
          <span className="text-muted-foreground">{service.title}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        <p className="mt-3 text-muted-foreground">{service.intro}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card/50 p-4">
            <p className="font-medium">Includes</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-card/50 p-4">
            <p className="font-medium">Outcomes</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {service.outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm">
          <Link to="/services" className="underline underline-offset-4">← Back to all services</Link>
        </div>
      </section>
    </>
  );
}

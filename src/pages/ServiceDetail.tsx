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
          <Link to="/" className="story-link hover:text-primary transition-colors duration-200">Home</Link> 
          <span className="mx-2 text-muted-foreground">›</span>
          <Link to="/services" className="story-link hover:text-primary transition-colors duration-200">Services</Link> 
          <span className="mx-2 text-muted-foreground">›</span>
          <span className="text-muted-foreground">{service.title}</span>
        </nav>

        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
          <p className="mt-3 text-muted-foreground">{service.intro}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="group rounded-lg border bg-card/50 p-4 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <p className="font-medium text-primary group-hover:text-primary/90 transition-colors">Includes</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {service.includes.map((item, index) => (
                <li 
                  key={item} 
                  className="flex gap-2 group-hover:text-foreground transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="group rounded-lg border bg-card/50 p-4 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <p className="font-medium text-primary group-hover:text-primary/90 transition-colors">Outcomes</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {service.outcomes.map((item, index) => (
                <li 
                  key={item} 
                  className="flex gap-2 group-hover:text-foreground transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 story-link hover:text-primary transition-all duration-200 hover:translate-x-[-4px]"
          >
            ← Back to all services
          </Link>
        </div>
      </section>
    </>
  );
}

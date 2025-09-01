// import { useParams, Link } from "react-router-dom";
// import Seo from "@/components/Seo";
// import { CTAButtons } from "@/components/CTAButtons";
// import { Button } from "@/components/ui/button";
// import { MapPin, ArrowRight, Phone } from "lucide-react";

// const LOCATION_DATA: Record<string, {
//   name: string;
//   county: string;
//   description: string;
//   benefits: string[];
//   nearby: string[];
// }> = {
//   "northampton": {
//     name: "Northampton",
//     county: "Northamptonshire",
//     description: "Our home base in Northampton means we understand local pet care businesses and what pet parents in the area are looking for.",
//     benefits: [
//       "Local knowledge of Northampton pet market",
//       "Fast response times for meetings",
//       "Understanding of local competition",
//       "Knowledge of area demographics"
//     ],
//     nearby: ["Wootton", "Kingsthorpe", "Duston", "Hardingstone"]
//   },
//   "wellingborough": {
//     name: "Wellingborough",
//     county: "Northamptonshire", 
//     description: "Serving pet care businesses in Wellingborough with websites that connect with local pet parents and drive bookings.",
//     benefits: [
//       "Local SEO for Wellingborough searches",
//       "Understanding of local pet care market",
//       "Quick support and meetings",
//       "Knowledge of area competition"
//     ],
//     nearby: ["Irchester", "Finedon", "Bozeat", "Earls Barton"]
//   },
//   "kettering": {
//     name: "Kettering",
//     county: "Northamptonshire",
//     description: "Professional pet care websites for Kettering businesses, designed to attract local pet parents and increase bookings.",
//     benefits: [
//       "Kettering-specific local SEO",
//       "Local market knowledge",
//       "Fast project turnaround",
//       "Regular check-ins available"
//     ],
//     nearby: ["Burton Latimer", "Desborough", "Rothwell", "Warkton"]
//   },
//   "daventry": {
//     name: "Daventry",
//     county: "Northamptonshire",
//     description: "Helping Daventry pet care businesses build professional websites that convert local searches into bookings.",
//     benefits: [
//       "Daventry local search optimization",
//       "Understanding rural/urban mix",
//       "Competitive pricing for area",
//       "Local business networking"
//     ],
//     nearby: ["Long Buckby", "Weedon", "Flore", "Kilsby"]
//   },
//   "towcester": {
//     name: "Towcester",
//     county: "Northamptonshire",
//     description: "Pet care web design services for Towcester businesses, combining local knowledge with digital expertise.",
//     benefits: [
//       "Towcester-focused content strategy",
//       "Local competition analysis",
//       "Historic town charm reflected in design",
//       "Racing heritage market understanding"
//     ],
//     nearby: ["Silverstone", "Brackley", "Whitfield", "Blakesley"]
//   },
//   "rushden": {
//     name: "Rushden",
//     county: "Northamptonshire",
//     description: "Modern pet care websites for Rushden businesses that attract local pet parents and drive growth.",
//     benefits: [
//       "Rushden local SEO expertise",
//       "Understanding of commuter demographic",
//       "Retail heritage in design approach",
//       "East Northants market knowledge"
//     ],
//     nearby: ["Higham Ferrers", "Irthlingborough", "Chelveston", "Newton Bromswold"]
//   },
//   "corby": {
//     name: "Corby",
//     county: "Northamptonshire",
//     description: "Professional web design for Corby pet care businesses, built to connect with the local community.",
//     benefits: [
//       "Corby-specific market insights",
//       "New town demographic understanding",
//       "Scottish heritage consideration",
//       "Young family market focus"
//     ],
//     nearby: ["Cottingham", "Rockingham", "Stanion", "Weldon"]
//   },
//   "milton-keynes": {
//     name: "Milton Keynes",
//     county: "Buckinghamshire",
//     description: "Serving Milton Keynes pet care businesses with cutting-edge websites and local SEO strategies.",
//     benefits: [
//       "Milton Keynes new city expertise",
//       "Tech-savvy demographic understanding",
//       "Large catchment area strategy",
//       "Modern business approach"
//     ],
//     nearby: ["Bletchley", "Wolverton", "Stony Stratford", "Newport Pagnell"]
//   },
//   "banbury": {
//     name: "Banbury",
//     county: "Oxfordshire",
//     description: "Pet care web design for Banbury businesses, combining traditional values with modern digital marketing.",
//     benefits: [
//       "Banbury Cross heritage marketing",
//       "Market town approach",
//       "Oxfordshire border expertise",
//       "Historic charm in modern design"
//     ],
//     nearby: ["Brackley", "Chipping Norton", "Deddington", "Hook Norton"]
//   },
//   "northamptonshire": {
//     name: "Northamptonshire",
//     county: "Northamptonshire",
//     description: "County-wide pet care web design services across Northamptonshire, from market towns to villages.",
//     benefits: [
//       "Complete county coverage",
//       "Rural and urban expertise",
//       "Market town specialization",
//       "Village business understanding"
//     ],
//     nearby: ["All towns and villages", "Complete county coverage", "Rural areas included", "Historic locations"]
//   }
// };

// export default function Location() {
//   const { slug } = useParams<{ slug: string }>();
  
//   if (!slug || !LOCATION_DATA[slug]) {
//     return (
//       <div className="mx-auto max-w-4xl px-4 py-12 text-center">
//         <h1 className="text-2xl font-semibold">Location not found</h1>
//         <p className="mt-2 text-muted-foreground">The location you're looking for doesn't exist.</p>
//         <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
//           View all services
//         </Link>
//       </div>
//     );
//   }

//   const location = LOCATION_DATA[slug];
//   const services = [
//     { title: "Website Design & Rebuilds", href: "/services/website-design" },
//     { title: "Local SEO & Content", href: "/services/local-seo" },
//     { title: "Automations & CRM", href: "/services/automations" },
//     { title: "Website Care Plans", href: "/services/care-plans" },
//     { title: "Speed & UX Audits", href: "/services/speed-ux-audits" }
//   ];

//   return (
//     <>
//       <Seo
//         title={`Pet-Care Web Design in ${location.name} | Tail Wagging Websites Factory`}
//         description={`Professional pet care website design and local SEO services in ${location.name}, ${location.county}. Helping dog walkers, groomers, and pet sitters get more bookings.`}
//         path={`/locations/${slug}`}
//         keywords={[
//           `pet care web design ${location.name.toLowerCase()}`,
//           `pet website designer ${location.name.toLowerCase()}`,
//           `dog walker website ${location.name.toLowerCase()}`,
//           `pet groomer web design ${location.name.toLowerCase()}`,
//           `pet business websites ${location.county.toLowerCase()}`,
//           `local seo pet care ${location.name.toLowerCase()}`,
//         ]}
//         breadcrumbs={[
//           { name: "Home", item: "/" },
//           { name: "Services", item: "/services" },
//           { name: location.name, item: `/locations/${slug}` }
//         ]}
//         jsonLd={[
//           {
//             "@context": "https://schema.org",
//             "@type": "WebPage",
//             "@id": `https://tailwaggingwebdesign.com/locations/${slug}#webpage`,
//             "name": `Pet-Care Web Design in ${location.name}`,
//             "description": `Professional pet care website design services in ${location.name}, ${location.county}`,
//             "url": `https://tailwaggingwebdesign.com/locations/${slug}`,
//             "isPartOf": { "@id": "https://tailwaggingwebdesign.com/#website" },
//             "about": { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
//             "breadcrumb": {
//               "@type": "BreadcrumbList",
//               "itemListElement": [
//                 { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwaggingwebdesign.com/" },
//                 { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tailwaggingwebdesign.com/services" },
//                 { "@type": "ListItem", "position": 3, "name": location.name, "item": `https://tailwaggingwebdesign.com/locations/${slug}` }
//               ]
//             }
//           },
//           {
//             "@context": "https://schema.org",
//             "@type": "Service",
//             "@id": `https://tailwaggingwebdesign.com/locations/${slug}#service`,
//             "name": `Pet-Care Web Design Services in ${location.name}`,
//             "description": location.description,
//             "provider": { "@id": "https://tailwaggingwebdesign.com/#localbusiness" },
//             "areaServed": {
//               "@type": "Place",
//               "name": location.name,
//               "containedInPlace": {
//                 "@type": "Place", 
//                 "name": location.county
//               }
//             },
//             "serviceType": "Web Design",
//             "category": "Pet Care Web Design"
//           }
//         ]}
//       />

//       <section className="mx-auto max-w-6xl px-4 py-10">
//         {/* Breadcrumbs */}
//         <nav className="mb-6" aria-label="Breadcrumb">
//           <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
//             <li><Link to="/" className="hover:text-primary">Home</Link></li>
//             <li>→</li>
//             <li><Link to="/services" className="hover:text-primary">Services</Link></li>
//             <li>→</li>
//             <li className="text-foreground">{location.name}</li>
//           </ol>
//         </nav>

//         <header className="mb-10">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
//               <MapPin className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">
//                 Pet-care web design in {location.name}
//               </h1>
//               <p className="text-muted-foreground">{location.county}</p>
//             </div>
//           </div>
          
//           <p className="text-lg text-muted-foreground max-w-3xl">
//             {location.description}
//           </p>
//         </header>

//         {/* Contact Info */}
//         <div className="mb-10 p-6 bg-muted/30 rounded-lg border">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h2 className="font-semibold mb-1">Contact Us</h2>
//               <p className="text-sm text-muted-foreground">
//                 62 Turners Gardens, Northampton, Northamptonshire
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <Button variant="outline" size="sm" asChild>
//                 <a href="tel:+447402342694" className="flex items-center gap-2">
//                   <Phone className="h-4 w-4" />
//                   +44 7402 342694
//                 </a>
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Why Choose Us for This Location */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">
//             Why choose us for your {location.name} pet care business?
//           </h2>
//           <div className="grid gap-4 sm:grid-cols-2">
//             {location.benefits.map((benefit, index) => (
//               <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card/50">
//                 <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
//                 <p className="text-sm">{benefit}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Services Available */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6">
//             Our services in {location.name}
//           </h2>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {services.map((service) => (
//               <Link
//                 key={service.href}
//                 to={service.href}
//                 className="p-5 rounded-lg border bg-card/50 hover:bg-card transition-colors group"
//               >
//                 <h3 className="font-medium group-hover:text-primary transition-colors">
//                   {service.title}
//                 </h3>
//                 <div className="mt-3 flex items-center gap-2 text-sm text-primary">
//                   Learn more
//                   <ArrowRight className="h-4 w-4" />
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Back to Services Hub */}
//         <div className="mb-8 text-center">
//           <Link 
//             to="/services"
//             className="inline-flex items-center gap-2 text-primary hover:underline"
//           >
//             ← View all services
//           </Link>
//         </div>

//         {/* CTA */}
//         <div className="text-center p-8 rounded-lg bg-muted/30 border">
//           <h2 className="text-2xl font-semibold mb-4">
//             Ready to grow your {location.name} pet care business?
//           </h2>
//           <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//             Let's discuss how we can help you attract more local customers and streamline your operations.
//           </p>
//           <CTAButtons className="justify-center" />
//         </div>

//         {/* Nearby Areas */}
//         {location.nearby.length > 0 && (
//           <section className="mt-12 pt-8 border-t border-border">
//             <h3 className="text-lg font-semibold mb-4">
//               We also serve nearby areas
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               {location.nearby.join(" • ")}
//             </p>
//           </section>
//         )}
//       </section>
//     </>
//   );
// }



// src/pages/Location.tsx
import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CTAButtons } from "@/components/CTAButtons";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Phone } from "lucide-react";

import { BASE_URL, SERVICES, SLUGS, type Slug } from "@/data/services";
import { getLocation, SERVICE_AREA } from "@/data/location";

export default function Location() {
  const { slug } = useParams<{ slug: string }>();
  const location = getLocation(slug);

  if (!location) {
    return <Navigate to="/service-areas" replace />;
  }

  const services = [...SLUGS].map((s) => ({
    title: SERVICES[s].title,
    href: `/services/${s}`,
  }));

  const path = `/locations/${location.slug}`;
  const title = `Pet-Care Web Design in ${location.name} | Tail Wagging Websites Factory`;
  const description = `Professional pet care website design and local SEO services in ${location.name}, ${location.county}. Helping dog walkers, groomers, and pet sitters get more bookings.`;

  // JSON-LD
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}#webpage`,
    name: `Pet-Care Web Design in ${location.name}`,
    description: `Professional pet care website design services in ${location.name}, ${location.county}`,
    url: `${BASE_URL}${path}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BASE_URL}/service-areas` },
        { "@type": "ListItem", position: 3, name: location.name, item: `${BASE_URL}${path}` },
      ],
    },
  };

  const placeNode: any = {
    "@type": "Place",
    name: location.name,
    containedInPlace: { "@type": "Place", name: location.county },
  };
  if (location.lat && location.lng) {
    placeNode.geo = { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng };
  }

  const serviceNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}${path}#service`,
    name: `Pet-Care Web Design Services in ${location.name}`,
    description: location.description,
    provider: { "@id": `${BASE_URL}/#localbusiness` },
    areaServed: placeNode,
    serviceType: "Web Design",
    category: "Pet Care Web Design",
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Service Areas", item: "/service-areas" },
          { name: location.name, item: path },
        ]}
        // keep your keywords if your app uses them internally; Google ignores meta keywords
        jsonLd={[webPage, serviceNode]}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>→</li>
            <li><Link to="/service-areas" className="hover:text-primary">Service Areas</Link></li>
            <li>→</li>
            <li className="text-foreground">{location.name}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Pet-care web design in {location.name}
              </h1>
              <p className="text-muted-foreground">{location.county}</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl">
            {location.description}
          </p>
        </header>

        {/* Contact Info */}
        <div className="mb-10 p-6 bg-muted/30 rounded-lg border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold mb-1">Contact Us</h2>
              <p className="text-sm text-muted-foreground">
                Northampton, Northamptonshire
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+447402342694" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +44 7402 342694
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Why choose us for your {location.name} pet care business?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {location.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card/50">
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <p className="text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services in this city */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Our services in {location.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="p-5 rounded-lg border bg-card/50 hover:bg-card transition-colors group"
              >
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to Service Areas */}
        <div className="mb-8 text-center">
          <Link to="/service-areas" className="inline-flex items-center gap-2 text-primary hover:underline">
            ← View all service areas
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-lg bg-muted/30 border">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to grow your {location.name} pet care business?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let's discuss how we can help you attract more local customers and streamline your operations.
          </p>
          <CTAButtons className="justify-center" />
        </div>

        {/* Nearby areas */}
        {location.nearby.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">We also serve nearby areas</h3>
            <div className="flex flex-wrap gap-2">
              {location.nearby.map((n) => (
                <span key={n} className="rounded-full border px-2.5 py-1 text-sm">
                  {n}
                </span>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}

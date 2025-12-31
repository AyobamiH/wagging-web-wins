// src/pages/ServiceDetail.tsx
import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import { CheckCircle, Clock, Users, Star, ArrowRight } from "lucide-react";
import { getService, BASE_URL, SERVICE_AREA, SERVICES, Slug } from "@/data/services";
import { CTAButtons } from "@/components/CTAButtons";
import FAQList from "@/components/whyDoDogs/FAQList";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/services" replace />;

  const url = `${BASE_URL}/services/${service.slug}`;
  const title = `${service.title} | Pet-Care Web Design Northampton`;
  const description = service.desc;

  // Get related services (exclude current)
  const relatedServices = Object.values(SERVICES)
    .filter(s => s.slug !== service.slug)
    .slice(0, 3);

  // Service-specific content
  const getServiceFAQs = (slug: Slug) => {
    const faqs = {
      "website-design": [
        { q: "How long does a website redesign take?", a: "Most pet care websites are completed within 2-3 weeks, including revisions and mobile optimization." },
        { q: "Will my website work on mobile devices?", a: "Yes, all websites are built mobile-first since 70%+ of pet parents browse on their phones when looking for services." },
        { q: "Do you provide hosting and maintenance?", a: "We can recommend reliable hosting providers and offer ongoing maintenance through our care plans." }
      ],
      "local-seo": [
        { q: "How quickly will I see SEO results?", a: "Local SEO typically shows improvements within 3-6 months, with Google Business Profile optimizations often visible sooner." },
        { q: "What areas do you optimize for?", a: "We focus on Northamptonshire including Northampton, Kettering, Wellingborough, and surrounding areas where pet parents search." },
        { q: "Do I need to write blog posts?", a: "We provide a content strategy, but you can choose to write posts yourself or have us handle the content creation." }
      ],
      "automations": [
        { q: "What tools do you integrate with?", a: "We work with popular tools like Google Sheets, Calendly, Mailchimp, and can connect most CRM systems via Zapier." },
        { q: "Will automations work with my existing systems?", a: "Yes, we audit your current workflow and integrate with your preferred tools rather than forcing changes." },
        { q: "How much time will I save?", a: "Most clients save 5-10 hours per week on admin tasks like follow-ups, confirmations, and data entry." }
      ],
      "care-plans": [
        { q: "What if my website breaks?", a: "We monitor uptime 24/7 and restore from backups if needed. Most issues are resolved within hours." },
        { q: "Can I make my own small changes?", a: "Yes, for simple text updates. For anything technical, we handle it as part of your plan." },
        { q: "Is there a contract?", a: "Plans are month-to-month with no long-term contracts. Cancel anytime with 30 days notice." }
      ],
      "speed-ux-audits": [
        { q: "How detailed is the audit report?", a: "You'll get a comprehensive report with screenshots, performance scores, and prioritized action items with effort estimates." },
        { q: "Can you implement the recommendations?", a: "Yes, we can implement quick wins immediately and provide a roadmap for larger improvements." },
        { q: "Will this help my Google rankings?", a: "Faster sites with better UX typically rank higher, especially for mobile searches in local results." }
      ]
    };
    return faqs[slug] || [];
  };

  const getServiceProcess = (slug: Slug) => {
    const processes = {
      "website-design": [
        { title: "Discovery & Strategy", desc: "We audit your current site, understand your services, and plan the ideal user journey for pet parents." },
        { title: "Design & Development", desc: "Create mobile-first designs with clear pricing, booking flows, and trust signals that convert visitors." },
        { title: "Content & SEO Setup", desc: "Optimize for local search with service pages, location content, and proper technical SEO foundation." },
        { title: "Launch & Training", desc: "Go live with analytics tracking and provide training so you can make simple updates yourself." }
      ],
      "local-seo": [
        { title: "Local SEO Audit", desc: "Analyze your current Google Business Profile, local citations, and competitor landscape." },
        { title: "Profile Optimization", desc: "Enhance your GBP with proper categories, service descriptions, photos, and posting strategy." },
        { title: "Content Creation", desc: "Develop location-specific pages and helpful content that answers pet owners' common questions." },
        { title: "Monitor & Improve", desc: "Track rankings, review acquisition, and continuously optimize for better local visibility." }
      ],
      "automations": [
        { title: "Workflow Assessment", desc: "Map your current admin processes to identify repetitive tasks that can be automated." },
        { title: "System Integration", desc: "Connect your forms, calendar, CRM, and communication tools to work seamlessly together." },
        { title: "Automation Setup", desc: "Build smart workflows for confirmations, reminders, follow-ups, and review requests." },
        { title: "Training & Support", desc: "Show you how to monitor and adjust automations, plus provide ongoing technical support." }
      ],
      "care-plans": [
        { title: "Initial Health Check", desc: "Comprehensive audit of your site's speed, security, backups, and performance metrics." },
        { title: "Ongoing Monitoring", desc: "24/7 uptime monitoring, security scans, and automated backups to prevent issues." },
        { title: "Monthly Maintenance", desc: "Updates, optimizations, content changes, and performance improvements delivered monthly." },
        { title: "Growth Support", desc: "As your business grows, we help scale your website and add new features as needed." }
      ],
      "speed-ux-audits": [
        { title: "Performance Analysis", desc: "Test your site's Core Web Vitals, load times, and mobile experience across different devices." },
        { title: "UX Journey Review", desc: "Evaluate key user flows like booking appointments, viewing prices, and contact forms." },
        { title: "Prioritized Action Plan", desc: "Deliver a detailed report with quick wins and long-term improvements ranked by impact." },
        { title: "Implementation Support", desc: "Help implement critical fixes and provide guidance for ongoing optimization." }
      ]
    };
    return processes[slug] || [];
  };

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
          <p className="mt-3 text-lg text-muted-foreground">{service.intro}</p>
        </div>

        {/* Key Features Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="group rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <p className="font-semibold text-primary group-hover:text-primary/90 transition-colors flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5" />
              What's Included
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {service.includes.map((item, index) => (
                <li 
                  key={item} 
                  className="flex gap-3 group-hover:text-foreground transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="group rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <p className="font-semibold text-primary group-hover:text-primary/90 transition-colors flex items-center gap-2 mb-4">
              <Star className="h-5 w-5" />
              Expected Outcomes
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {service.outcomes.map((item, index) => (
                <li 
                  key={item} 
                  className="flex gap-3 group-hover:text-foreground transition-colors duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Star className="mt-0.5 h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss how {service.title.toLowerCase()} can help your pet care business attract more clients and save time.
          </p>
          <CTAButtons className="justify-center" />
        </div>

        {/* How It Works Process */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {getServiceProcess(service.slug).map((step, index) => (
              <div key={step.title} className="text-center group">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-card/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose This Service?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Save Time</h3>
                <p className="text-sm text-muted-foreground">Focus on your pets while we handle the technical details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Local Expertise</h3>
                <p className="text-sm text-muted-foreground">We understand Northamptonshire pet care market</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Proven Results</h3>
                <p className="text-sm text-muted-foreground">Track record of helping pet businesses grow</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {getServiceFAQs(service.slug).length > 0 && (
          <div className="mt-16">
            <FAQList items={getServiceFAQs(service.slug)} />
          </div>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Services</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <Link 
                  key={relatedService.slug}
                  to={`/services/${relatedService.slug}`}
                  className="group block p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{relatedService.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{relatedService.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Ready to Transform Your Pet Care Business?</h2>
          <p className="text-muted-foreground mb-6">
            Book a free consultation to discuss your specific needs and goals.
          </p>
          <CTAButtons className="justify-center" />
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t text-sm">
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

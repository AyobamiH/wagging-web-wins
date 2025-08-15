import { FormEvent, useState, useRef } from "react";
import Seo from "@/components/Seo";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const services = formData.getAll('services') as string[];
    
    const messageData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || undefined,
      business: formData.get('business') as string || undefined,
      services: services.length > 0 ? services : undefined,
      postcode: formData.get('postcode') as string || undefined,
      message: formData.get('message') as string || undefined,
    };

    try {
      const { data, error } = await supabase.functions.invoke('submit-message', {
        body: messageData
      });

      if (error) throw error;

      toast.success("Thanks — we'll reply within one business day.");
      formRef.current?.reset();
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
  title="Contact Pet Web Designer in Northampton | Tail Wagging Websites"
  description="Book a free pet website consultation in Northampton. Request a quote for dog walkers, groomers, sitters & vets across Northamptonshire."
  path="/contact"
  keywords={[
    // Primary intent + locale
    "contact pet web designer northampton",
    "pet website consultation northampton",
    "northampton pet web design contact",
    "pet business website quote northampton",
    "book pet web design consultation",
    "request pet website quote",
    // Niche services
    "dog walker website consultation",
    "dog groomer website designer northampton",
    "pet sitter website designer northampton",
    "veterinary website design northampton",
    "dog daycare website design",
    "pet grooming website design",
    "vet practice website designer",
    "animal care website design",
    // Local discovery & service-area terms
    "pet web design agency northamptonshire",
    "northamptonshire pet web design",
    "local pet website developer",
    "pet website designer near me northampton",
    // Outcome/benefit terms (intent)
    "seo for pet businesses northampton",
    "responsive pet website design",
    "pet business branding and websites",
    "web design for dog walkers northampton",
    "pet website contact northampton"
  ]}
  breadcrumbs={[{ name: "Home", item: "/" }, { name: "Contact", item: "/contact" }]}
  jsonLd={[
    // Organization (referenced by other nodes)
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://tailwagginwebdesign.com/#org",
      "name": "Tail Wagging Websites Factory Northampton",
      "url": "https://tailwagginwebdesign.com/",
      "logo": "https://tailwagginwebdesign.com/og.png",
      "telephone": "+447402342694",
      "areaServed": ["Northamptonshire", "Northampton", "Wellingborough", "Kettering", "Daventry", "Towcester", "Rushden", "Corby", "Milton Keynes", "Banbury"],
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+447402342694",
        "contactType": "customer service",
        "availableLanguage": ["English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      }]
    },
    // Contact page
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://tailwagginwebdesign.com/contact#contact",
      "url": "https://tailwagginwebdesign.com/contact",
      "name": "Contact Pet Web Designer in Northampton",
      "inLanguage": "en-GB",
      "description": "Book a free pet website consultation or request a quote for dog walkers, groomers, sitters and vets across Northamptonshire.",
      "about": { "@id": "https://tailwagginwebdesign.com/#org" },
      "publisher": { "@id": "https://tailwagginwebdesign.com/#org" }
    },
    // Breadcrumbs
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwagginwebdesign.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://tailwagginwebdesign.com/contact" }
      ]
    },
    // FAQ (boosts long-tail; keep answers concise on page)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tailwagginwebdesign.com/contact#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a pet website cost in Northampton?",
          "acceptedAnswer": { "@type": "Answer", "text": "We start with a free consultation. Packages scale from Starter to Enterprise based on bookings, reviews, and automations." }
        },
        {
          "@type": "Question",
          "name": "Do you work with dog walkers, groomers and vets?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes—our niche is pet-care. We build for dog walkers, groomers, sitters and veterinary practices with local SEO included." }
        },
        {
          "@type": "Question",
          "name": "Can you audit my current site first?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We’ll run a quick performance and SEO audit and share clear next steps before any build." }
        }
      ]
    }
  ]}
/>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Contact a Pet Web Designer in Northampton</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Book a <strong>pet website consultation</strong> or request a <strong>pet business website quote</strong>. We build fast, SEO-ready sites for dog walkers, dog groomers, pet sitters, and vets across <strong>Northamptonshire</strong>.
        </p>
        
        <div className="mt-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Areas We Serve</h2>
          <p className="text-muted-foreground">
            Northampton, Wellingborough, Kettering, Daventry, Towcester, Rushden, Corby, Milton Keynes, Banbury.
          </p>
        </div>
        <form ref={formRef} onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2" aria-label="Contact form">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" name="name" required className="border border-border bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required className="border border-border bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
            <input id="phone" name="phone" inputMode="tel" className="border border-border bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="business" className="text-sm font-medium">Business Name</label>
            <input id="business" name="business" className="border border-border bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="services" className="text-sm font-medium">Services Offered</label>
            <select id="services" name="services" multiple className="border border-border bg-background rounded-md px-3 py-2 min-h-[3rem] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
              <option>Dog walking</option>
              <option>Grooming</option>
              <option>Pet sitting</option>
              <option>Training</option>
              <option>Daycare</option>
              <option>Clinic</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="postcode" className="text-sm font-medium">Postcode/Area</label>
            <input id="postcode" name="postcode" className="border border-border bg-background rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" name="message" rows={4} className="border border-border bg-background rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"></textarea>
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">We use your details only to respond to your enquiry. No spam. Ever.</p>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-primary text-white px-6 py-3 rounded-2xl font-medium shadow-glow hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <a href={CalendlyURL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">Book a Free 20-Minute Consult</Button>
            </a>
          </div>
        </form>
        <div className="mt-6 text-sm">
          Phone <a className="underline" href="tel:+447402342694">+44 7402 342694</a> • <a className="underline" href={CalendlyURL} target="_blank" rel="noopener noreferrer">Calendly</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-6 max-w-4xl">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">How much does a pet website cost in Northampton?</h3>
            <p className="text-muted-foreground">We start with a free consultation. Packages scale from Starter to Enterprise based on bookings, reviews, and automations.</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Do you work with dog walkers, groomers and vets?</h3>
            <p className="text-muted-foreground">Yes—our niche is pet-care. We build for dog walkers, groomers, sitters and veterinary practices with local SEO included.</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Can you audit my current site first?</h3>
            <p className="text-muted-foreground">Yes. We'll run a quick performance and SEO audit and share clear next steps before any build.</p>
          </div>
        </div>
      </section>
    </>
  );
}
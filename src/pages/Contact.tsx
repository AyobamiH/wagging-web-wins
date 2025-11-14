import { FormEvent, useState, useRef } from "react";
import { z } from "zod";
import Seo from "@/components/Seo";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import NorthamptonMap from "@/components/NorthamptonMap";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { trackContactSubmit, trackFAQToggle } from "@/lib/analytics";

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  phone: z.string().max(20, 'Phone number too long').optional(),
  business: z.string().max(100, 'Business name too long').optional(),
  services: z.array(z.string()).optional(),
  postcode: z.string().max(20, 'Postcode too long').optional(),
  message: z.string().max(5000, 'Message too long').optional(),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      business: formData.get("business") as string || undefined,
      services: formData.getAll("services") as string[],
      postcode: formData.get("postcode") as string || undefined,
      message: formData.get("message") as string || undefined,
    };

    // Validate on client side
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      toast.error("Validation Error", {
        description: validation.error.issues[0].message,
      });
      setIsSubmitting(false);
      return;
    }

    trackContactSubmit('contact', 'contact_page');

    try {
      const { error } = await supabase.functions.invoke("submit-message", {
        body: validation.data,
      });

      if (error) throw error;

      toast.success("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      });

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
  title="Contact Pet Web Designer in Northampton | Tail Wagging Websites"
  description="Book a free pet website consultation in Northampton. Request a quote for dog walkers, groomers, sitters & vets across Northamptonshire. View our service area map and contact details."
  path="/contact"
  keywords={[
    // Primary intent + locale
    "contact pet web designer northampton",
    "pet website consultation northampton",
    "northampton pet web design contact",
    "pet business website quote northampton", 
    "book pet web design consultation",
    "request pet website quote",
    "pet web design service area map",
    "northampton pet web design location",
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
      "@id": "https://tailwaggingwebdesign.com/#org",
      "name": "Tail Wagging Websites Factory Northampton",
      "url": "https://tailwaggingwebdesign.com/",
      "logo": "https://tailwaggingwebdesign.com/og.png",
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
      "@id": "https://tailwaggingwebdesign.com/contact#contact",
      "url": "https://tailwaggingwebdesign.com/contact",
      "name": "Contact Pet Web Designer in Northampton",
      "inLanguage": "en-GB",
      "description": "Book a free pet website consultation or request a quote for dog walkers, groomers, sitters and vets across Northamptonshire.",
      "about": { "@id": "https://tailwaggingwebdesign.com/#org" },
      "publisher": { "@id": "https://tailwaggingwebdesign.com/#org" }
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
      "@id": "https://tailwaggingwebdesign.com/contact#faq",
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
        
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Let's make your website your best employee.</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Tell us about your services, area, and goals — we'll reply within one business day.
          </p>
        </header>
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
              className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium shadow-glow hover:bg-primary/90 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <CalendlyEmbed
              buttonText="Book a Free 20-Minute Consult"
              buttonVariant="secondary"
              buttonSize="lg"
            />
          </div>
        </form>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="default" size="sm" asChild>
            <a href="tel:+447402342694">Call +44 7402 342694</a>
          </Button>
          <span className="text-sm text-muted-foreground">• Book online above</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-6 max-w-4xl">
          <details 
            className="border border-border rounded-lg p-6 group"
            onToggle={(e) => trackFAQToggle("How much does a pet website cost in Northampton?", "contact", e.currentTarget.open ? 'open' : 'close')}
          >
            <summary className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary transition-colors">
              How much does a pet website cost in Northampton?
            </summary>
            <p className="text-muted-foreground mt-2">We start with a free consultation. Packages scale from Starter to Enterprise based on bookings, reviews, and automations.</p>
          </details>
          <details 
            className="border border-border rounded-lg p-6 group"
            onToggle={(e) => trackFAQToggle("Do you work with dog walkers, groomers and vets?", "contact", e.currentTarget.open ? 'open' : 'close')}
          >
            <summary className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary transition-colors">
              Do you work with dog walkers, groomers and vets?
            </summary>
            <p className="text-muted-foreground mt-2">Yes—our niche is pet-care. We build for dog walkers, groomers, sitters and veterinary practices with local SEO included.</p>
          </details>
          <details 
            className="border border-border rounded-lg p-6 group"
            onToggle={(e) => trackFAQToggle("Can you audit my current site first?", "contact", e.currentTarget.open ? 'open' : 'close')}
          >
            <summary className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary transition-colors">
              Can you audit my current site first?
            </summary>
            <p className="text-muted-foreground mt-2">Yes. We'll run a quick performance and SEO audit and share clear next steps before any build.</p>
          </details>
        </div>
      </section>

      <NorthamptonMap />
    </>
  );
}
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
        title="Contact | Tail Wagging Websites"
        description="Tell us about your services, area and goals — we'll reply within one business day."
        path="/contact"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Contact", item: "/contact" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Let's make your website your best employee.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Tell us about your services, area, and goals — we'll reply within one business day.
        </p>
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
    </>
  );
}
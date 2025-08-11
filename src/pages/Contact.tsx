import { FormEvent } from "react";
import Seo from "@/components/Seo";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export default function Contact() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks — we’ll reply within one business day.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <>
      <Seo
        title="Contact | Tail Wagging Websites"
        description="Tell us about your services, area and goals — we’ll reply within one business day."
        path="/contact"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Contact", item: "/contact" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Let’s make your website your best employee.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Tell us about your services, area, and goals — we’ll reply within one business day.
        </p>
        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2" aria-label="Contact form">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required className="border rounded-md px-3 py-2" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="border rounded-md px-3 py-2" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" inputMode="tel" className="border rounded-md px-3 py-2" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="business">Business Name</label>
            <input id="business" name="business" className="border rounded-md px-3 py-2" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="services">Services Offered</label>
            <select id="services" name="services" multiple className="border rounded-md px-3 py-2 min-h-[3rem]">
              <option>Dog walking</option>
              <option>Grooming</option>
              <option>Pet sitting</option>
              <option>Training</option>
              <option>Daycare</option>
              <option>Clinic</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="postcode">Postcode/Area</label>
            <input id="postcode" name="postcode" className="border rounded-md px-3 py-2" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} className="border rounded-md px-3 py-2"></textarea>
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">We use your details only to respond to your enquiry. No spam. Ever.</p>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button type="submit" className="bg-gradient-primary text-white px-6 py-3 rounded-2xl font-medium shadow-glow hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Send Message
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

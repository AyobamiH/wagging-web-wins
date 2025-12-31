import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="font-medium">Tail Wagging Websites Design Factory Northampton</p>
          <p className="text-sm text-muted-foreground mt-2">
            Websites & automations that actually win pet care clients.
          </p>
          <Button variant="default" size="sm" asChild className="mt-2 w-fit">
            <a href="tel:+447402342694">Call +44 7402 342694</a>
          </Button>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2">
          <Link to="/services">Services</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/service-areas">Service Areas</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="text-sm text-muted-foreground">
          <p>© {year} Tail Wagging Websites Design Factory Northampton.</p>
          <p>Registered in England & Wales. Privacy & Cookies.</p>
          <div className="mt-2 flex gap-3">
            <a
              href="https://www.reddit.com/user/Advanced_Pudding9228/ "
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Reddit — Lovable Builders Hub"
              className="underline"
            >
              Reddit
            </a>

            <a
              href="https://www.linkedin.com/in/john-haastrup/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="LinkedIn — John Haastrup"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

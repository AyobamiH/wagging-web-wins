import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaTiktok, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="font-medium">Tail Wagging Websites Factory Northampton</p>
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
          <p>© {year} Tail Wagging Websites Factory Northampton.</p>
          <p>Registered in England & Wales. Privacy & Cookies.</p>
          {/* Social (icons, theme-matched indigo hover) */}
<nav aria-label="Social media" className="mt-2 flex items-center gap-3">
  <a
    href="https://www.tiktok.com/@tailwaggingwebdesigns"
    target="_blank"
    rel="me noopener noreferrer"
    aria-label="TikTok — Tail Wagging Websites Factory"
    title="TikTok"
    className="inline-flex h-9 w-9 items-center justify-center rounded-full
               text-muted-foreground/80 hover:text-indigo-300 hover:bg-indigo-500/10
               focus:outline-none focus:ring-2 focus:ring-indigo-400/50
               focus:ring-offset-2 focus:ring-offset-background transition-colors"
  >
    {/* TikTok brand (inline SVG) */}
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 8.5a6.5 6.5 0 0 1-5.1-2.56v8.02a5.96 5.96 0 1 1-5.96-5.96c.26 0 .51.02.76.06v2.43a3.53 3.53 0 1 0 3.53 3.53V3h2.36c.48 2.38 2.38 4.28 4.96 4.66v2.84Z"/>
    </svg>
    <span className="sr-only">TikTok</span>
  </a>

  <a
    href="https://www.instagram.com/tailwaggingwebdesigns/"
    target="_blank"
    rel="me noopener noreferrer"
    aria-label="Instagram — Tail Wagging Websites Factory"
    title="Instagram"
    className="inline-flex h-9 w-9 items-center justify-center rounded-full
               text-muted-foreground/80 hover:text-indigo-300 hover:bg-indigo-500/10
               focus:outline-none focus:ring-2 focus:ring-indigo-400/50
               focus:ring-offset-2 focus:ring-offset-background transition-colors"
  >
    {/* If imported: import { Instagram } from "lucide-react" */}
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16.5 7.5h.01" />
      <circle cx="12" cy="12" r="4" />
    </svg>
    <span className="sr-only">Instagram</span>
  </a>

  <a
    href="https://www.linkedin.com/in/john-haastrup/"
    target="_blank"
    rel="me noopener noreferrer"
    aria-label="LinkedIn — John Haastrup"
    title="LinkedIn"
    className="inline-flex h-9 w-9 items-center justify-center rounded-full
               text-muted-foreground/80 hover:text-indigo-300 hover:bg-indigo-500/10
               focus:outline-none focus:ring-2 focus:ring-indigo-400/50
               focus:ring-offset-2 focus:ring-offset-background transition-colors"
  >
    {/* If imported: import { Linkedin } from "lucide-react" */}
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7 0h3.84v1.98h.05c.54-1.02 1.87-2.1 3.85-2.1 4.11 0 4.87 2.7 4.87 6.22V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.17 0-2.5 1.69-2.5 3.43V23h-4V8.5z"/>
    </svg>
    <span className="sr-only">LinkedIn</span>
  </a>
</nav>


        </div>
      </div>
    </footer>
  );
}

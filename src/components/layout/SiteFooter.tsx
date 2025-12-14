import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold transition-all duration-200 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm flex items-center gap-2 font-semibold tracking-tight text-foreground"
          aria-label="Tail Wagging Websites Design Factory Northampton - Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-8 w-8">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="nebularNight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="40%" stopColor="hsl(var(--accent))" />
                <stop offset="75%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </radialGradient>
            </defs>
            <g filter="url(#glow)" fill="url(#nebularNight)" stroke="hsl(var(--accent))" strokeWidth={3}>
              <ellipse cx="100" cy="130" rx="40" ry="35" />
              <circle cx="60" cy="70" r="20" />
              <circle cx="100" cy="50" r="20" />
              <circle cx="140" cy="70" r="20" />
            </g>
          </svg>
          <span className="hidden sm:inline">Tail Wagging Websites Design Factory Northampton</span>
        </Link>
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
              href="https://www.tiktok.com/@tailwaggingwebdesigns"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="TikTok — Tail Wagging Websites Factory"
              className="underline"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/tailwaggingwebdesigns/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Instagram — Tail Wagging Websites Factory"
              className="underline"
            >
              Instagram
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

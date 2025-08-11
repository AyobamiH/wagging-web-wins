import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CalendlyURL = "https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header role="banner" className="border-b bg-background/80 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link
  to="/"
  className="flex items-center gap-2 font-semibold tracking-tight"
  aria-label="Go to home"
>
  {/* Neon Paw SVG */}
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 200 200"
  className="h-8 w-8"
>
  <defs>
 
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur1" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>


    <radialGradient id="nebularNight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3a0ca3" /> 
      <stop offset="40%" stop-color="#7209b7" />
      <stop offset="75%" stop-color="#4361ee" /> 
      <stop offset="100%" stop-color="#4cc9f0" /> 
    </radialGradient>
  </defs>


  <g filter="url(#glow)" fill="url(#nebularNight)" stroke="#4cc9f0" stroke-width="3">
    <ellipse cx="100" cy="130" rx="40" ry="35" />
    <circle cx="60" cy="70" r="20" />
    <circle cx="100" cy="50" r="20" />
    <circle cx="140" cy="70" r="20" />
  </g>
</svg>


  <span>Tail Wagging Websites Factory</span>
</Link>

        
        <button
          className="sm:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav id="primary-nav" aria-label="Primary" className="hidden sm:flex items-center gap-6">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `text-sm ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n.label}
            </NavLink>
          ))}
          <a href={CalendlyURL} target="_blank" rel="noopener noreferrer">
            <Button size="sm">Book a Consultation</Button>
          </a>
        </nav>
      </div>
      {open && (
        <div className="sm:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1">
                {n.label}
              </NavLink>
            ))}
            <a href={CalendlyURL} target="_blank" rel="noopener noreferrer" className="py-1">
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

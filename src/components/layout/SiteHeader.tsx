import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CalendlyEmbed from "../CalendlyEmbed";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/services", label: "Services" },
    { to: "/tools", label: "Tools" },
    { to: "/blog", label: "Blog" },
    { to: "/why-do-dogs", label: "Why Do Dogs…?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/service-areas", label: "Service Areas" },
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
      <stop offset="0%" stopColor="#3a0ca3" /> 
      <stop offset="40%" stopColor="#7209b7" />
      <stop offset="75%" stopColor="#4361ee" /> 
      <stop offset="100%" stopColor="#4cc9f0" /> 
    </radialGradient>
  </defs>


  <g filter="url(#glow)" fill="url(#nebularNight)" stroke="#4cc9f0" strokeWidth={3}>
    <ellipse cx="100" cy="130" rx="40" ry="35" />
    <circle cx="60" cy="70" r="20" />
    <circle cx="100" cy="50" r="20" />
    <circle cx="140" cy="70" r="20" />
  </g>
</svg>


  
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
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n.label}
            </NavLink>
          ))}
          <CalendlyEmbed
            buttonText="Book a Consultation"  
            buttonSize="sm"
            className="bg-gradient-primary hover:scale-105 transition-all duration-200"
          />
        </nav>
      </div>
      {open && (
        <div className="sm:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
            {navItems.map((n) => (
              <NavLink 
                key={n.to} 
                to={n.to} 
                onClick={() => setOpen(false)} 
                className={({ isActive }) => `py-2 px-3 rounded-md font-medium transition-colors ${isActive ? "text-primary " : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
              >
                {n.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t">
              <CalendlyEmbed
                buttonText="Book a Consultation"
                className="w-full bg-gradient-primary hover:scale-105 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

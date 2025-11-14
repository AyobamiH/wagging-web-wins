import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import CalendlyEmbed from "../CalendlyEmbed";
import { cn } from "@/lib/utils";

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavItems = [
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
    { to: "/blog", label: "Blog" },
    
  ];

  const moreNavItems = [
    { to: "/why-do-dogs", label: "Why Do Dogs…?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/tools", label: "Tools" },
    { to: "/service-areas", label: "Service Areas" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-card/98 backdrop-blur-md border-b border-primary/30 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.3)]" 
          : "bg-card/60 backdrop-blur-sm border-b border-border/40"
      )}
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold transition-all duration-200 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm flex items-center gap-2 font-semibold tracking-tight text-foreground"
            aria-label="Tail Wagging Websites - Home"
          >
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
            <span className="hidden sm:inline">Tail Wagging Websites Factory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {primaryNavItems.map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground font-medium">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-48 gap-3 p-4">
                      {moreNavItems.map((item) => (
                        <NavigationMenuLink key={item.to} asChild>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive ? "text-primary bg-accent/50" : "text-muted-foreground"
                              )
                            }
                          >
                            {item.label}
                          </NavLink>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <CalendlyEmbed
              buttonText="Book a Call"
              buttonSize="sm"
              className="bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-lg"
            />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link
                      to="/"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        className="h-6 w-6"
                      >
                        <defs>
                          <radialGradient id="mobileLogo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--accent))" />
                          </radialGradient>
                        </defs>
                        <g fill="url(#mobileLogo)">
                          <ellipse cx="100" cy="130" rx="40" ry="35" />
                          <circle cx="60" cy="70" r="20" />
                          <circle cx="100" cy="50" r="20" />
                          <circle cx="140" cy="70" r="20" />
                        </g>
                      </svg>
                      <span>Tail Wagging</span>
                    </Link>
                  </div>

                  <nav className="flex-1 py-6">
                    <div className="space-y-1">
                      <div className="pb-2 mb-4 border-b">
                        <p className="text-sm font-medium text-muted-foreground px-3 pb-2">
                          Main Navigation
                        </p>
                        {primaryNavItems.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                  ? "text-primary bg-primary/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )
                            }
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground px-3 pb-2">
                          More
                        </p>
                        {moreNavItems.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                  ? "text-primary bg-primary/10"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )
                            }
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </nav>

                  <div className="pt-4 border-t">
                    <CalendlyEmbed
                      buttonText="Book a Call"
                      className="w-full bg-gradient-primary hover:scale-105 transition-all duration-200"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
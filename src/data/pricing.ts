// src/data/pricing.ts
export type Package = {
  id: "starter" | "pro" | "growth" | string;
  name: string;
  price: string;       // display price, e.g. "£750"
  priceValue: number;  // numeric, e.g. 750 (used by Stripe/BuyPlanButton)
  desc: string;
  features: string[];
  popular?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: "£750",
    priceValue: 750,
    desc:
      "For new pet care businesses. One-page or simple multi-section site, basic SEO, contact form, GBP setup.",
    features: [
      "One-page responsive website",
      "Basic SEO optimization",
      "Contact form integration",
      "Google Business Profile setup",
      "Mobile-friendly design",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "£1,950",
    priceValue: 1950,
    desc:
      "Multi-page site with services, pricing, reviews, blog, local SEO, simple automations.",
    features: [
      "Multi-page website",
      "Services & pricing pages",
      "Review system integration",
      "Blog functionality",
      "Local SEO optimization",
      "Simple automations",
    ],
    popular: true,
  },
  {
    id: "growth",
    name: "Growth",
    price: "£3,500",
    priceValue: 3500,
    desc:
      "Everything in Pro plus advanced automations, content plan, and conversion experiments.",
    features: [
      "Everything in Pro",
      "Advanced automations",
      "Content marketing plan",
      "Conversion optimization",
      "A/B testing setup",
      "Priority support",
    ],
  },
];

export const getPackageById = (id: string) =>
  PACKAGES.find((p) => p.id === id) || null;

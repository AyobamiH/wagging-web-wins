// src/data/services.ts
export const BASE_URL = "https://tailwaggingwebdesign.com";

export const SERVICE_AREA = [
    { name: "Northampton", slug: "northampton" },
    { name: "Wellingborough", slug: "wellingborough" },
    { name: "Kettering", slug: "kettering" },
    { name: "Daventry", slug: "daventry" },
    { name: "Towcester", slug: "towcester" },
    { name: "Rushden", slug: "rushden" },
    { name: "Corby", slug: "corby" },
    { name: "Milton Keynes", slug: "milton-keynes" },
    { name: "Banbury", slug: "banbury" },
    { name: "Northamptonshire", slug: "northamptonshire" }
  ]; as const;

export const SLUGS = [
  "website-design",
  "local-seo",
  "automations",
  "care-plans",
  "speed-ux-audits",
] as const;

export type Slug = (typeof SLUGS)[number];

export type Service = {
  slug: Slug;
  title: string;
  desc: string;  // card summary
  intro: string; // detail page intro paragraph
  includes: string[];
  outcomes: string[];
  ogImage?: string; // optional per-page share image
};

export const SERVICES: Record<Slug, Service> = {
  "website-design": {
    slug: "website-design",
    title: "Website Design & Rebuilds",
    desc: "Clean, mobile-first sites that convert visitors into bookings.",
    intro:
      "We create mobile-first pet care websites that convert browsers into bookings. Every site includes clear service descriptions, upfront pricing displays, and simple booking flows that qualify leads before they contact you. Built for Google's Core Web Vitals and optimized for pet parents in Northampton who search on mobile devices. Perfect for dog walkers, groomers, and pet sitters who want to look professional and reduce time-waster inquiries.",
    includes: [
      "Clear service pages with upfront pricing blocks",
      "Conversion-first booking flow (Calendly/CTA placement)",
      "Core Web Vitals optimisation (LCP/INP/CLS) and caching/CDN",
      "SEO basics: schema, OG tags, sensible IA & internal linking",
      "Accessibility essentials (labels, contrast, focus states)",
      "Analytics + consent banner wired correctly",
    ],
    outcomes: [
      "More qualified enquiries from mobile visitors",
      "Higher conversion rates from clearer booking paths",
      "Fewer time-waster messages and back-and-forth",
      "Faster pages → better rankings and user satisfaction",
    ],
  },

  "local-seo": {
    slug: "local-seo",
    title: "Local SEO & Content Strategy",
    desc: "Be found in 'near me' searches with trustworthy, useful content.",
    intro:
      `Dominate local search results for "dog walker near me" and "pet groomer Northampton" searches. We optimize your Google Business Profile, create location-specific content, and build local citations that help you outrank competitors in Kettering, Wellingborough, and surrounding areas. Includes regular content updates, review management strategies, and local keyword optimization that brings qualified pet parents to your door.`,
    includes: [
      "Google Business Profile optimisation (categories, services, photos, posts)",
      "On-page SEO (titles, meta, headings, internal linking, schema)",
      "Location & service pages with natural, non-spammy copy",
      "Citation building & NAP consistency across directories",
      "Light content plan: 4–8 posts answering owner questions",
      "Review acquisition framework + UTM tracking for GBP",
    ],
    outcomes: [
      `Improved visibility for “{service} near me” and town queries`,
      "More calls, website visits, and direction requests from GBP",
      "Higher quality organic traffic that’s ready to book",
      "Compounding local authority across Northamptonshire",
    ],
  },

  automations: {
    slug: "automations",
    title: "Smart Automations & CRM Integration",
    desc: "Cut admin with forms → Sheets/CRM, reminders, and smart follow-ups.",
    intro:
      "Cut your admin time in half with intelligent workflows that handle booking confirmations, payment reminders, and follow-up sequences automatically. We connect your forms to Google Sheets, CRM systems, or email platforms, ensuring no inquiry gets missed. Popular with busy pet care professionals across Northamptonshire who want to focus on animals, not paperwork. Includes SMS/email automation, review request sequences, and lead nurturing campaigns.",
    includes: [
      "Forms → Sheets/CRM routing with dedupe & notifications",
      "Booking confirmations, reminders, and follow-ups (SMS/email)",
      "Review request sequences after completed services",
      "Lead nurturing pipelines with tags/stages",
      "Zapier/n8n webhooks + WhatsApp/Email integrations",
      "Simple dashboards for status and workload",
    ],
    outcomes: [
      "Hours saved each week on admin and chasing",
      "Fewer no-shows and faster response times",
      "Higher review volume and repeat bookings",
      "A reliable pipeline from enquiry → client",
    ],
  },

  "care-plans": {
    slug: "care-plans",
    title: "Website Care Plans",
    desc: "Keep your site fast, secure, and updated monthly.",
    intro:
      "Keep your website fast, secure and stress-free with a simple monthly plan. We handle updates, backups and security so nothing breaks before a busy weekend of bookings. Each month you’ll get a short report with traffic highlights, Core Web Vitals, and any fixes we’ve shipped. Need a small change—new prices, a promo banner, a gallery update? Send it over and it’s done.",
    includes: [
      "Managed updates (core/plugins), uptime & security monitoring",
      "Automated off-site backups with tested restores",
      "Minor content edits (prices, images, copy tweaks)",
      "Monthly performance & SEO health check (LCP/INP/CLS, metadata)",
      "Broken-link scans and fix list",
      "Priority support with same-day acknowledgement",
    ],
    outcomes: [
      "Consistently fast, secure site that’s ready for bookings",
      "No last-minute breakages before busy periods",
      "Clear visibility of improvements each month",
    ],
  },

  "speed-ux-audits": {
    slug: "speed-ux-audits",
    title: "Speed & UX Audits",
    desc: "Fix the issues slowing down visitors and Google.",
    intro:
      "A focused audit that shows exactly what’s slowing down conversions—and how to fix it. We combine lab tests (Lighthouse/PageSpeed) with field data (Core Web Vitals) and a quick journey review (“Book Meet & Greet”, “Call now”, “View prices”). You’ll get a prioritised action plan by impact and effort, plus quick wins we can implement immediately.",
    includes: [
      "Core Web Vitals analysis (LCP/INP/CLS) with before/after targets",
      "Image, font and script optimisation plan (compression, lazy-load, preloads, bundling)",
      "UX friction review (navigation, CTAs, forms, trust signals)",
      "Accessibility spot-check (contrast, focus states, labels)",
      "Competitor speed benchmark (local peers)",
      "14-day implementation roadmap with owner/dev tasks",
    ],
    outcomes: [
      "Faster pages that rank and convert better on mobile",
      "Reduced drop-offs in booking/quote forms",
      "A clear, actionable fix list your team can ship",
    ],
  },
};

// Helpers
export const getService = (slug?: string | null) =>
  (slug && SERVICES[slug as Slug]) || null;

export const getAllServicePaths = () =>
  SLUGS.map((s) => `/services/${s}`);

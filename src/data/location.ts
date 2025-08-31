// src/data/locations.ts
export type LocationInfo = {
  slug: string;
  name: string;
  county: string;
  description: string;
  benefits: string[];
  nearby: string[];
  lat?: number;
  lng?: number;
};


export const LOCATIONS_BY_SLUG: Record<string, LocationInfo> = {
  "northampton": {
    slug: "northampton",
    name: "Northampton",
    county: "Northamptonshire",
    description:
      "Our home base in Northampton means we understand local pet care businesses and what pet parents in the area are looking for.",
    benefits: [
      "Local knowledge of Northampton pet market",
      "Fast response times for meetings",
      "Understanding of local competition",
      "Knowledge of area demographics",
    ],
    nearby: ["Wootton", "Kingsthorpe", "Duston", "Hardingstone"],
    lat: 52.2405,
    lng: -0.9027,
  },
  "wellingborough": {
    slug: "wellingborough",
    name: "Wellingborough",
    county: "Northamptonshire",
    description:
      "Serving pet care businesses in Wellingborough with websites that connect with local pet parents and drive bookings.",
    benefits: [
      "Local SEO for Wellingborough searches",
      "Understanding of local pet care market",
      "Quick support and meetings",
      "Knowledge of area competition",
    ],
    nearby: ["Irchester", "Finedon", "Bozeat", "Earls Barton"],
  },
  "kettering": {
    slug: "kettering",
    name: "Kettering",
    county: "Northamptonshire",
    description:
      "Professional pet care websites for Kettering businesses, designed to attract local pet parents and increase bookings.",
    benefits: [
      "Kettering-specific local SEO",
      "Local market knowledge",
      "Fast project turnaround",
      "Regular check-ins available",
    ],
    nearby: ["Burton Latimer", "Desborough", "Rothwell", "Warkton"],
  },
  "daventry": {
    slug: "daventry",
    name: "Daventry",
    county: "Northamptonshire",
    description:
      "Helping Daventry pet care businesses build professional websites that convert local searches into bookings.",
    benefits: [
      "Daventry local search optimization",
      "Understanding rural/urban mix",
      "Competitive pricing for area",
      "Local business networking",
    ],
    nearby: ["Long Buckby", "Weedon", "Flore", "Kilsby"],
  },
  "towcester": {
    slug: "towcester",
    name: "Towcester",
    county: "Northamptonshire",
    description:
      "Pet care web design services for Towcester businesses, combining local knowledge with digital expertise.",
    benefits: [
      "Towcester-focused content strategy",
      "Local competition analysis",
      "Historic town charm reflected in design",
      "Racing heritage market understanding",
    ],
    nearby: ["Silverstone", "Brackley", "Whitfield", "Blakesley"],
  },
  "rushden": {
    slug: "rushden",
    name: "Rushden",
    county: "Northamptonshire",
    description:
      "Modern pet care websites for Rushden businesses that attract local pet parents and drive growth.",
    benefits: [
      "Rushden local SEO expertise",
      "Understanding of commuter demographic",
      "Retail heritage in design approach",
      "East Northants market knowledge",
    ],
    nearby: ["Higham Ferrers", "Irthlingborough", "Chelveston", "Newton Bromswold"],
  },
  "corby": {
    slug: "corby",
    name: "Corby",
    county: "Northamptonshire",
    description:
      "Professional web design for Corby pet care businesses, built to connect with the local community.",
    benefits: [
      "Corby-specific market insights",
      "New town demographic understanding",
      "Scottish heritage consideration",
      "Young family market focus",
    ],
    nearby: ["Cottingham", "Rockingham", "Stanion", "Weldon"],
  },
  "milton-keynes": {
    slug: "milton-keynes",
    name: "Milton Keynes",
    county: "Buckinghamshire",
    description:
      "Serving Milton Keynes pet care businesses with cutting-edge websites and local SEO strategies.",
    benefits: [
      "Milton Keynes new city expertise",
      "Tech-savvy demographic understanding",
      "Large catchment area strategy",
      "Modern business approach",
    ],
    nearby: ["Bletchley", "Wolverton", "Stony Stratford", "Newport Pagnell"],
  },
  "banbury": {
    slug: "banbury",
    name: "Banbury",
    county: "Oxfordshire",
    description:
      "Pet care web design for Banbury businesses, combining traditional values with modern digital marketing.",
    benefits: [
      "Banbury Cross heritage marketing",
      "Market town approach",
      "Oxfordshire border expertise",
      "Historic charm in modern design",
    ],
    nearby: ["Brackley", "Chipping Norton", "Deddington", "Hook Norton"],
  },
  "northamptonshire": {
    slug: "northamptonshire",
    name: "Northamptonshire",
    county: "Northamptonshire",
    description:
      "County-wide pet care web design services across Northamptonshire, from market towns to villages.",
    benefits: [
      "Complete county coverage",
      "Rural and urban expertise",
      "Market town specialization",
      "Village business understanding",
    ],
    nearby: ["All towns and villages", "Complete county coverage", "Rural areas included", "Historic locations"],
  },
};

export const LOCATION_SLUGS = Object.keys(LOCATIONS_BY_SLUG) as Array<keyof typeof LOCATIONS_BY_SLUG>;
export const LOCATIONS = LOCATION_SLUGS.map((s) => LOCATIONS_BY_SLUG[s]);
export const getLocation = (slug?: string | null) => (slug ? LOCATIONS_BY_SLUG[slug] ?? null : null);

// (Optional) If you want to keep SERVICE_AREA in one place for other imports:
export const SERVICE_AREA = LOCATIONS.map((l) => ({ name: l.name, slug: l.slug })) as const;
export const SERVICE_AREA_NAMES = SERVICE_AREA.map((a) => a.name) as readonly string[];

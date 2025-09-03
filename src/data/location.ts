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
export const SERVICE_AREA = LOCATIONS.map((l) => ({ name: l.name, slug: l.slug }));
export const SERVICE_AREA_NAMES = SERVICE_AREA.map((a) => a.name) as readonly string[];

/* --------------------------------------------------------------------------------
   Service-area summary data (your local list) + normalized export for UI pages
---------------------------------------------------------------------------------*/

// Your original list (left intact)
const serviceAreas = [
  {
    area: "Northampton",
    description:
      "Our main base of operations, serving the town center and surrounding villages.",
    postcodes: ["NN1", "NN2", "NN3", "NN4", "NN5"],
  },
  {
    area: "Wellingborough",
    description:
      "Comprehensive pet website services for businesses in Wellingborough and nearby areas.",
    postcodes: ["NN8", "NN9", "NN29"],
  },
  {
    area: "Kettering",
    description:
      "Professional web design for pet care businesses across Kettering and surrounding villages.",
    postcodes: ["NN14", "NN15", "NN16"],
  },
  {
    area: "Daventry",
    description:
      "Expert website design and SEO services for pet businesses in Daventry area.",
    postcodes: ["NN11"],
  },
  {
    area: "Towcester",
    description:
      "Local web design expertise for pet care providers in Towcester and surrounding area.",
    postcodes: ["NN12"],
  },
  {
    area: "Rushden",
    description:
      "Specialized pet business websites for Rushden and the local community.",
    postcodes: ["NN10"],
  },
  {
    area: "Corby",
    description:
      "Professional web design services for pet care businesses throughout Corby.",
    postcodes: ["NN17", "NN18"],
  },
  {
    area: "Milton Keynes",
    description:
      "Extended service area covering Milton Keynes for larger pet care operations.",
    postcodes: ["MK1-MK19"],
  },
  {
    area: "Banbury",
    description:
      "Cross-county service extension to Banbury for established pet care businesses.",
    postcodes: ["OX15", "OX16", "OX17"],
  },
];

// Map display names to your canonical slugs
const NAME_TO_SLUG: Record<string, keyof typeof LOCATIONS_BY_SLUG> = {
  Northampton: "northampton",
  Wellingborough: "wellingborough",
  Kettering: "kettering",
  Daventry: "daventry",
  Towcester: "towcester",
  Rushden: "rushden",
  Corby: "corby",
  "Milton Keynes": "milton-keynes",
  Banbury: "banbury",
};

export type ServiceAreaSummary = {
  slug: string;
  name: string;
  county?: string;
  description: string;
  postcodes: string[];
};

// Normalized + enriched summary the UI can rely on
export const SERVICE_AREAS_SUMMARY: ServiceAreaSummary[] = serviceAreas
  .map((a) => {
    const slug = NAME_TO_SLUG[a.area];
    const base = LOCATIONS_BY_SLUG[slug];

    if (!base) return null;

    return {
      slug,
      name: base.name, // ensure capitalization matches your canonical data
      county: base.county,
      // prefer the local summary description you provided; fallback to base
      description: a.description || base.description,
      postcodes: a.postcodes || [],
    };
  })
  .filter((v): v is ServiceAreaSummary => Boolean(v));
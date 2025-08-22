export type SEO = {
  url: string; title: string; description: string; image: string;
  type?: "website" | "article";
  hreflang?: { lang: string; href: string }[];
  breadcrumb?: { name: string; url: string }[];
};

const IMG = (name: string) => `https://tailwaggingwebdesign.com/og/${name}.jpg`;
const BASE = "https://tailwaggingwebdesign.com";

export const whyDogsSEO: Record<string, SEO> = {
  "/why-do-dogs/": {
    url: `${BASE}/why-do-dogs/`,
    title: "Why Do Dogs…? Plain-English Guides to Dog Behaviour",
    description: "Quick answers to the most-asked dog questions—what’s normal, when to worry, and what to do next.",
    image: IMG("why-dogs"),
    type: "website",
    hreflang: [
      { lang: "en-GB", href: `${BASE}/why-do-dogs/` },
      { lang: "x-default", href: `${BASE}/why-do-dogs/` },
    ],
    breadcrumb: [
      { name: "Home", url: `${BASE}/` },
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
    ],
  },

  // Licking & Affection
  "/why-do-dogs/lick-people/": {
    url: `${BASE}/why-do-dogs/lick-people/`,
    title: "Why Do Dogs Lick People? What It Means",
    description: "From affection to habit—understand dog licking and when to worry, with calm, kind fixes.",
    image: IMG("why-dogs-lick"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Lick people", url: `${BASE}/why-do-dogs/lick-people/` },
    ],
  },
  "/why-do-dogs/lick-after-shower/": {
    url: `${BASE}/why-do-dogs/lick-after-shower/`,
    title: "Why Does My Dog Lick Me After I Shower?",
    description: "Post-shower licking explained: scent, taste and bonding—plus simple ways to reduce it.",
    image: IMG("why-dogs-lick-after-shower"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Lick after shower", url: `${BASE}/why-do-dogs/lick-after-shower/` },
    ],
  },
  "/why-do-dogs/licking-problem/": {
    url: `${BASE}/why-do-dogs/licking-problem/`,
    title: "Excessive Licking in Dogs: Causes & Relief",
    description: "When licking signals a health or behaviour issue—triage steps, home care and vet red flags.",
    image: IMG("why-dogs-licking-problem"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Licking problem", url: `${BASE}/why-do-dogs/licking-problem/` },
    ],
  },

  // Eating & Health
  "/why-do-dogs/eat-grass/": {
    url: `${BASE}/why-do-dogs/eat-grass/`,
    title: "Why Do Dogs Eat Grass?",
    description: "Normal reasons dogs graze and when to call your vet—plus safe ways to redirect the habit.",
    image: IMG("why-dogs-eat-grass"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Eat grass", url: `${BASE}/why-do-dogs/eat-grass/` },
    ],
  },
  "/why-do-dogs/eat-poop/": {
    url: `${BASE}/why-do-dogs/eat-poop/`,
    title: "Why Do Dogs Eat Poop? How to Stop It",
    description: "Coprophagia explained—medical rule-outs, training that works, and prevention for UK owners.",
    image: IMG("why-dogs-eat-poop"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Eat poop", url: `${BASE}/why-do-dogs/eat-poop/` },
    ],
  },
  "/why-do-dogs/drooling-or-nibbling/": {
    url: `${BASE}/why-do-dogs/drooling-or-nibbling/`,
    title: "Excessive Drooling or Nibbling in Dogs",
    description: "Normal vs not-normal drool and ‘cobbing’—calm triage, causes and when to see your vet.",
    image: IMG("why-dogs-drooling"),
    type: "article",
    breadcrumb: [
      { name: "Why Do Dogs…?", url: `${BASE}/why-do-dogs/` },
      { name: "Drooling/nibbling", url: `${BASE}/why-do-dogs/drooling-or-nibbling/` },
    ],
  },

  // Movement & Body Language
  "/why-do-dogs/shake-or-shiver/": {
    url: `${BASE}/why-do-dogs/shake-or-shiver/`,
    title: "Dog Shaking or Shivering: What It Means",
    description: "From excitement to pain—how to tell the difference and what to do next.",
    image: IMG("why-dogs-shake"),
    type: "article",
  },
  "/why-do-dogs/scoot/": {
    url: `${BASE}/why-do-dogs/scoot/`,
    title: "Why Do Dogs Scoot on the Carpet?",
    description: "Anal glands and other causes of scooting—what to do, what to avoid, and vet red flags.",
    image: IMG("why-dogs-scoot"),
    type: "article",
  },
  "/why-do-dogs/follow-to-bathroom/": {
    url: `${BASE}/why-do-dogs/follow-to-bathroom/`,
    title: "Why Does My Dog Follow Me to the Bathroom?",
    description: "Velcro dogs explained—bonding, curiosity, anxiety and how to encourage independence.",
    image: IMG("why-dogs-follow-bathroom"),
    type: "article",
  },

  // Sounds & Communication
  "/why-do-dogs/howl/": {
    url: `${BASE}/why-do-dogs/howl/`,
    title: "Why Do Dogs Howl? Sirens, Night & Myths",
    description: "Communication and ancestry—plus kind training to reduce nuisance howling.",
    image: IMG("why-dogs-howl"),
    type: "article",
  },
  "/why-do-dogs/bark-at-nothing-or-postie/": {
    url: `${BASE}/why-do-dogs/bark-at-nothing-or-postie/`,
    title: "Why Do Dogs Bark at ‘Nothing’ (or the Postie)?",
    description: "Real triggers you can’t see—practical fixes that work without harsh methods.",
    image: IMG("why-dogs-bark"),
    type: "article",
  },
  "/why-do-dogs/pant-a-lot/": {
    url: `${BASE}/why-do-dogs/pant-a-lot/`,
    title: "Why Is My Dog Panting So Much?",
    description: "Normal cooling vs health warning—quick checks and when to call the vet.",
    image: IMG("why-dogs-pant"),
    type: "article",
  },

  // Behaviour Quirks
  "/why-do-dogs/dig/": {
    url: `${BASE}/why-do-dogs/dig/`,
    title: "Why Do Dogs Dig? Save Your Garden & Sofa",
    description: "Instincts, boredom and easy ways to redirect digging—without conflict.",
    image: IMG("why-dogs-dig"),
    type: "article",
  },
  "/why-do-dogs/hump/": {
    url: `${BASE}/why-do-dogs/hump/`,
    title: "Why Do Dogs Hump? Normal vs Problem",
    description: "Mounting explained—when to ignore and when to train or see your vet.",
    image: IMG("why-dogs-hump"),
    type: "article",
  },
  "/why-do-dogs/stare/": {
    url: `${BASE}/why-do-dogs/stare/`,
    title: "Why Does My Dog Stare at Me?",
    description: "Eye contact, cues and bonding—and when a stare is a warning.",
    image: IMG("why-dogs-stare"),
    type: "article",
  },
};

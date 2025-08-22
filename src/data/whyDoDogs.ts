// Central list of guides used by the pillar page.
// You can later generate article pages from this same data.
export type ClusterKey =
  | "Licking & Affection"
  | "Eating & Health"
  | "Movement & Body Language"
  | "Sounds & Communication"
  | "Behaviour Quirks";

export interface GuideItem {
  cluster: ClusterKey;
  title: string;
  slug: string;            // absolute path from the CSV plan
  metaTitle: string;
  metaDescription: string;
}

export const WHY_DOGS_PILLAR_URL = "/why-do-dogs/";

export const guides: GuideItem[] = [
  // Licking & Affection
  {
    cluster: "Licking & Affection",
    title: "Why do dogs lick people?",
    slug: "/why-do-dogs/lick-people/",
    metaTitle: "Why Do Dogs Lick People? What It Means",
    metaDescription: "From affection to habit — understand dog licking and when to worry.",
  },
  {
    cluster: "Licking & Affection",
    title: "Why does my dog lick me after I shower?",
    slug: "/why-do-dogs/lick-after-shower/",
    metaTitle: "Why Does My Dog Lick Me After I Shower?",
    metaDescription: "Post-shower licking explained, hygiene tips and when to intervene.",
  },
  {
    cluster: "Licking & Affection",
    title: "When is licking a problem?",
    slug: "/why-do-dogs/licking-problem/",
    metaTitle: "Excessive Licking in Dogs: Causes & Relief",
    metaDescription: "When licking signals a health or behaviour issue — and how to help.",
  },

  // Eating & Health
  {
    cluster: "Eating & Health",
    title: "Why do dogs eat grass?",
    slug: "/why-do-dogs/eat-grass/",
    metaTitle: "Why Do Dogs Eat Grass?",
    metaDescription: "Common reasons dogs graze on grass — and when to call the vet.",
  },
  {
    cluster: "Eating & Health",
    title: "Why do dogs eat poop (coprophagia)?",
    slug: "/why-do-dogs/eat-poop/",
    metaTitle: "Why Do Dogs Eat Poop? How to Stop It",
    metaDescription: "Coprophagia causes, training fixes and prevention for UK owners.",
  },
  {
    cluster: "Eating & Health",
    title: "Why is my dog drooling or nibbling things?",
    slug: "/why-do-dogs/drooling-or-nibbling/",
    metaTitle: "Excessive Drooling or Nibbling in Dogs",
    metaDescription: "Normal vs not-normal drooling and ‘cobbing’, plus vet red flags.",
  },

  // Movement & Body Language
  {
    cluster: "Movement & Body Language",
    title: "Why is my dog shaking/shivering?",
    slug: "/why-do-dogs/shake-or-shiver/",
    metaTitle: "Dog Shaking or Shivering: What It Means",
    metaDescription: "From excitement to pain — a calm triage guide for owners.",
  },
  {
    cluster: "Movement & Body Language",
    title: "Why do dogs scoot on the carpet?",
    slug: "/why-do-dogs/scoot/",
    metaTitle: "Why Do Dogs Scoot on the Carpet?",
    metaDescription: "Anal glands and other causes of scooting — what to do next.",
  },
  {
    cluster: "Movement & Body Language",
    title: "Why does my dog follow me to the bathroom?",
    slug: "/why-do-dogs/follow-to-bathroom/",
    metaTitle: "Why Does My Dog Follow Me to the Bathroom?",
    metaDescription: "Velcro dogs explained — affection, curiosity or anxiety.",
  },

  // Sounds & Communication
  {
    cluster: "Sounds & Communication",
    title: "Why do dogs howl (sirens / night / moon)?",
    slug: "/why-do-dogs/howl/",
    metaTitle: "Why Do Dogs Howl? Sirens, Night & Myths",
    metaDescription: "Communication, triggers and kind training to reduce nuisance howling.",
  },
  {
    cluster: "Sounds & Communication",
    title: "Why do dogs bark at nothing / the postie?",
    slug: "/why-do-dogs/bark-at-nothing-or-postie/",
    metaTitle: "Why Do Dogs Bark at ‘Nothing’ (or the Postie)?",
    metaDescription: "Real triggers you can’t see + practical fixes that work.",
  },
  {
    cluster: "Sounds & Communication",
    title: "Why is my dog panting so much?",
    slug: "/why-do-dogs/pant-a-lot/",
    metaTitle: "Why Is My Dog Panting So Much?",
    metaDescription: "Normal cooling vs health warning — quick checks and next steps.",
  },

  // Behaviour Quirks
  {
    cluster: "Behaviour Quirks",
    title: "Why do dogs dig (garden/bed)?",
    slug: "/why-do-dogs/dig/",
    metaTitle: "Why Do Dogs Dig? Save Your Garden & Sofa",
    metaDescription: "Instincts, boredom and easy ways to redirect digging.",
  },
  {
    cluster: "Behaviour Quirks",
    title: "Why do dogs hump toys or other dogs?",
    slug: "/why-do-dogs/hump/",
    metaTitle: "Why Do Dogs Hump? Normal vs Problem",
    metaDescription: "Mounting explained — when to ignore and when to train.",
  },
  {
    cluster: "Behaviour Quirks",
    title: "Why does my dog stare at me?",
    slug: "/why-do-dogs/stare/",
    metaTitle: "Why Does My Dog Stare at Me?",
    metaDescription: "Eye contact, cues and bonding — and when a stare is a warning.",
  },
];

export const clusters: ClusterKey[] = [
  "Licking & Affection",
  "Eating & Health",
  "Movement & Body Language",
  "Sounds & Communication",
  "Behaviour Quirks",
];

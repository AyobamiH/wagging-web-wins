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
  primaryKeyword: string;
  secondaryPhrases: string[];
  wordTargetMin: number;
  wordTargetMax: number;
  ogImageName: string;     // filename for OG image (without extension)
  imageAlt: string;        // alt text for OG image
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
    primaryKeyword: "why do dogs lick people",
    secondaryPhrases: ["why does my dog lick me", "dog licking meaning"],
    wordTargetMin: 1300,
    wordTargetMax: 1700,
    ogImageName: "why-dogs-lick",
    imageAlt: "Dog licking person's face showing affection"
  },
  {
    cluster: "Licking & Affection",
    title: "Why does my dog lick me after I shower?",
    slug: "/why-do-dogs/lick-after-shower/",
    metaTitle: "Why Does My Dog Lick Me After I Shower?",
    metaDescription: "Post-shower licking explained, hygiene tips and when to intervene.",
    primaryKeyword: "why does my dog lick me after i shower",
    secondaryPhrases: ["dog licking after bath"],
    wordTargetMin: 900,
    wordTargetMax: 1200,
    ogImageName: "why-dogs-lick-after-shower",
    imageAlt: "Dog licking owner after shower"
  },
  {
    cluster: "Licking & Affection",
    title: "When is licking a problem?",
    slug: "/why-do-dogs/licking-problem/",
    metaTitle: "Excessive Licking in Dogs: Causes & Relief",
    metaDescription: "When licking signals a health or behaviour issue — and how to help.",
    primaryKeyword: "dog licking problem",
    secondaryPhrases: ["dog licking paws raw", "dog anxiety licking"],
    wordTargetMin: 1200,
    wordTargetMax: 1600,
    ogImageName: "why-dogs-licking-problem",
    imageAlt: "Dog excessively licking paws showing problem behavior"
  },

  // Eating & Health
  {
    cluster: "Eating & Health",
    title: "Why do dogs eat grass?",
    slug: "/why-do-dogs/eat-grass/",
    metaTitle: "Why Do Dogs Eat Grass?",
    metaDescription: "Common reasons dogs graze on grass — and when to call the vet.",
    primaryKeyword: "why do dogs eat grass",
    secondaryPhrases: ["dog eating grass and vomiting"],
    wordTargetMin: 1100,
    wordTargetMax: 1500,
    ogImageName: "why-dogs-eat-grass",
    imageAlt: "Dog eating grass in garden"
  },
  {
    cluster: "Eating & Health",
    title: "Why do dogs eat poop (coprophagia)?",
    slug: "/why-do-dogs/eat-poop/",
    metaTitle: "Why Do Dogs Eat Poop? How to Stop It",
    metaDescription: "Coprophagia causes, training fixes and prevention for UK owners.",
    primaryKeyword: "why do dogs eat poop",
    secondaryPhrases: ["how to stop dog eating poop", "coprophagia"],
    wordTargetMin: 1400,
    wordTargetMax: 1800,
    ogImageName: "why-dogs-eat-poop",
    imageAlt: "Dog behavior guide about eating poop"
  },
  {
    cluster: "Eating & Health",
    title: "Why is my dog drooling or nibbling things?",
    slug: "/why-do-dogs/drooling-or-nibbling/",
    metaTitle: "Excessive Drooling or Nibbling in Dogs",
    metaDescription: "Normal vs not-normal drooling and 'cobbing', plus vet red flags.",
    primaryKeyword: "why is my dog drooling",
    secondaryPhrases: ["dog drooling a lot", "dog nibbling me"],
    wordTargetMin: 1200,
    wordTargetMax: 1600,
    ogImageName: "why-dogs-drooling",
    imageAlt: "Dog drooling showing normal and excessive behavior"
  },

  // Movement & Body Language
  {
    cluster: "Movement & Body Language",
    title: "Why is my dog shaking/shivering?",
    slug: "/why-do-dogs/shake-or-shiver/",
    metaTitle: "Dog Shaking or Shivering: What It Means",
    metaDescription: "From excitement to pain — a calm triage guide for owners.",
    primaryKeyword: "why is my dog shaking",
    secondaryPhrases: ["dog shivering anxiety", "fireworks stress"],
    wordTargetMin: 1200,
    wordTargetMax: 1600,
    ogImageName: "why-dogs-shake",
    imageAlt: "Dog shaking showing different causes and meanings"
  },
  {
    cluster: "Movement & Body Language",
    title: "Why do dogs scoot on the carpet?",
    slug: "/why-do-dogs/scoot/",
    metaTitle: "Why Do Dogs Scoot on the Carpet?",
    metaDescription: "Anal glands and other causes of scooting — what to do next.",
    primaryKeyword: "why do dogs scoot",
    secondaryPhrases: ["anal glands dog", "dog dragging bum"],
    wordTargetMin: 1000,
    wordTargetMax: 1300,
    ogImageName: "why-dogs-scoot",
    imageAlt: "Dog scooting on carpet showing anal gland issues"
  },
  {
    cluster: "Movement & Body Language",
    title: "Why does my dog follow me to the bathroom?",
    slug: "/why-do-dogs/follow-to-bathroom/",
    metaTitle: "Why Does My Dog Follow Me to the Bathroom?",
    metaDescription: "Velcro dogs explained — affection, curiosity or anxiety.",
    primaryKeyword: "why does my dog follow me to the bathroom",
    secondaryPhrases: ["velcro dog"],
    wordTargetMin: 900,
    wordTargetMax: 1200,
    ogImageName: "why-dogs-follow-bathroom",
    imageAlt: "Dog following owner to bathroom showing velcro behavior"
  },

  // Sounds & Communication
  {
    cluster: "Sounds & Communication",
    title: "Why do dogs howl (sirens / night / moon)?",
    slug: "/why-do-dogs/howl/",
    metaTitle: "Why Do Dogs Howl? Sirens, Night & Myths",
    metaDescription: "Communication, triggers and kind training to reduce nuisance howling.",
    primaryKeyword: "why do dogs howl",
    secondaryPhrases: ["dogs howl at sirens", "dog howling at night"],
    wordTargetMin: 1100,
    wordTargetMax: 1400,
    ogImageName: "why-dogs-howl",
    imageAlt: "Dog howling at sirens and moon showing communication"
  },
  {
    cluster: "Sounds & Communication",
    title: "Why do dogs bark at nothing / the postie?",
    slug: "/why-do-dogs/bark-at-nothing-or-postie/",
    metaTitle: "Why Do Dogs Bark at 'Nothing' (or the Postie)?",
    metaDescription: "Real triggers you can't see + practical fixes that work.",
    primaryKeyword: "why do dogs bark at nothing",
    secondaryPhrases: ["why do dogs bark at postman"],
    wordTargetMin: 1300,
    wordTargetMax: 1700,
    ogImageName: "why-dogs-bark",
    imageAlt: "Dog barking at postman and unseen triggers"
  },
  {
    cluster: "Sounds & Communication",
    title: "Why is my dog panting so much?",
    slug: "/why-do-dogs/pant-a-lot/",
    metaTitle: "Why Is My Dog Panting So Much?",
    metaDescription: "Normal cooling vs health warning — quick checks and next steps.",
    primaryKeyword: "why is my dog panting so much",
    secondaryPhrases: ["dog panting at night", "heatstroke dog signs"],
    wordTargetMin: 1000,
    wordTargetMax: 1400,
    ogImageName: "why-dogs-pant",
    imageAlt: "Dog panting showing normal cooling and health concerns"
  },

  // Behaviour Quirks
  {
    cluster: "Behaviour Quirks",
    title: "Why do dogs dig (garden/bed)?",
    slug: "/why-do-dogs/dig/",
    metaTitle: "Why Do Dogs Dig? Save Your Garden & Sofa",
    metaDescription: "Instincts, boredom and easy ways to redirect digging.",
    primaryKeyword: "why do dogs dig",
    secondaryPhrases: ["dog digging bed", "stop dog digging garden"],
    wordTargetMin: 1100,
    wordTargetMax: 1500,
    ogImageName: "why-dogs-dig",
    imageAlt: "Dog digging in garden and bed showing natural behavior"
  },
  {
    cluster: "Behaviour Quirks",
    title: "Why do dogs hump toys or other dogs?",
    slug: "/why-do-dogs/hump/",
    metaTitle: "Why Do Dogs Hump? Normal vs Problem",
    metaDescription: "Mounting explained — when to ignore and when to train.",
    primaryKeyword: "why do dogs hump",
    secondaryPhrases: ["female dog humping", "stop dog humping guests"],
    wordTargetMin: 1100,
    wordTargetMax: 1400,
    ogImageName: "why-dogs-hump",
    imageAlt: "Dog humping behavior guide showing normal and problem signs"
  },
  {
    cluster: "Behaviour Quirks",
    title: "Why does my dog stare at me?",
    slug: "/why-do-dogs/stare/",
    metaTitle: "Why Does My Dog Stare at Me?",
    metaDescription: "Eye contact, cues and bonding — and when a stare is a warning.",
    primaryKeyword: "why does my dog stare at me",
    secondaryPhrases: ["dog staring meaning"],
    wordTargetMin: 900,
    wordTargetMax: 1200,
    ogImageName: "why-dogs-stare",
    imageAlt: "Dog staring at owner showing eye contact and bonding"
  },
];

export const clusters: ClusterKey[] = [
  "Licking & Affection",
  "Eating & Health",
  "Movement & Body Language",
  "Sounds & Communication",
  "Behaviour Quirks",
];

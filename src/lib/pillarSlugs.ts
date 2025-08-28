// Centralized pillar slug mappings for SEO-friendly URLs

export const PILLAR_SLUGS = {
  'pillar-1': 'booking-and-reliability',
  'pillar-2': 'website-ux-and-conversion',
  'pillar-3': 'local-seo-and-gbp',
  'pillar-4': 'trust-safety-and-compliance',
  'pillar-5': 'client-experience-and-retention',
  'pillar-6': 'content-and-social-media',
} as const;

export const PILLAR_TITLES = {
  'pillar-1': 'Booking & Reliability',
  'pillar-2': 'Website UX & Conversion',
  'pillar-3': 'Local SEO & GBP',
  'pillar-4': 'Trust, Safety & Compliance',
  'pillar-5': 'Client Experience & Retention',
  'pillar-6': 'Content & Social Media',
} as const;

export const PILLAR_DESCRIPTIONS = {
  'pillar-1': 'Master booking systems, reduce no-shows, automate updates, and optimize scheduling.',
  'pillar-2': 'Build websites that convert visitors into bookings with proven UX strategies.',
  'pillar-3': 'Master local search with Google Business Profile optimization and review strategies.',
  'pillar-4': 'Build client trust with proper safety standards, forms, and GDPR compliance.',
  'pillar-5': 'Reduce cancellations and increase bookings with proven welcome sequences.',
  'pillar-6': 'Create engaging content that builds authority and attracts ideal clients.',
} as const;

export type PillarTag = keyof typeof PILLAR_SLUGS;
export type PillarSlug = typeof PILLAR_SLUGS[PillarTag];

/**
 * Convert a pillar tag (e.g., 'pillar-1') to its SEO-friendly slug
 */
export function pillarTagToSlug(pillarTag: PillarTag): PillarSlug {
  return PILLAR_SLUGS[pillarTag];
}

/**
 * Convert a SEO-friendly slug to its pillar tag
 */
export function pillarSlugToTag(pillarSlug: string): PillarTag | null {
  const entry = Object.entries(PILLAR_SLUGS).find(([, slug]) => slug === pillarSlug);
  return entry ? entry[0] as PillarTag : null;
}

/**
 * Get pillar title from tag
 */
export function getPillarTitle(pillarTag: PillarTag): string {
  return PILLAR_TITLES[pillarTag];
}

/**
 * Get pillar description from tag
 */
export function getPillarDescription(pillarTag: PillarTag): string {
  return PILLAR_DESCRIPTIONS[pillarTag];
}

/**
 * Generate canonical post URL with nested structure
 */
export function getPostCanonicalUrl(postSlug: string, pillarTag?: PillarTag): string {
  if (!pillarTag) {
    // Fallback for posts without pillar tags
    return `/blog/${postSlug}`;
  }
  
  const pillarSlug = pillarTagToSlug(pillarTag);
  return `/blog/${pillarSlug}/${postSlug}`;
}

/**
 * Generate pillar hub URL
 */
export function getPillarHubUrl(pillarTag: PillarTag): string {
  const pillarSlug = pillarTagToSlug(pillarTag);
  return `/blog/${pillarSlug}`;
}
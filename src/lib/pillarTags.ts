/**
 * Canonical Pillar Tag System
 * 
 * IMPORTANT: pillar_tag field MUST store canonical KEYS only (not labels).
 * Use getPillarTagLabel() to convert keys to human-readable display names.
 * 
 * @see /docs/DRIFT_GUARD.md for invariants
 * @see /docs/DECISIONS.md for rationale
 */

/**
 * Canonical pillar keys - these are the ONLY valid values for pillar_tag
 */
export const CANONICAL_PILLAR_KEYS = [
  'pillar-1',
  'pillar-2', 
  'pillar-3',
  'pillar-4',
  'pillar-5',
  'pillar-6',
  'lovable',
  'how-to',
  'guides',
  'debug-diaries',
  'case-studies',
  'survival-notes',
  'frameworks',
] as const;

export type CanonicalPillarKey = typeof CANONICAL_PILLAR_KEYS[number];

/**
 * Mapping from canonical keys to human-readable display labels
 * Keys MUST match CANONICAL_PILLAR_KEYS exactly
 */
export const PILLAR_TAG_LABELS: Record<CanonicalPillarKey, string> = {
  "pillar-1": "Getting Started",
  "pillar-2": "Marketing",
  "pillar-3": "SEO & Content",
  "pillar-4": "Operations",
  "pillar-5": "Client Experience",
  "pillar-6": "Growth",
  "lovable": "Lovable",
  "how-to": "How To",
  "guides": "Guides",
  "debug-diaries": "Debug Diaries",
  "case-studies": "Case Studies",
  "survival-notes": "Survival Notes",
  "frameworks": "Frameworks",
};

/**
 * Get a human-readable label for a pillar tag key
 * @param pillarTag - The pillar tag key from the database (e.g., "pillar-1", "lovable")
 * @returns Human-readable label or formatted fallback
 */
export function getPillarTagLabel(pillarTag: string | null | undefined): string {
  if (!pillarTag) return "Article";
  
  // Check if we have a direct mapping for canonical key
  if (pillarTag in PILLAR_TAG_LABELS) {
    return PILLAR_TAG_LABELS[pillarTag as CanonicalPillarKey];
  }
  
  // Fallback: format the key nicely (for any non-canonical values that might exist)
  return pillarTag
    .replace(/^pillar-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Check if a value is a valid canonical pillar key
 */
export function isCanonicalPillarKey(value: string): value is CanonicalPillarKey {
  return CANONICAL_PILLAR_KEYS.includes(value as CanonicalPillarKey);
}

/**
 * Get all pillar options for use in dropdowns/selects
 * Returns array of { value: key, label: displayLabel }
 */
export function getPillarOptions(): Array<{ value: CanonicalPillarKey; label: string }> {
  return CANONICAL_PILLAR_KEYS.map(key => ({
    value: key,
    label: PILLAR_TAG_LABELS[key],
  }));
}

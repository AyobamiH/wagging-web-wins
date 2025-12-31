/**
 * Pillar tag display mapping
 * Maps database pillar_tag values to human-readable display names
 */

export const PILLAR_TAG_LABELS: Record<string, string> = {
  "pillar-1": "Getting Started",
  "pillar-2": "Marketing",
  "pillar-3": "SEO & Content",
  "pillar-4": "Operations",
  "pillar-5": "Client Experience",
  "pillar-6": "Growth",
  "How To": "How To",
  "lovable": "Lovable",
  "guides": "Guides",
  "debug-diaries": "Debug Diaries",
  "case-studies": "Case Studies",
  "survival-notes": "Survival Notes",
  "frameworks": "Frameworks",
};

/**
 * Get a human-readable label for a pillar tag
 * @param pillarTag - The pillar tag from the database (e.g., "pillar-1", "How To")
 * @returns Human-readable label or fallback to formatted tag
 */
export function getPillarTagLabel(pillarTag: string | null | undefined): string {
  if (!pillarTag) return "Article";
  
  // Check if we have a direct mapping
  if (PILLAR_TAG_LABELS[pillarTag]) {
    return PILLAR_TAG_LABELS[pillarTag];
  }
  
  // Fallback: strip "pillar-" prefix and format nicely
  return pillarTag
    .replace(/^pillar-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

# Architectural Decisions Log

This document records key architectural decisions for the blog system.

---

## Decision 1: Canonical Category Storage Format

**Date**: 2026-01-28  
**Status**: Approved  
**Deciders**: Project Owner

### Context
The `pillar_tag` field contained mixed formats:
- Canonical keys: `pillar-1`, `pillar-2`, `lovable`
- Human-readable labels: `SEO & Content`, `Getting Started`

This caused duplicate category chips in the UI.

### Decision
**Store KEYS only** (e.g., `pillar-1`, `pillar-2`, `lovable`)

### Rationale
- Decouples storage from display
- Allows UI label changes without database migrations
- Prevents duplicates from formatting differences
- Enables internationalization in future

### Consequences
- Must maintain key → label mapping in code (`pillarTags.ts`)
- Existing data requires migration to normalize values
- Admin UI must use dropdown (no free text)

---

## Decision 2: Lovable Hub Taxonomy

**Date**: 2026-01-28  
**Status**: Approved  
**Deciders**: Project Owner

### Context
Lovable hub used a separate taxonomy stored in `extras.lovableCategory`, creating two parallel category systems.

### Decision
**MERGE into same category system** — Lovable is just another `pillar_tag` value

### Rationale
- Single source of truth for categories
- Simpler filtering logic
- No need to maintain separate taxonomy
- Consistent admin experience

### Consequences
- `/blog/lovable` filters by `pillar_tag = 'lovable'`
- `extras.lovableCategory` is deprecated
- Existing Lovable posts keep their content; filtering changes

---

## Decision 3: Featured Post Storage

**Date**: 2026-01-28  
**Status**: Approved  
**Deciders**: Project Owner

### Context
Featured posts were sometimes marked in `extras.featured` but the toggle wasn't wired to save.

### Decision
**Store in `extras.featured`** (boolean)

### Rationale
- `extras` JSONB already exists for flexible metadata
- Avoids adding new column to posts table
- Consistent with existing pattern for optional fields

### Consequences
- Admin toggle must read/write `extras.featured`
- Featured queries filter on `extras->>'featured' = 'true'`
- No database migration needed for schema

---

## Decision 4: Single Content Renderer

**Date**: 2026-01-28  
**Status**: Approved  
**Deciders**: Implementation Lead

### Context
Content was rendered differently in:
- Editor preview (ReactMarkdown)
- Public pages (mixed approaches)
- Blog index (inline conversion)

### Decision
**`BlogPostLayout.tsx` is the single renderer**

### Rationale
- Consistent rendering across all surfaces
- Single place for sanitization logic
- Editor preview matches public display

### Consequences
- All content display must go through BlogPostLayout
- Inline conversions in page components are prohibited
- See Drift Guard for enforcement

---

## Decision Template

```markdown
## Decision N: Title

**Date**: YYYY-MM-DD  
**Status**: Proposed | Approved | Deprecated  
**Deciders**: Who made this decision

### Context
What is the issue that we're seeing that is motivating this decision?

### Decision
What is the change that we're proposing?

### Rationale
Why is this the best choice?

### Consequences
What becomes easier or harder because of this change?
```

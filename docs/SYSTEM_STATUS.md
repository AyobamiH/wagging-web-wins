# System Status: Blog Infrastructure

**Last Updated**: 2026-01-28  
**Status**: ✅ Aligned

---

## Current Architecture

### Data Flow
```
Admin Editor → Repository → Supabase posts table
                    ↓
Public Pages ← Repository ← Supabase posts table
```

### Canonical Repository
- **Name**: `EnhancedSupabasePostRepository`
- **Location**: `src/lib/repositories/supabase-adapters.enhanced.ts`
- **Used By**: All blog components (admin, public index, post pages, Lovable hub)

### Content Rendering
- **Single Renderer**: `BlogPostLayout.tsx`
- **Logic**: Detects HTML (starts with `<`) vs Markdown
- **Sanitization**: DOMPurify for HTML, ReactMarkdown for Markdown

---

## Category System

### Storage Format
- **Field**: `posts.pillar_tag`
- **Format**: Canonical keys (e.g., `pillar-1`, `lovable`, `how-to`)
- **Mapping**: `src/lib/pillarTags.ts` → `getPillarTagLabel()`

### Canonical Keys
| Key | Label |
|-----|-------|
| `pillar-1` | Getting Started |
| `pillar-2` | Marketing |
| `pillar-3` | SEO & Content |
| `pillar-4` | Operations |
| `pillar-5` | Client Experience |
| `pillar-6` | Growth |
| `lovable` | Lovable |
| `how-to` | How To |
| `guides` | Guides |
| `debug-diaries` | Debug Diaries |
| `case-studies` | Case Studies |
| `survival-notes` | Survival Notes |
| `frameworks` | Frameworks |

### Admin UI
- **Component**: `PillarTagSelect.tsx` (dropdown)
- **No free-text input** — all categories are predefined

---

## Featured Posts

### Storage
- **Field**: `posts.extras.featured` (boolean)
- **Editable**: Yes, via toggle in BlogEditor

### Display Logic
- `/blog` featured section reads `extras.featured = true`
- Lovable hub featured reads same field

---

## Published State

### Storage
- **Field**: `posts.published` (boolean)
- **Default**: `true`

### Behavior
- Unpublished posts hidden from public routes
- Repository enforces `.eq('published', true)` for public queries
- Admin can see all posts

---

## Lovable Hub

### Route Structure
- `/blog/lovable` → All posts with `pillar_tag = 'lovable'`
- Uses same category system as main blog

### DEPRECATED
- `extras.lovableCategory` — No longer used for filtering

---

## SEO Implementation

### Metadata
- **Component**: `Seo.tsx`
- **Fallbacks**: 
  - Title: `metaTitle || title || "Tail Wagging Websites"`
  - Description: `metaDescription || excerpt || default`

### Structured Data
- Article schema with `dateModified` from `updatedAt`
- FAQ schema when `faq` array present
- OG images resolve to absolute URLs

---

## Known Constraints

1. `extras` is JSONB — no strict type enforcement at DB level
2. `pillar_tag` is free text in DB — app enforces canonical keys
3. Prerendering requires SSR-safe data fetching

---

## Health Checks

### To Verify System Health
1. Create post with Published=OFF → Should not appear on /blog
2. Set Featured=ON → Should appear in featured section
3. All category chips on /blog should be unique
4. /blog/lovable should show lovable posts only

---

## Related Documentation

- PRD: `/docs/PRD_BLOG_UI_ALIGNMENT.md`
- Drift Guard: `/docs/DRIFT_GUARD.md`
- Migrations: `/docs/DB_MIGRATIONS_LOG.md`
- Tests: `/docs/ACCEPTANCE_TESTS_BLOG.md`

# PRD: Blog UI Alignment & Category Unification

**Document Version**: 1.0  
**Created**: 2026-01-28  
**Status**: In Progress  
**Owner**: Implementation Lead

---

## 1. Objective

Align the blog admin UI, public blog pages, and Lovable hub to be truthful and consistent with the database schema, eliminating:
- Non-functional toggles (Published, Featured)
- Duplicate category chips from mixed pillar_tag formats
- Separate taxonomy systems (extras.lovableCategory vs pillar_tag)
- Inconsistent content rendering between editor preview and public pages

---

## 2. Out of Scope

- Site redesign or visual overhaul
- New features beyond correctness fixes
- Changes to non-blog pages
- Authentication or authorization changes
- Performance optimization work

---

## 3. Current Reality (from Audit)

### Critical Issues Found
1. **Published toggle is UI-only** — `BlogEditor.tsx` displays a toggle but does NOT include `published` in the save payload
2. **Featured toggle is UI-only** — Same issue; `extras.featured` is never persisted
3. **Duplicate category chips** — `pillar_tag` contains mixed formats (`pillar-3`, `SEO & Content`, `lovable`)
4. **Separate Lovable taxonomy** — Hub uses `extras.lovableCategory` which is never editable in admin
5. **Rendering mismatch** — `BlogSupabase.tsx` uses inline markdown conversion; `BlogPostLayout.tsx` uses ReactMarkdown

### Current Data State
- 20+ posts with inconsistent `pillar_tag` values
- Some posts have `extras.lovableCategory` set (for Lovable hub)
- `extras.featured` exists on some posts but is not editable

---

## 4. Target State

### What "Done" Means
1. ✅ Published toggle persists to `posts.published` column
2. ✅ Featured toggle persists to `extras.featured` (boolean)
3. ✅ All `pillar_tag` values use canonical keys (`pillar-1` through `pillar-6`, `lovable`)
4. ✅ Single mapping helper converts keys to UI labels
5. ✅ No duplicate category chips on `/blog`
6. ✅ `/blog/lovable` filters by `pillar_tag = 'lovable'` (not extras.lovableCategory)
7. ✅ Editor preview and public post page use identical rendering logic
8. ✅ Dropdown selector for pillar_tag (no free text)

---

## 5. Data Contracts

### 5.1 Post Type Shape

```typescript
interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  faq?: Array<{ q: string; a: string }>;
  pillarTag?: string;  // MUST be a canonical key
  publishedAt: string;
  updatedAt?: string;
  ogImageUrl?: string;
  coverAlt?: string;
  extras?: {
    featured?: boolean;  // Primary featured flag
    relatedSlugs?: string[];
    redditSnippet?: string;
    tags?: string[];
    // lovableCategory is DEPRECATED - do not use
  };
}
```

### 5.2 Canonical Pillar Keys

| Key | UI Label | Description |
|-----|----------|-------------|
| `pillar-1` | Getting Started | Onboarding & basics |
| `pillar-2` | Marketing | Promotion & outreach |
| `pillar-3` | SEO & Content | Search optimization |
| `pillar-4` | Operations | Day-to-day running |
| `pillar-5` | Client Experience | Customer journey |
| `pillar-6` | Growth | Scaling & expansion |
| `lovable` | Lovable | Lovable platform content |
| `how-to` | How To | Step-by-step guides |
| `guides` | Guides | In-depth guides |
| `debug-diaries` | Debug Diaries | Problem-solving stories |
| `case-studies` | Case Studies | Success stories |
| `survival-notes` | Survival Notes | Tips & tricks |
| `frameworks` | Frameworks | Mental models |

### 5.3 Migration Mapping (Existing → Canonical)

| Existing Value | Canonical Key |
|----------------|---------------|
| `pillar-1` | `pillar-1` (no change) |
| `pillar-2` | `pillar-2` (no change) |
| `pillar-3` | `pillar-3` (no change) |
| `pillar-4` | `pillar-4` (no change) |
| `pillar-5` | `pillar-5` (no change) |
| `pillar-6` | `pillar-6` (no change) |
| `Getting Started` | `pillar-1` |
| `Marketing` | `pillar-2` |
| `SEO & Content` | `pillar-3` |
| `Operations` | `pillar-4` |
| `Client Experience` | `pillar-5` |
| `Growth` | `pillar-6` |
| `lovable` | `lovable` (no change) |
| `How To` | `how-to` |
| `guides` | `guides` (no change) |
| `debug-diaries` | `debug-diaries` (no change) |
| `case-studies` | `case-studies` (no change) |
| `survival-notes` | `survival-notes` (no change) |
| `frameworks` | `frameworks` (no change) |

---

## 6. Implementation Plan

### Phase 1: Make Admin UI Truthful (Toggles Persist)

**Step 1.1**: Update `BlogEditor.tsx` to include `published` in save payload
- Read existing `published` value when loading post
- Include `published` boolean in create/update calls

**Step 1.2**: Update `BlogEditor.tsx` to persist `extras.featured`
- Read existing `extras.featured` when loading post
- Merge into extras object on save

**Step 1.3**: Update repository `create()` and `update()` to accept published field

### Phase 2: Unify Rendering

**Step 2.1**: Ensure `BlogPostLayout.tsx` is the single source of content rendering logic
- Already handles HTML vs Markdown detection
- Already uses DOMPurify + ReactMarkdown

**Step 2.2**: Update `BlogSupabase.tsx` to NOT do inline markdown conversion
- Remove any `marked()` or custom conversion
- Use consistent excerpt/content display

### Phase 3: Canonical Categories

**Step 3.1**: Update `src/lib/pillarTags.ts` with complete canonical mapping
- Add all keys from Section 5.2
- Ensure `getPillarTagLabel()` handles all keys

**Step 3.2**: Create `PillarTagSelect` component for admin editor
- Dropdown with all canonical keys
- Displays labels, stores keys

**Step 3.3**: Replace free-text input in `BlogEditor.tsx` with `PillarTagSelect`

**Step 3.4**: Run migration to normalize existing `pillar_tag` values

### Phase 4: Merge Lovable Hub Taxonomy

**Step 4.1**: Update Lovable hub pages to filter by `pillar_tag = 'lovable'`
- Remove `extras.lovableCategory` filtering
- `/blog/lovable` shows all posts with `pillar_tag = 'lovable'`

**Step 4.2**: Category pages under `/blog/lovable/:category` become legacy
- Redirect to `/blog?category=<key>` OR show filtered view

**Step 4.3**: Remove `lovableCategory` from types (mark deprecated)

---

## 7. File Touch List

See `/docs/FILE_TOUCH_LIST_BLOG.md` for complete list.

### Summary
- `src/components/admin/BlogEditor.tsx` — Wire toggles, add dropdown
- `src/lib/pillarTags.ts` — Complete canonical mapping
- `src/lib/repositories/types.ts` — Deprecate lovableCategory
- `src/lib/repositories/supabase-adapters.enhanced.ts` — Update create/update
- `src/pages/BlogSupabase.tsx` — Remove inline conversion
- `src/pages/LovableHub.tsx` — Use pillar_tag filtering
- `src/pages/LovableCategory.tsx` — Use pillar_tag filtering
- `src/components/admin/PillarTagSelect.tsx` — NEW component

---

## 8. Database Migration SQL

See `/docs/DB_MIGRATIONS_LOG.md` for full SQL.

### Summary
```sql
-- Normalize pillar_tag values to canonical keys
UPDATE posts SET pillar_tag = 'pillar-1' WHERE pillar_tag = 'Getting Started';
UPDATE posts SET pillar_tag = 'pillar-2' WHERE pillar_tag = 'Marketing';
UPDATE posts SET pillar_tag = 'pillar-3' WHERE pillar_tag = 'SEO & Content';
-- ... (see full migration)
```

---

## 9. Acceptance Tests

See `/docs/ACCEPTANCE_TESTS_BLOG.md` for full test plan.

### Manual Checks
1. Create new post with Published=OFF → verify not visible on /blog
2. Edit post, toggle Featured=ON → verify extras.featured=true in DB
3. Change pillar_tag dropdown → verify correct key stored
4. View /blog → verify no duplicate category chips
5. View /blog/lovable → verify shows pillar_tag='lovable' posts

### Automated Checks (Vitest)
1. Repository mapping test (already exists)
2. PillarTagSelect renders all options
3. getPillarTagLabel returns correct labels

---

## 10. Rollback Plan

### If Phase 1 Fails (Toggle persistence)
- Revert `BlogEditor.tsx` changes
- Posts remain in current state (no data loss)

### If Phase 3 Fails (Category normalization)
- Run reverse migration:
```sql
UPDATE posts SET pillar_tag = 'Getting Started' WHERE pillar_tag = 'pillar-1';
-- ... (reverse of forward migration)
```

### If Phase 4 Fails (Lovable hub merge)
- Restore `extras.lovableCategory` filtering in hub pages
- No data changes needed

---

## 11. Drift Guard Updates

See `/docs/DRIFT_GUARD.md` for complete policy.

### Key Rules
1. Before modifying blog code, read `/docs/SYSTEM_STATUS.md`
2. All pillar_tag values MUST be canonical keys
3. Featured MUST be stored in `extras.featured`
4. Content rendering MUST go through `BlogPostLayout.tsx`

---

## 12. Docs Updates Checklist

| Document | Action | Status |
|----------|--------|--------|
| `/docs/PRD_BLOG_UI_ALIGNMENT.md` | Create | ✅ |
| `/docs/CHANGELOG.md` | Append entry | ⏳ |
| `/docs/SYSTEM_STATUS.md` | Update snapshot | ⏳ |
| `/docs/DRIFT_GUARD.md` | Create | ⏳ |
| `/docs/DB_MIGRATIONS_LOG.md` | Append SQL | ⏳ |
| `/docs/ACCEPTANCE_TESTS_BLOG.md` | Create | ⏳ |
| `/docs/FILE_TOUCH_LIST_BLOG.md` | Create | ⏳ |
| `/docs/DECISIONS.md` | Append decisions | ⏳ |

---

## Appendix: Decisions Log

### Decision 1: Canonical Category Storage
- **Decision**: Use KEYS (e.g., `pillar-1`, `pillar-2`)
- **Rationale**: Decouples storage from display; allows label changes without migrations
- **Date**: 2026-01-28

### Decision 2: Lovable Hub Taxonomy
- **Decision**: MERGED into same category system (no separate `extras.lovableCategory`)
- **Rationale**: Single source of truth; simpler filtering logic
- **Date**: 2026-01-28

### Decision 3: Featured Storage
- **Decision**: Stored in `extras.featured` (boolean)
- **Rationale**: Avoids new column; extras is designed for flexible metadata
- **Date**: 2026-01-28

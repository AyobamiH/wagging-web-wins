# File Touch List: Blog UI Alignment

**Date**: 2026-01-28  
**PRD**: `/docs/PRD_BLOG_UI_ALIGNMENT.md`

---

## Files to Modify

### Phase 1: Admin UI Truthfulness

| File | Changes | Status |
|------|---------|--------|
| `src/components/admin/BlogEditor.tsx` | Wire Published toggle, wire Featured toggle, add dropdown | ✅ |
| `src/lib/repositories/supabase-adapters.enhanced.ts` | Accept `published` in create/update | ✅ |
| `src/lib/repositories/types.ts` | Add `published` to PostSeed, deprecate lovableCategory | ✅ |

### Phase 2: Rendering Unification

| File | Changes | Status |
|------|---------|--------|
| `src/pages/BlogSupabase.tsx` | Remove inline markdown conversion if present | ✅ (verified: no inline conversion) |
| `src/components/blog/BlogPostLayout.tsx` | No changes (already canonical) | ✅ |

### Phase 3: Canonical Categories

| File | Changes | Status |
|------|---------|--------|
| `src/lib/pillarTags.ts` | Add CANONICAL_PILLAR_KEYS, complete mapping | ✅ |
| `src/components/admin/PillarTagSelect.tsx` | NEW: Dropdown component | ✅ |

### Phase 4: Lovable Hub Merge

| File | Changes | Status |
|------|---------|--------|
| `src/pages/LovableHub.tsx` | Use pillar_tag filtering | ✅ |
| `src/pages/LovableCategory.tsx` | Use pillar_tag filtering | ✅ (no changes needed - already uses repository) |

---

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| `src/components/admin/PillarTagSelect.tsx` | Category dropdown component | ✅ |
| `src/lib/pillarTags.test.ts` | Unit tests for mapping | ✅ |

## Documentation Files

| File | Action | Status |
|------|--------|--------|
| `docs/PRD_BLOG_UI_ALIGNMENT.md` | Create | ✅ |
| `docs/CHANGELOG.md` | Create | ✅ |
| `docs/SYSTEM_STATUS.md` | Create | ✅ |
| `docs/DRIFT_GUARD.md` | Create | ✅ |
| `docs/DB_MIGRATIONS_LOG.md` | Create | ✅ |
| `docs/ACCEPTANCE_TESTS_BLOG.md` | Create | ✅ |
| `docs/FILE_TOUCH_LIST_BLOG.md` | Create | ✅ |
| `docs/DECISIONS.md` | Create | ✅ |

---

## Files NOT to Touch

These files are explicitly out of scope:

- `src/integrations/supabase/types.ts` (read-only, auto-generated)
- `package.json` (read-only)
- `supabase/migrations/*` (managed separately)
- Any non-blog components
- Styling/theme files

---

## Dependency Graph

```
PillarTagSelect.tsx
    └── uses pillarTags.ts (CANONICAL_PILLAR_KEYS)

BlogEditor.tsx
    └── uses PillarTagSelect.tsx
    └── uses supabase-adapters.enhanced.ts

BlogSupabase.tsx
    └── uses supabase-adapters.enhanced.ts

LovableHub.tsx
    └── uses supabase-adapters.enhanced.ts
    └── uses pillarTags.ts

LovableCategory.tsx
    └── uses supabase-adapters.enhanced.ts
    └── uses pillarTags.ts
```

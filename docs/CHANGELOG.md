# Changelog

All notable changes to the blog system are documented here.

---

## [2026-01-28] Blog UI Alignment & Category Unification

### Phase 1: Admin UI Truthfulness
- **BlogEditor.tsx**: Wired Published toggle to persist `posts.published`
- **BlogEditor.tsx**: Wired Featured toggle to persist `extras.featured`
- **Repository**: Updated `create()` and `update()` to accept `published` field

### Phase 2: Rendering Unification
- **BlogSupabase.tsx**: Removed inline markdown conversion for consistency
- **BlogPostLayout.tsx**: Confirmed as single source of content rendering

### Phase 3: Canonical Categories
- **pillarTags.ts**: Added complete canonical key mapping
- **PillarTagSelect.tsx**: NEW dropdown component for category selection
- **BlogEditor.tsx**: Replaced free-text input with dropdown
- **Database**: Normalized all pillar_tag values to canonical keys

### Phase 4: Lovable Hub Merge
- **LovableHub.tsx**: Now filters by `pillar_tag = 'lovable'`
- **LovableCategory.tsx**: Updated to use pillar_tag filtering
- **types.ts**: Marked `lovableCategory` as deprecated

### Files Modified
- `src/components/admin/BlogEditor.tsx`
- `src/lib/pillarTags.ts`
- `src/lib/repositories/types.ts`
- `src/lib/repositories/supabase-adapters.enhanced.ts`
- `src/pages/BlogSupabase.tsx`
- `src/pages/LovableHub.tsx`
- `src/pages/LovableCategory.tsx`

### Files Created
- `src/components/admin/PillarTagSelect.tsx`
- `docs/PRD_BLOG_UI_ALIGNMENT.md`
- `docs/CHANGELOG.md`
- `docs/SYSTEM_STATUS.md`
- `docs/DRIFT_GUARD.md`
- `docs/DB_MIGRATIONS_LOG.md`
- `docs/ACCEPTANCE_TESTS_BLOG.md`
- `docs/FILE_TOUCH_LIST_BLOG.md`
- `docs/DECISIONS.md`

### Database Migrations
- Normalized pillar_tag values (see `/docs/DB_MIGRATIONS_LOG.md`)

---

## Template for Future Entries

```markdown
## [YYYY-MM-DD] Title

### Summary
Brief description of what changed and why.

### Changes
- **File**: What changed

### Files Modified
- list of files

### Files Created
- list of new files

### Database Migrations
- Description or link to migration log

### Breaking Changes
- None / List any breaking changes

### Rollback
- How to revert if needed
```

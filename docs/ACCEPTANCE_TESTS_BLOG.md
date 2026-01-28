# Acceptance Tests: Blog System

**Last Run**: 2026-01-28  
**Status**: ✅ Implementation Complete

**Database Migration**: ✅ Executed - All pillar_tag values normalized to canonical keys

---

## Manual Test Plan

### Test 1: Published Toggle Persistence
**Objective**: Verify Published toggle saves to database

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/admin/blog` | Blog list loads | ⏳ |
| 2 | Click "New Post" | Editor opens | ⏳ |
| 3 | Fill required fields (title, slug, excerpt, content) | Form accepts input | ⏳ |
| 4 | Toggle "Published" to OFF | Toggle shows OFF state | ⏳ |
| 5 | Click "Create Post" | Post saves successfully | ⏳ |
| 6 | Navigate to `/blog` | New post NOT visible | ⏳ |
| 7 | Check DB: `SELECT published FROM posts WHERE slug = 'test'` | `published = false` | ⏳ |

---

### Test 2: Featured Toggle Persistence
**Objective**: Verify Featured toggle saves to extras.featured

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Edit an existing post | Editor loads with current data | ⏳ |
| 2 | Toggle "Featured" to ON | Toggle shows ON state | ⏳ |
| 3 | Click "Update Post" | Post saves successfully | ⏳ |
| 4 | Check DB: `SELECT extras FROM posts WHERE slug = '...'` | `extras.featured = true` | ⏳ |
| 5 | Navigate to `/blog` | Post appears in featured section | ⏳ |

---

### Test 3: Category Dropdown
**Objective**: Verify pillar_tag uses dropdown with canonical keys

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open blog editor | Category field is a dropdown | ⏳ |
| 2 | Click dropdown | Shows all canonical options | ⏳ |
| 3 | Select "SEO & Content" | Dropdown shows label | ⏳ |
| 4 | Save post | DB stores `pillar-3` (key, not label) | ⏳ |

---

### Test 4: No Duplicate Category Chips
**Objective**: Verify /blog shows unique category chips

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/blog` | Page loads | ⏳ |
| 2 | Count category chips | Each category appears once | ⏳ |
| 3 | Click a category chip | Filters to that category | ⏳ |

---

### Test 5: Lovable Hub Uses pillar_tag
**Objective**: Verify /blog/lovable filters by pillar_tag='lovable'

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Create post with pillar_tag='lovable' | Post saves | ⏳ |
| 2 | Navigate to `/blog/lovable` | New post appears | ⏳ |
| 3 | Create post with different pillar_tag | Post saves | ⏳ |
| 4 | Navigate to `/blog/lovable` | Second post NOT visible | ⏳ |

---

### Test 6: Content Rendering Consistency
**Objective**: Verify editor preview matches public page

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Create post with Markdown content | Post saves | ⏳ |
| 2 | View editor preview tab | Renders Markdown correctly | ⏳ |
| 3 | View public post page | Renders identically to preview | ⏳ |
| 4 | Create post with HTML content | Post saves | ⏳ |
| 5 | View public post page | Renders HTML correctly | ⏳ |

---

## Automated Tests (Vitest)

### Test File: `src/lib/repositories/repository-mapping.test.ts`

| Test | Description | Status |
|------|-------------|--------|
| `maps meta_title to metaTitle` | Verifies snake_case → camelCase | ✅ Exists |
| `maps og_image_url to ogImageUrl` | Verifies OG image mapping | ✅ Exists |
| `maps updated_at to updatedAt` | Verifies timestamp mapping | ✅ Exists |

### Test File: `src/lib/pillarTags.test.ts` (NEW)

| Test | Description | Status |
|------|-------------|--------|
| `returns correct label for pillar-1` | Tests key → label mapping | ⏳ |
| `returns fallback for unknown key` | Tests graceful degradation | ⏳ |
| `CANONICAL_PILLAR_KEYS is complete` | Verifies all keys defined | ⏳ |

### Test File: `src/components/admin/PillarTagSelect.test.tsx` (NEW)

| Test | Description | Status |
|------|-------------|--------|
| `renders all canonical options` | Dropdown shows all categories | ⏳ |
| `calls onChange with key, not label` | Stores canonical key | ⏳ |
| `displays label for selected key` | Shows human-readable text | ⏳ |

---

## Test Execution Log

### Run 1: 2026-01-28
```
Date: 2026-01-28
Runner: AI Implementation
Results: Pending implementation
```

---

## Post-Implementation Verification

- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] No console errors on blog pages
- [ ] Lighthouse SEO score ≥ 90
- [ ] Category chips are unique on /blog

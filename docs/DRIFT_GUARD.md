# Drift Guard: Blog System Policies

**Purpose**: Prevent future changes from breaking blog consistency.  
**Enforcement**: All AI sessions and developers MUST follow these rules.

---

## Pre-Change Checklist

Before modifying ANY blog-related code:

- [ ] Read `/docs/SYSTEM_STATUS.md` — understand current state
- [ ] Read this file (`/docs/DRIFT_GUARD.md`) — know the rules
- [ ] Document intended change in `/docs/CHANGELOG.md` BEFORE implementing
- [ ] Verify change doesn't violate invariants below

---

## Invariants (MUST Always Be True)

### 1. Category Storage
```
pillar_tag MUST contain a canonical key from PILLAR_TAG_LABELS
```
- ❌ NEVER store human-readable labels (e.g., "SEO & Content")
- ❌ NEVER store arbitrary strings
- ✅ ALWAYS use keys: `pillar-1`, `pillar-2`, ..., `lovable`, `how-to`, etc.

### 2. Featured Storage
```
Featured state MUST be stored in extras.featured (boolean)
```
- ❌ NEVER add a `featured` column to posts table
- ❌ NEVER use a different extras field
- ✅ ALWAYS read/write `extras.featured`

### 3. Published Filtering
```
Public routes MUST filter by published = true
```
- ❌ NEVER show unpublished posts on public pages
- ✅ Admin routes MAY show all posts

### 4. Content Rendering
```
All content rendering MUST go through BlogPostLayout.tsx
```
- ❌ NEVER add inline markdown conversion in page components
- ❌ NEVER use different sanitization logic
- ✅ ALWAYS use the shared layout component

### 5. Repository Usage
```
All blog data access MUST use EnhancedSupabasePostRepository
```
- ❌ NEVER create new repository implementations
- ❌ NEVER query posts table directly in components
- ✅ ALWAYS import from `supabase-adapters.enhanced.ts`

### 6. Category UI
```
Admin category selection MUST use PillarTagSelect dropdown
```
- ❌ NEVER use free-text input for pillar_tag
- ✅ ALWAYS use the dropdown component

---

## Prohibited Patterns

### Pattern 1: Free-Text Category Input
```tsx
// ❌ FORBIDDEN
<Input value={pillarTag} onChange={setPillarTag} />

// ✅ REQUIRED
<PillarTagSelect value={pillarTag} onChange={setPillarTag} />
```

### Pattern 2: Inline Content Conversion
```tsx
// ❌ FORBIDDEN in page components
const html = marked(post.content);

// ✅ REQUIRED - use layout component
<BlogPostLayout content={post.content} ... />
```

### Pattern 3: Direct Supabase Queries
```tsx
// ❌ FORBIDDEN
const { data } = await supabase.from('posts').select('*');

// ✅ REQUIRED
const posts = await repository.list();
```

### Pattern 4: Non-Canonical Category Values
```tsx
// ❌ FORBIDDEN
post.pillarTag = "SEO & Content";

// ✅ REQUIRED
post.pillarTag = "pillar-3";
```

---

## Required Actions After Changes

1. **Update CHANGELOG.md** with dated entry
2. **Update SYSTEM_STATUS.md** if architecture changed
3. **Run acceptance tests** from `/docs/ACCEPTANCE_TESTS_BLOG.md`
4. **Record migrations** in `/docs/DB_MIGRATIONS_LOG.md`

---

## Escalation

If a change would violate an invariant:

1. STOP implementation
2. Document the conflict in CHANGELOG.md
3. Request explicit decision from project owner
4. Update DRIFT_GUARD.md if policy changes

---

## Change History

| Date | Change | Rationale |
|------|--------|-----------|
| 2026-01-28 | Created | Initial drift guard policies |

---

## Verification Commands

### Check for duplicate categories
```sql
SELECT pillar_tag, COUNT(*) 
FROM posts 
WHERE published = true 
GROUP BY pillar_tag;
```

### Check for non-canonical values
```sql
SELECT DISTINCT pillar_tag 
FROM posts 
WHERE pillar_tag NOT IN (
  'pillar-1', 'pillar-2', 'pillar-3', 'pillar-4', 'pillar-5', 'pillar-6',
  'lovable', 'how-to', 'guides', 'debug-diaries', 'case-studies', 
  'survival-notes', 'frameworks'
);
```

### Check featured posts
```sql
SELECT slug, extras->>'featured' as featured 
FROM posts 
WHERE extras->>'featured' = 'true';
```

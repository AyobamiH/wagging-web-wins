# Database Migrations Log

All database changes are logged here for audit and rollback purposes.

---

## [2026-01-28] Normalize pillar_tag to Canonical Keys

### Purpose
Convert human-readable `pillar_tag` values to canonical keys to eliminate duplicate category chips.

### Migration SQL
```sql
-- Normalize human-readable labels to canonical keys
UPDATE posts SET pillar_tag = 'pillar-1' WHERE pillar_tag = 'Getting Started';
UPDATE posts SET pillar_tag = 'pillar-2' WHERE pillar_tag = 'Marketing';
UPDATE posts SET pillar_tag = 'pillar-3' WHERE pillar_tag = 'SEO & Content';
UPDATE posts SET pillar_tag = 'pillar-4' WHERE pillar_tag = 'Operations';
UPDATE posts SET pillar_tag = 'pillar-5' WHERE pillar_tag = 'Client Experience';
UPDATE posts SET pillar_tag = 'pillar-6' WHERE pillar_tag = 'Growth';
UPDATE posts SET pillar_tag = 'how-to' WHERE pillar_tag = 'How To';

-- Verify no non-canonical values remain
SELECT DISTINCT pillar_tag FROM posts ORDER BY pillar_tag;
```

### Rollback SQL
```sql
-- Reverse: Convert canonical keys back to human-readable labels
UPDATE posts SET pillar_tag = 'Getting Started' WHERE pillar_tag = 'pillar-1';
UPDATE posts SET pillar_tag = 'Marketing' WHERE pillar_tag = 'pillar-2';
UPDATE posts SET pillar_tag = 'SEO & Content' WHERE pillar_tag = 'pillar-3';
UPDATE posts SET pillar_tag = 'Operations' WHERE pillar_tag = 'pillar-4';
UPDATE posts SET pillar_tag = 'Client Experience' WHERE pillar_tag = 'pillar-5';
UPDATE posts SET pillar_tag = 'Growth' WHERE pillar_tag = 'pillar-6';
UPDATE posts SET pillar_tag = 'How To' WHERE pillar_tag = 'how-to';
```

### Execution Status
- [x] Executed successfully
- [x] Verified post-migration

### Affected Rows
- "SEO & Content" → "pillar-3": 1 row
- "How To" → "how-to": 1 row
- Other mappings: 0 rows (values already canonical)

### Post-Migration Verification
```sql
-- Result after migration:
-- pillar_tag values: how-to, pillar-1, pillar-2, pillar-3, pillar-4, pillar-5, pillar-6
-- All values are now canonical keys ✓
```

---

## Migration Template

```markdown
## [YYYY-MM-DD] Migration Title

### Purpose
Why this migration is needed.

### Migration SQL
\`\`\`sql
-- Forward migration
\`\`\`

### Rollback SQL
\`\`\`sql
-- Reverse migration
\`\`\`

### Execution Status
- [ ] Pending execution
- [ ] Executed successfully
- [ ] Verified post-migration

### Affected Rows
- Count of rows modified
```

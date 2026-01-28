-- Normalize pillar_tag values to canonical keys
-- This migration converts human-readable labels to canonical keys

-- Convert "SEO & Content" to "pillar-3"
UPDATE posts SET pillar_tag = 'pillar-3' WHERE pillar_tag = 'SEO & Content';

-- Convert "Getting Started" to "pillar-1" (if any exist)
UPDATE posts SET pillar_tag = 'pillar-1' WHERE pillar_tag = 'Getting Started';

-- Convert "Marketing" to "pillar-2" (if any exist)
UPDATE posts SET pillar_tag = 'pillar-2' WHERE pillar_tag = 'Marketing';

-- Convert "Operations" to "pillar-4" (if any exist)
UPDATE posts SET pillar_tag = 'pillar-4' WHERE pillar_tag = 'Operations';

-- Convert "Client Experience" to "pillar-5" (if any exist)
UPDATE posts SET pillar_tag = 'pillar-5' WHERE pillar_tag = 'Client Experience';

-- Convert "Growth" to "pillar-6" (if any exist)
UPDATE posts SET pillar_tag = 'pillar-6' WHERE pillar_tag = 'Growth';

-- Convert "How To" to "how-to"
UPDATE posts SET pillar_tag = 'how-to' WHERE pillar_tag = 'How To';

-- Verify: Show distinct pillar_tag values after migration
SELECT DISTINCT pillar_tag FROM posts ORDER BY pillar_tag;
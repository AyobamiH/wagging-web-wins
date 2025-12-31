-- Fix Pillar 1 tag consistency to match new format
UPDATE posts 
SET pillar_tag = 'pillar-1' 
WHERE pillar_tag = 'Pillar 1';
-- Fix Pillar 1 og_image_url values to match actual files in public/og
UPDATE posts SET og_image_url = '/og/automating-pet-sitter-care-updates-whatsapp-email-client-portal.jpg' 
WHERE slug = 'automating-pet-sitter-care-updates-whatsapp-email-client-portal';

UPDATE posts SET og_image_url = '/og/calendly-vs-built-in-booking-for-pet-sitters.jpg' 
WHERE slug = 'calendly-vs-built-in-booking-for-pet-sitters';

UPDATE posts SET og_image_url = '/og/reduce-no-shows-pet-grooming-pet-sitting.jpg' 
WHERE slug = 'reduce-no-shows-pet-grooming-pet-sitting';

UPDATE posts SET og_image_url = '/og/route-optimization-dog-walking-schedule-uk.jpg' 
WHERE slug = 'route-optimization-dog-walking-schedule-uk';
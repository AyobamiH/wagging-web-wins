-- Add extras JSONB column to posts table for extended metadata
ALTER TABLE public.posts 
ADD COLUMN extras JSONB DEFAULT '{}';

-- Add comment to explain the extras column structure
COMMENT ON COLUMN public.posts.extras IS 'Extended metadata including primaryKeyword, secondaryKeywords, outline, imagePrompts, ctas, internalLinks, codeSnippets';

-- Insert Pillar 5 posts with full content and metadata
INSERT INTO public.posts (
  slug, title, excerpt, meta_title, meta_description, content, 
  pillar_tag, published, faq, og_image_url, cover_alt, extras
) VALUES 

-- Post 1: Story Frameworks
(
  'pet-brand-story-frameworks-that-convert',
  '5 Pet Brand Story Frameworks That Convert',
  'Stories sell care—fast. Use these five lightweight story frameworks to turn everyday moments into content that owners actually share (and book from).',
  '5 Pet Brand Story Frameworks That Convert',
  'Before/After, Rescue Arc, First-Day Jitters and more—plug-and-play story frameworks that win hearts and bookings. Includes hook bank + captions.',
  '## Why stories work for pet services

Owners don''t compare features; they imagine outcomes. A simple story sequence helps them see calm drop-offs, safer walks, and happier pets—without jargon or pressure.

## Framework 1: Before / After (Transformation)

**Use when:** You improved something visible—coat condition, recall, confidence.

**Beats:**
1. Before (problem in one line)
2. The plan (what you changed)  
3. After (what''s better + how owner feels)

**On-screen text (Reel):** "Before → Plan → After → What changed for {PetName}"

**Caption template:**
"Before: {issue}. Plan: {steps}. After: {result} in {timeframe}. If you want this for your pet in {Area}, book here {link}."

**Example hook:** "He hid under the table for 10 minutes at drop-off…"

## Framework 2: Rescue Arc (Confidence Builder)

**Use when:** A nervous or rehomed pet makes measurable progress.

**Beats:** Meet → First small win → Setback → New steady baseline → Owner quote.

**Ethics:** Get consent; avoid trauma details.

> "Progress is never linear; we celebrate tiny steps."

## Framework 3: First-Day Jitters (Reassurance)

**Use when:** New client onboarding.

**Beats:** Arrival jitters → Calm routine → First snack/water/settle → Message to owner → Smile at pickup.

**One-liner CTA:** "Nervous first days are normal. Our routine helps pets settle."

## Framework 4: Quiet Hero (Unseen Work)

**Use when:** You do safety or care tasks the public rarely sees.

**Beats:** Risk → Preventive step → Why it matters → Outcome.

**Examples:** Hydration checks in heat, paw inspections after winter salt, double-clip harness.

**Caption closer:** "Quiet tasks, big comfort."

## Framework 5: Seasonal Spark (Timely Help)

**Use when:** High-interest events (Bonfire Night, heatwaves, Christmas travel).

**Beats:** Risk → Two practical tips → Optional product/tool → Booking CTA.

**Hook lines:**
- "Fireworks are coming. Here''s a 3-step calm plan."
- "Heat is sneaky. Check this on your walk."

## 15 Plug-and-Play Hooks (copy/paste)

1. "He didn''t bark—he exhaled."
2. "The first 5 minutes decide the next 50."
3. "Progress looked like… one paw out from the crate."
4. "We changed one thing. Everything felt easier."
5. "A towel and 30 seconds: the post-walk reset."
6. "A harness tweak stopped the zig-zag."
7. "From zoomies to zzz''s in three steps."
8. "Why we always carry a spare lead."
9. "The drop-off goodbye that actually helps."
10. "The text I send at minute 15."
11. "Fireworks week: your micro-routine."
12. "Summer walks: the 8am rule."
13. "Nervous nails? Try this rhythm."
14. "New puppy? Here''s the first week script."
15. "Travel day with pets: the 3-bag system."

## Posting rhythm that compounds

- **1 story per week** (pick a framework).
- **Pin 1 Before/After** to your profile & website gallery.
- **Turn stories into GBP posts** with one photo + 2-line tip.
- **Email**: monthly "This month''s quiet win" with a single CTA.',
  'pillar-5',
  true,
  '[
    {
      "question": "How often should I post stories?",
      "answer": "Aim for one solid story per week, repurposed to Reels, GBP, and your email newsletter."
    },
    {
      "question": "What if I don''t have dramatic transformations?",
      "answer": "Use Quiet Hero—show small safety and comfort wins. Owners value the care behind the scenes."
    },
    {
      "question": "Can I share client pets publicly?",
      "answer": "Get written consent. Avoid sensitive details, and use first names or initials only."
    }
  ]',
  '/og/pet-brand-story-frameworks-that-convert.jpg',
  'Before and after showing calmer pet post-service.',
  '{
    "primaryKeyword": "pet brand story frameworks",
    "secondaryKeywords": ["pet care stories", "social media content", "pet business marketing"],
    "imagePrompts": {
      "coverPrompt": "Side-by-side before/after of a calm, freshly groomed dog; warm indoor light.",
      "coverAlt": "Before and after showing calmer pet post-service."
    },
    "ctas": {
      "primary": "Get the Hook Bank",
      "secondary": "Book a 20-min story workshop"
    },
    "internalLinks": [
      "pet-groomer-reels-that-book-30-minutes",
      "pet-care-welcome-email-sequence-reduce-cancellations", 
      "pet-care-monthly-tips-content-calendar-gbp-email"
    ]
  }'
),

-- Post 2: Reels
(
  'pet-groomer-reels-that-book-30-minutes',
  'Reels That Book: 6 Shots in 30 Minutes (Groomers)',
  'You don''t need a studio. Use this 30-minute filming loop—six simple shots, one tidy caption, a single CTA—and post twice a week without burning out.',
  'Reels That Book: 6 Shots in 30 Minutes (Groomers)',
  'A repeatable 30-minute filming plan with six shots, on-screen text, captions, and B-roll ideas—designed to convert views into bookings.',
  '## The 30-Minute Filming Loop (twice weekly)

**Gear:** Phone, tripod, window light/ring light, lint roller.
**Setup:** Clean your table; turn labels away; wipe lens.

### Shot List (6 clips × ~4–6s each)

1. **Arrival hello:** Nose boop or gentle eye contact. *Text:* "Meet {PetName}"
2. **Calm set-up:** Collar off, loop on, slow stroke. *Text:* "Safety first"
3. **First trim pass / brush:** Smooth, steady motion. *Text:* "Step 1: Tidy"
4. **Detail moment:** Paws/ears with pause gesture. *Text:* "Gentle detail"
5. **Reset break:** Water/sniff/stretch. *Text:* "Comfort check"
6. **Reveal:** Tail wag + soft smile. *Text:* "All done!"

**Edit order:** 1 → 2 → 3 → 5 → 4 → 6 (energy dip then lift).
**Music:** Any calm, upbeat track. Keep consistent.

## On-screen text + caption formula

**Hook (first 1s):** "What a calm groom looks like."

**Caption (paste-ready):**
"Here''s our calm-first routine for {PetName}: set-up, tidy, gentle detail, and breaks that keep tails wagging. New to us in {Area}? Book a quiet intro slot: {link}.
P.S. Sensitive dog? Tell us what helps—we listen."

**Hashtags (swap location):** `#{Area} #petgroomer #calmgroom #doggrooming #petcare #newclient #beforeafter`

## 3 Ready-to-Shoot Variations

- **''First Visit'' Reel:** Add a title card: "First visit? Here''s our intro." Include a short checklist (water, treats, breaks).
- **''Summer Trim'' Reel:** Start with temp/heat card; include "cooling break" clip.
- **''Senior Dog'' Reel:** Softer light; extra support under belly; "We go slower" card.

## B-roll bank (shoot once, reuse forever)

- Towel folded, brush drawer opening, paw balm close-up, bin bag swap, lint roller pass.
- 2–3 client quote overlays (with permission).

## Conversion boosters

- **Pinned comments:** "Book an intro slot: {link}"
- **Autoreply DM:** "Thanks for your message! For prices/availability: {link}."
- **CTA lower-third sticker:** "New? Tap to book."

## Common pitfalls (and fixes)

- **Shaky camera:** Use a tripod; crop in post.
- **Harsh light:** Face the window; avoid overhead only.
- **Long clips:** Keep shots under 6 seconds; trim pauses.',
  'pillar-5',
  true,
  '[
    {
      "question": "How often should I post Reels?",
      "answer": "Twice weekly is sustainable for most solos. Use the same 6-shot loop with small variations."
    },
    {
      "question": "Do Reels need voiceover?",
      "answer": "No. Clear on-screen text plus steady visuals is enough. Add VO only if it''s natural for you."
    },
    {
      "question": "What if a pet is stressed?",
      "answer": "Stop filming, prioritise care, and don''t post. Respect and safety come first."
    }
  ]',
  '/og/pet-groomer-reels-that-book-30-minutes.jpg',
  'Simple grooming setup filming for social video.',
  '{
    "primaryKeyword": "pet groomer reels",
    "secondaryKeywords": ["grooming video content", "pet business social media", "Instagram reels"],
    "imagePrompts": {
      "coverPrompt": "Phone on tripod filming a groom table with calm, even light.",
      "coverAlt": "Simple grooming setup filming for social video."
    },
    "ctas": {
      "primary": "Get the Reels Pack",
      "secondary": "Book a content sprint"
    },
    "internalLinks": [
      "pet-brand-story-frameworks-that-convert",
      "pet-care-welcome-email-sequence-reduce-cancellations",
      "pet-care-monthly-tips-content-calendar-gbp-email"
    ]
  }'
),

-- Post 3: Welcome Email
(
  'pet-care-welcome-email-sequence-reduce-cancellations',
  'Pet-Care Welcome Email: Reduce Cancellations',
  'Set the tone from day one. This four-part welcome sequence uses warm microcopy and clear steps so clients feel guided—not lectured—while you cut no-shows and last-minute chaos.',
  'Pet-Care Welcome Email: Reduce Cancellations',
  'Copy-paste a 4-email welcome sequence that sets expectations, reduces no-shows, and keeps things friendly and clear.',
  '## How this sequence works

- **Tone:** Friendly, plain English (owner-first).
- **Timing:** Send Email 1 immediately; 2 within 24h; 3 three days before service; 4 after completion.
- **Automation:** Your booking tool + n8n/Zapier.

### Email 1 — "You''re booked! Here''s what happens next"

**Subject options:**
- "All set for {PetName} on {Date} 🎉"
- "Dates saved! A quick hello from {Brand}"

**Body (paste-ready):**
Hi {FirstName},
Thanks for booking {Service} on {DateTime}. We''re excited to look after {PetName}.

**Next steps (takes 1 minute):**
1. Add any notes we should know: {ClientPortalLink}
2. Payment/deposit: {PaymentLink} (fully refundable up to {Window}).

Questions? Just hit reply—we''re quick.

Warmly,
{Name} at {Brand} | {Phone} | {Website}

### Email 2 — "How we keep {PetName} comfy"

**Subject:** "Our calm-first routine for {PetName}"

**Body:**
Hi {FirstName},
A quick look at how we keep pets settled: arrival hello, slow set-up, short breaks, and a message to you at minute 15.

**Bring/prepare:** Water, favourite treats, lead/harness, vet contact.
**If you need to change your time:** Reschedule link: {RescheduleLink} (no fee before {Window}).

See you soon!
—{Brand}

### Email 3 — "Your reminder + quick checklist"

**Subject:** "Tomorrow with {PetName}—2 quick checks"

**Body:**
Hi {FirstName},
We''ll see you {TomorrowTime}. Quick checks:

- Is {PetName} wearing a comfy, fitted harness/lead?
- Any updates on health, meds, or mood today? Reply here.

Running late? Let us know—there''s usually a solution.
—{Brand}

### Email 4 — "Thank you + what happens next"

**Subject:** "Thank you for trusting us with {PetName}"

**Body:**
Hi {FirstName},
{PetName} did brilliantly today. Here''s your summary: {LinkToReport/Photos}.

If you were happy, a short review helps other owners decide: {ReviewLink}.
Want to save your next slot? Book here: {BookingLink}.

Thank you,
—{Brand}

## Microcopy you can paste on your site

> "Need to change something? Use our reschedule link—no fee before {Window}. Life happens; we''ll help."

## SMS snippets (optional)

- "We''ve reserved {Date}. Pay deposit here: {Link} (fully refundable up to {Window})."
- "Running late? Reply here—we''ll do our best to adjust."',
  'pillar-5',
  true,
  '[
    {
      "question": "How many emails is too many?",
      "answer": "Four is the sweet spot: confirmation, comfort routine, reminder, and thank-you with next steps."
    },
    {
      "question": "When should I send the reminder?",
      "answer": "24 hours before the service, plus a same-day SMS if relevant."
    },
    {
      "question": "Can I soften policy language?",
      "answer": "Yes—lead with care and clarity: give options, explain why, and link to full terms without legalese."
    }
  ]',
  '/og/pet-care-welcome-email-sequence-reduce-cancellations.jpg',
  'Welcome email preview with simple checklist.',
  '{
    "primaryKeyword": "pet care welcome email",
    "secondaryKeywords": ["email sequence", "client onboarding", "reduce cancellations"],
    "imagePrompts": {
      "coverPrompt": "Friendly, minimal email UI mockup with a checklist sidebar.",
      "coverAlt": "Welcome email preview with simple checklist."
    },
    "ctas": {
      "primary": "Get the Sequence",
      "secondary": "Book a quick setup call"
    },
    "internalLinks": [
      "reduce-no-shows-pet-grooming-pet-sitting",
      "pet-brand-story-frameworks-that-convert",
      "pet-groomer-reels-that-book-30-minutes"
    ]
  }'
),

-- Post 4: Monthly Tips
(
  'pet-care-monthly-tips-content-calendar-gbp-email',
  '12-Month Pet-Care Content Calendar (GBP + Email)',
  'Post once, repurpose twice. Use this month-by-month plan to publish a helpful tip, convert it into a GBP post, and paste a short email—all in under an hour.',
  '12-Month Pet-Care Content Calendar (GBP + Email)',
  'A ready calendar of monthly tips you can post to your blog, repurpose to Google Business Profile, and send by email—each with a clear CTA.',
  '## How to use this calendar

1. Publish the **blog post** (short + practical).
2. Convert to **GBP post** (120–150 words, 1 image).
3. Paste the **email snippet** with one CTA.
4. Track clicks with UTMs (e.g., `?utm_source=gbp&utm_medium=post&utm_campaign={month}`).

### January — "Cold-Weather Paw Care"

- **Blog title:** "Winter Walks: 3 Quick Paw-Care Habits"
- **GBP post draft:** "Road salt and grit can irritate paws. Rinse after walks, pat dry, and check between toes. If you spot redness, pause long routes for a few days. Need help with weekday walks? We''ve got calm, short routes for winter."
- **Email subject:** "Paw-care in 90 seconds"
- **Email snippet:** "Rinse, dry, quick check. That''s it. We''re running shorter winter routes if {PetName} needs a gentle week."
- **CTA:** "Book a winter walk plan"

### February — "Confidence for Nervous Dogs"

- **Blog:** "Nervous to Noticing: Micro-Wins on Walks"
- **GBP:** "One new sound + one calm pause = progress. We work at your dog''s pace."
- **Email:** "Tiny wins for sensitive souls"
- **CTA:** "Try a calm-intro walk"

### March — "Spring Groom Prep"

- **Blog:** "De-shedding Without Drama: A Simple Routine"
- **GBP:** "Short sessions, soft tools, and water breaks. That''s our de-shed approach."
- **Email:** "Spring coats, simple plan"
- **CTA:** "Book a de-shed slot"

### April — "Bank Holiday Travel Tips"

- **Blog:** "Travel Day with Pets: The 3-Bag System"
- **GBP:** "Essentials bag, comfort bag, paperwork pouch. Message us for our printable list."
- **Email:** "3-bag system for travel day"
- **CTA:** "Grab the checklist"

### May — "Puppy Socials (Low-Pressure)"

- **Blog:** "Gentle Socials: Quality Over Quantity"
- **GBP:** "Short interactions, distance first, then duration. Ask about our ''quiet hour'' slots."
- **Email:** "Socials the soft way"
- **CTA:** "Book a quiet hour"

### June — "Heat-Smart Walks"

- **Blog:** "Cool Routes: Early Walks & Shade Games"
- **GBP:** "8am rule, shade loops, water on us. We''ll skip tarmac when temps rise."
- **Email:** "Heat plan for {PetName}"
- **CTA:** "Switch to morning slots"

### July — "Holiday Sitter Checklist"

- **Blog:** "Your 10-Minute Sitter Handover"
- **GBP:** "Med notes, feeding pic, safe spots, vet details. Save this template."
- **Email:** "The easiest handover"
- **CTA:** "Download handover sheet"

### August — "Enrichment at Home"

- **Blog:** "Rainy-Day Calm: 5-Minute Enrichment"
- **GBP:** "Sniff mats, frozen treats, simple hide-and-seek. We''ll send our starter guide."
- **Email:** "Five-minute calm kit"
- **CTA:** "Get the enrichment guide"

### September — "Back-to-School Routine Reset"

- **Blog:** "New Routines: Reduce Separation Wobbles"
- **GBP:** "Short departures, safe spot, calm return. We can do check-ins."
- **Email:** "Routine resets made easy"
- **CTA:** "Book check-in visits"

### October — "Fireworks Anxiety Plan"

- **Blog:** "Bonfire Night: Your 7-Day Prep"
- **GBP:** "Safe den, sound practice, ID check, calm snacks. Need help on the night? Ask about drop-ins."
- **Email:** "7-day fireworks plan"
- **CTA:** "Get the prep checklist"

### November — "Senior Pet Comfort"

- **Blog:** "Gentle Support: Senior Walks & Ramps"
- **GBP:** "Shorter routes, soft surfaces, water breaks. Tell us what feels best."
- **Email:** "Comfort first for seniors"
- **CTA:** "Try a comfort route"

### December — "Holiday Safety & Closures"

- **Blog:** "Festive Safety: Foods to Avoid + Calm Corners"
- **GBP:** "We''re closed on {dates}; emergency contacts included. Save our calendar."
- **Email:** "Holiday safety + hours"
- **CTA:** "See holiday hours"

## Repurpose checklist (10 minutes per channel)

- Swap the **first two sentences** to suit the channel.
- Add **one photo** that literally shows the tip.
- Paste a **single, clear CTA** with the same link (UTM-tagged).',
  'pillar-5',
  true,
  '[
    {
      "question": "How long should my GBP posts be?",
      "answer": "120–150 words with one clear image and a single CTA link is plenty."
    },
    {
      "question": "Can I reuse the same tip across channels?",
      "answer": "Yes—change the first lines and the image framing. Keep the CTA identical for tracking."
    },
    {
      "question": "What if I miss a month?",
      "answer": "Pick up with the current month. Consistency beats perfection."
    }
  ]',
  '/og/pet-care-monthly-tips-content-calendar-gbp-email.jpg',
  'Monthly content calendar with pet-care notes.',
  '{
    "primaryKeyword": "pet care content calendar",
    "secondaryKeywords": ["Google Business Profile", "email marketing", "content repurposing"],
    "imagePrompts": {
      "coverPrompt": "Clean monthly calendar on a desk with a paw print sticky note.",
      "coverAlt": "Monthly content calendar with pet-care notes."
    },
    "ctas": {
      "primary": "Get the Calendar",
      "secondary": "Book a setup call"
    },
    "internalLinks": [
      "pet-groomer-reels-that-book-30-minutes",
      "pet-brand-story-frameworks-that-convert",
      "pet-care-welcome-email-sequence-reduce-cancellations"
    ]
  }'
)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  content = EXCLUDED.content,
  pillar_tag = EXCLUDED.pillar_tag,
  faq = EXCLUDED.faq,
  og_image_url = EXCLUDED.og_image_url,
  cover_alt = EXCLUDED.cover_alt,
  extras = EXCLUDED.extras,
  updated_at = now();
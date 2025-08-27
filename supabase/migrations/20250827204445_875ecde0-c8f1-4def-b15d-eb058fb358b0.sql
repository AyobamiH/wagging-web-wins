-- Create posts table for Pillar 6 content
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content TEXT NOT NULL,
  faq JSONB,
  pillar_tag TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  og_image_url TEXT,
  cover_alt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create site_settings table for reviewCount
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_count JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for posts (public read for published content)
CREATE POLICY "Posts are viewable by everyone" 
ON public.posts 
FOR SELECT 
USING (published = true);

-- Create policies for site_settings (public read for review_count only)
CREATE POLICY "Review count is viewable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Create indexes
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_pillar_tag ON public.posts(pillar_tag);
CREATE INDEX idx_posts_published ON public.posts(published, published_at DESC);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed review count data
INSERT INTO public.site_settings (review_count) VALUES (
  '{
    "total": 312,
    "average": 4.8,
    "breakdown": {
      "5": 267,
      "4": 35,
      "3": 8,
      "2": 2,
      "1": 0
    }
  }'
);

-- Seed Pillar 6 posts
INSERT INTO public.posts (slug, title, excerpt, meta_title, meta_description, content, faq, pillar_tag, og_image_url, cover_alt) VALUES
(
  'peak-season-pet-sitting-pricing-deposits-caps-waitlists-uk',
  'Peak-Season Pet Sitting Pricing: Deposits, Caps & Waitlists That Keep Clients Happy',
  'Peak season doesn''t have to mean chaos. Use a simple policy stack—deposit, capacity cap, and a fair waitlist—to protect margins, reduce cancellations, and keep communication warm and clear.',
  'Peak-Season Pet Sitting Pricing: Deposits, Caps & Waitlists',
  'Protect margins in peak season with a simple stack: deposits, booking caps, waitlists, and friendly comms you can copy.',
  '# Peak-Season Pet Sitting Pricing: Deposits, Caps & Waitlists That Keep Clients Happy

Peak season doesn''t have to mean chaos. When demand spikes (half terms, summer, Bonfire Night, Christmas/New Year), "first come, first served" turns messy—double bookings, last-minute cancellations, stressed customers. A three-part stack keeps you in control and customers informed:

## Why peak season needs a policy stack

1. **Deposit** to create commitment.
2. **Capacity cap** to protect service quality.
3. **Waitlist** to capture overflow without promising the impossible.

## Step 1: Deposits that feel fair (and stick)

* **Amount:** 25–50% works well. For short jobs, consider a **flat £10–£25** deposit.
* **Refund window:** e.g., **100% refundable up to 14 days before** the start date; transferable once after that.
* **Payment methods:** Card at booking or link via invoice. Avoid manual bank transfers in peak weeks.

**Microcopy for your website:**

> "A small deposit saves your dates and helps us maintain fair availability for all clients. Fully refundable up to 14 days before your booking."

### Confirmation message (paste-ready)

**Subject:** Your dates are reserved 🎉

**Body (SMS/Email):**
"Thanks, {First Name}! We''ve reserved {Dates}. A £{Amount} deposit secures your spot. Pay here: {Link}. It''s fully refundable up to {Refund Window}. Questions? Just reply to this message."

## Step 2: Capacity caps that protect quality

* **Daily cap:** Define max pets/visits per day you can deliver to your standard.
* **Blackout rules:** Pre-block any days you wouldn''t be proud to operate at.
* **Visible signal:** Add a "Limited spots this week" banner during peaks.

**Capacity maths (quick guide):**
Max daily visits = (Available hours – Travel buffer) ÷ Average visit length.
Add 20% wiggle room for emergencies.

## Step 3: A waitlist that feels respectful (not second class)

* **Rules:** First-come, first-served; 12–24 hours to accept once a slot opens.
* **Expiry:** Offers expire automatically; the next person gets a shot.
* **Auto-notify:** Fire a text + email when a spot opens.

**Waitlist microcopy:**

> "Full on your dates? Join the waitlist. We''ll text you if a slot opens. You''ll have 24 hours to confirm before we offer it to the next client."

## Tools & automation (low-effort wins)

* **Calendly (or your booking tool):** Require deposit on booking for peak categories.
* **n8n/Zapier:** "Cancellation → notify top 3 on waitlist → auto-expire in 24h → move to next."
* **Capacity sheet:** A simple Google Sheet counting daily slots is often enough.

## Communicate early, often, and kindly

* **Pre-season announcement:** Post to your blog, email list, and Google Business Profile with key dates, deposit policy, and link to book.
* **Reminders:** Friendly "complete your deposit" nudges 24h and 72h after a provisional booking.
* **Declines:** Offer waitlist + alternative dates so "no" still feels helpful.

**Decline + waitlist template:**
"Thanks so much, {Name}. We''re fully booked for {Dates}, but we can add you to our waitlist and text you if anything opens. We can also offer {Alternative Dates}. What suits?"

## Measure what matters

* **No-show rate:** Aim <3% with deposits + reminders.
* **Deposit recovery:** Track how many provisional bookings convert post-deposit.
* **Client satisfaction:** Ask one question: "How easy was booking during peak season?" (1–5)',
  '[
    {
      "q": "How much should I charge as a deposit?",
      "a": "25–50% works well; for short jobs, a £10–£25 flat deposit. Pair with a clear refund window (e.g., 14 days)."
    },
    {
      "q": "Do booking caps frustrate clients?",
      "a": "Not if you announce them early, explain the quality reason, and offer a fair waitlist with clear expiry."
    },
    {
      "q": "How do I automate waitlist alerts?", 
      "a": "Use your booking tool''s notifications or a simple n8n flow: ''cancellation → SMS/email top 3 → 24-hour expiry → next person.''"
    }
  ]',
  'pillar-6',
  'https://tailwaggingwebdesign.com/og/pillar6-peak-season.jpg',
  'Calendar showing fully booked peak dates with a waitlist indicator'
),
(
  'pet-business-partnerships-playbook-vets-groomers-trainers',
  'How to Win Partners: What Vets, Groomers & Trainers Want to See Before Recommending You',
  'Partnerships work when both sides win. Here''s exactly what vets, groomers, and trainers want to see—proof, process, and co-marketing—so they feel confident recommending you.',
  'Partner Playbook for Pet Pros: Vets, Groomers & Trainers',
  'What partners need before recommending you—proof, processes, scripts, co-marketing ideas, and a simple ROI tracker.',
  '# How to Win Partners: What Vets, Groomers & Trainers Want to See Before Recommending You

Partnerships work when both sides win. Here''s exactly what vets, groomers, and trainers want to see—proof, process, and co-marketing—so they feel confident recommending you.

## Start with what each partner values

**Vets:** Safety first. Clear escalation protocol, vaccination stance, record-keeping, insurance, DBS, AAL (if applicable).

**Groomers:** Punctuality, before/after proof, gentle-handling standards, cross-promos.

**Trainers:** Consistency between sessions, behaviour notes, post-care homework for owners.

## Build your "Proof Pack" once—reuse forever

* **Safety & Standards page:** Insurance, DBS, AAL, hygiene, emergency plan, named vet contact.
* **3 micro-cases:** Problem → action → result (e.g., separation anxiety → structured routine → calmer dog).
* **Review snippets:** Highlight keywords partners care about (reliability, calm handling, communication).
* **Service overview one-pager:** Exactly what you do, where, hours, response time, pricing from £X.

**Leave-behind checklist:** One-pager + business cards with QR to a partner-only landing page.

## Outreach scripts (email/DM/printed letter)

**Subject:** Can we make life easier for your clients?

"Hi {Name}, I run {Brand}—we help your clients with {very specific scenarios}. We''ve attached a one-page overview with our safety protocols, insurance and DBS.

To make this easy: we''ll do the legwork—co-write a short guide for your clients, add your logo, and report monthly on any referrals you receive.

Would you be open to a 10-minute chat next week? Here''s my calendar: {Calendly}. If easier, reply with a time and I''ll meet you at your place."

## Co-marketing calendar (lightweight)

* **Monthly theme:** e.g., "New Puppy Month," "Holiday Travel Prep," "Fireworks Anxiety."
* **What we provide:** A5 printable, one blog post, a GBP post draft, 2x Instagram captions, 1x email paragraph.
* **Your logo here:** Partners love visibility—put them on the assets.

## Make tracking simple (and visible)

* **UTM links + referral code:** e.g., `?utm_source={Partner}&utm_medium=referral`
* **Sheet columns:** Date, Partner, Lead name, Service, Outcome, Value, Notes.
* **Monthly mini-report:** "You sent 4 leads; 3 booked; £310 value; 1 five-star review mentioned you."

## Pitfalls to avoid

* Vague asks ("put our leaflet on your desk?").
* No follow-up or results reporting.
* Overpromising coverage or response times.',
  '[
    {
      "q": "How many partners should I approach first?",
      "a": "Start with 3–5 quality partners you can serve well and report to consistently."
    },
    {
      "q": "What''s a fair referral incentive?",
      "a": "Try a give-get: a small client discount and a partner credit or donation to their chosen charity."
    },
    {
      "q": "How do I show results to partners?",
      "a": "Send a simple monthly report: leads received, bookings, value, selected feedback highlights—kept to one page."
    }
  ]',
  'pillar-6',
  'https://tailwaggingwebdesign.com/og/pillar6-partnerships.jpg',
  'Pet professional shaking hands with a veterinary partner'
),
(
  'productized-pet-care-services-pricing-bundles-add-ons',
  'Productise Your Pet-Care Services: 3 Tiers, Smart Bundles & Add-Ons That Sell Themselves',
  'Turn your services into easy-to-choose "products." Use three simple tiers, a few thoughtful add-ons, and clear bundles so clients understand value in seconds—no awkward sales chat required.',
  'Productise Pet-Care Services: Tiers, Bundles & Add-Ons',
  'Package services into clear tiers with add-ons and bundles. Includes UX examples and a pricing checklist.',
  '# Productise Your Pet-Care Services: 3 Tiers, Smart Bundles & Add-Ons That Sell Themselves

Turn your services into easy-to-choose "products." Use three simple tiers, a few thoughtful add-ons, and clear bundles so clients understand value in seconds—no awkward sales chat required.

## Why productising works

* **Clarity:** Clients compare like for like.
* **Speed:** Fewer emails to "explain how it works."
* **Higher AOV:** Add-ons and bundles lift order value without pressure.

## The 3-tier framework (rename to fit your brand)

* **Starter:** Core outcome. Example—Dog Walk Standard: 30-min walk, GPS log, one photo.
* **Pro (Most Booked):** Adds the popular extras. Example—45-min walk, basic enrichment, 3 photos, towel dry.
* **Elite (Limited):** Premium touches and priority access. Example—60-min walk, enrichment plan, mini training reinforcement, same-walker guarantee.

**Anchoring tip:** Price Pro to look like strong value vs Elite, and more compelling than Starter.

## Add-ons that make sense (3–5 max)

* **Pickup window guarantee:** Precise window for time-sensitive clients.
* **Updates pack:** Daily WhatsApp summary + extra photos.
* **Training top-up:** 10-minute reinforcement of trainer''s cues.
* **Key-safe install:** Upfront convenience, reduces scheduling friction.

**Website microcopy:**

> "Prefer extra updates or a precise pickup window? Add what you need—no fluff."

## Bundles clients actually understand

* **New Puppy Pack (4 weeks):** 3x short visits + 1x guidance call.
* **Holiday Travel Pack:** Sits + transport + daily updates.
* **Confidence Builder Pack:** Walks with gradual exposure plan + check-ins.

## UX that converts (fast)

* **Three cards, one highlighted:** "Most Booked" badge on Pro.
* **Feature bullets:** 3–5 max per tier.
* **Guarantee line:** "If we''re not a match in the first visit, we''ll refund the session."
* **FAQs right below the cards:** Solve objections where they occur.',
  '[
    {
      "q": "How many add-ons is too many?",
      "a": "Stick to 3–5 that clients genuinely ask for. More than that creates fatigue."
    },
    {
      "q": "Should I show monthly prices?",
      "a": "If you sell recurring walks/visits, show both per-session and a simple monthly example."
    },
    {
      "q": "How do I avoid option overload?",
      "a": "Highlight one ''Most Booked'' tier, keep bullets tight, and tuck advanced add-ons into a dropdown."
    }
  ]',
  'pillar-6',
  'https://tailwaggingwebdesign.com/og/pillar6-productize.jpg',
  'Three service tier cards for a pet-care business'
),
(
  'pet-care-referral-program-give-get-timing-tracking',
  'Referral Loops for Pet Pros: Friendly Give-Get Offers, Timing & Tracking That Works',
  'Referrals thrive on timing and clarity. Offer a simple give-get, ask at the right moment, and track with UTM links—then publicly thank supporters to keep the loop spinning.',
  'Pet-Care Referral Loops: Offers, Timing & Tracking',
  'Build a referral programme clients love: give-get incentives, perfect ask timing, UTM/coupon tracking, and thank-you scripts.',
  '# Referral Loops for Pet Pros: Friendly Give-Get Offers, Timing & Tracking That Works

Referrals thrive on timing and clarity. Offer a simple give-get, ask at the right moment, and track with UTM links—then publicly thank supporters to keep the loop spinning.

## Design a simple, ethical offer

* **Give-Get:** "£10 credit for you and your friend after their first completed booking."
* **One clear rule:** Applies after the first service is completed.
* **Fair caps:** Max 1 credit per new household; monthly redemption cap if needed.

**Microcopy (site):**

> "Invite a friend—when they complete their first booking, you both receive £10 credit. Simple, fair, and appreciated."

## Ask at the right moment

* **After a 5-star review** (they''re warm).
* **After a pet milestone** (graduated training, first successful sit).
* **Seasonal cards** (pre-Christmas, summer).
* **In every WhatsApp/email footer** (quiet reminder).

**Ask script (DM/email):**
"Thanks again for trusting us with {Pet Name}. If a friend could use help, here''s your link: {Referral Link}. When they complete their first booking, you both get £10 credit."

## Track without headaches

* **Referral link:** UTM source = `referral`, medium = `client`, campaign = `referrals`, plus a short code per client.
* **Coupon code:** `{CLIENTFIRST10}` applied after the first booking completes.
* **Sheet or CRM tags:** Track redemptions and the referring client automatically (n8n/Zapier).

**Automation idea (n8n):**
Trigger "coupon redeemed" → add credit to referrer → send thank-you note → log to sheet.

## Say thank you (publicly, with consent)

* **Social shout-outs:** "Huge thanks to S. for recommending us!"
* **Hand-written card:** Unexpected delight.
* **End-of-month leaderboard (optional):** Celebrate, don''t gamify too hard.

## Keep it fair & compliant

* **No spam:** Invite personally; provide opt-out.
* **Transparent terms:** One short page linked near the referral form.
* **No misleading claims:** Keep it honest about availability and credit timing.',
  '[
    {
      "q": "What incentive works best?",
      "a": "A modest give-get (e.g., £10 credit each) tied to a completed first booking drives action without eroding margins."
    },
    {
      "q": "How do I prevent abuse?",
      "a": "Limit to one use per new household, verify email/phone, and require service completion before credit applies."
    },
    {
      "q": "Should I cap monthly redemptions?",
      "a": "Yes, add a fair cap and review quarterly. If you hit the cap, it''s time to expand capacity."
    }
  ]',
  'pillar-6',
  'https://tailwaggingwebdesign.com/og/pillar6-referrals.jpg',
  'Happy dog owners sharing a referral card'
);
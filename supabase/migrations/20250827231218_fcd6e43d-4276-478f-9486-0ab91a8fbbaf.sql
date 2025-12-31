
-- Pillar 2 • Post 1
INSERT INTO public.posts (
  slug, title, excerpt, meta_title, meta_description, content, faq, pillar_tag, og_image_url, cover_alt, published_at
)
SELECT
  'pet-care-homepage-f-pattern-conversion-teardown',
  'What a High-Converting Pet-Care Homepage Looks Like (F-Pattern Teardown)',
  'Your homepage should answer three questions in five seconds: Who are you? Where do you serve? What should I do next? Use this F-pattern teardown to turn visits into bookings—without redesigning your whole site.',
  'Pet-Care Homepage Teardown: F-Pattern That Converts',
  'Build a pet-care homepage that books more clients. F-pattern layout, hero messaging, trust badges, CTAs, and microcopy you can copy.',
  $$<h2>The 5-Second Rule (Above the Fold)</h2>
  <ul>
    <li><strong>One-liner value prop:</strong> Trusted pet sitting & grooming in Northampton—book in minutes.</li>
    <li><strong>Service area & availability:</strong> Serving Northampton & nearby villages | New clients welcome.</li>
    <li><strong>Primary CTA:</strong> Book a Consultation. <strong>Secondary CTA:</strong> See Prices.</li>
    <li><strong>Trust at a glance:</strong> 5-star rating, insurance, DBS, AAL (if applicable).</li>
    <li><em>Microcopy:</em> Real-time availability. Fully insured. Gentle, fear-free handling.</li>
  </ul>
  <h2>F-Pattern Structure</h2>
  <ol>
    <li>Hero (left-aligned heading, right support image)</li>
    <li>Service cards (3–6, one-line outcomes)</li>
    <li>Social proof (top review + logos)</li>
    <li>Process (3 steps: Enquire → Confirm → Care)</li>
    <li>Pricing preview (from-prices + link to full pricing)</li>
    <li>Credibility row (safety & standards, insurance, training)</li>
    <li>FAQ (3–5 top objections)</li>
    <li>Final CTA band (sticky on mobile)</li>
  </ol>
  <h3>Service Cards That Sell</h3>
  <p><strong>Example:</strong> Home Visits (Cats & Small Pets) — Happy, stress-free pets at home.</p>
  <ul>
    <li>15–30 min</li>
    <li>Medication support</li>
    <li>Photo updates</li>
  </ul>
  <p><a href="/contact">Book a Consultation</a> · <a href="/pricing">See Prices</a> · <a href="/blog/pillar-4">Safety & Standards</a></p>
  <h3>Social Proof</h3>
  <p><strong>Quant cue:</strong> 362+ five-star reviews since 2019.</p>
  <blockquote>“They sent gentle updates that kept us sane during peak season.”</blockquote>
  <h3>Pricing Preview</h3>
  <p>Walks from £15 · Grooms from £45 · Sits from £29</p>
  <p><a href="/pricing">What affects price?</a> (travel, size, timing, add-ons)</p>
  <h3>FAQ That Unblocks Bookings</h3>
  <ul>
    <li>Do you cover my area?</li>
    <li>How do you handle anxious pets?</li>
    <li>What if I need to cancel?</li>
    <li>How do deposits work?</li>
  </ul>
  <h3>Conversion Boosters</h3>
  <ul>
    <li>Sticky mobile CTA: Get a Quote</li>
    <li>Above-fold phone button (urgent bookings)</li>
    <li>Inline availability note: 2 weekend slots left this month</li>
  </ul>
  <p><strong>Primary CTA:</strong> Download the Homepage Wireframe + Copy Prompts (PDF)</p>$$,
  '[
    {"q":"What should be above the fold on a pet-care homepage?","a":"A clear one-liner value prop, service area, primary CTA (Book/Quote), and trust badges (insurance, DBS, reviews)."},
    {"q":"How many services should I display on the homepage?","a":"Three to six cards with short outcomes. Deep details live on service pages."},
    {"q":"Do I need prices on the homepage?","a":"Show from-prices and link to full pricing. Clarity reduces drop-offs and price-shock."}
  ]'::jsonb,
  'pillar-2',
  '/og/blog.jpg',
  'Pet-care homepage layout following the F-pattern with hero, services, and reviews.',
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'pet-care-homepage-f-pattern-conversion-teardown');

-- Pillar 2 • Post 2
INSERT INTO public.posts (
  slug, title, excerpt, meta_title, meta_description, content, faq, pillar_tag, og_image_url, cover_alt, published_at
)
SELECT
  'pet-care-pricing-page-3-tiers-anchor-add-ons',
  'Price Pages That Don’t Confuse: 3 Tiers, 1 Anchor, Clear Add-Ons',
  'A pricing page is a decision tool—not an invoice. Use three tiers, one obvious “Most Booked” plan, and 3–5 add-ons. Keep the copy outcome-focused and show the path to book.',
  'Pet-Care Pricing Page: 3 Tiers & Clear Add-Ons',
  'Turn pricing into a confident “yes.” Three tiers, an anchored “Most Booked,” and simple add-ons that increase AOV—without overwhelming clients.',
  $$<h2>The Psychology of Three</h2>
  <ul>
    <li><strong>Starter:</strong> baseline outcome (for budget or simple needs)</li>
    <li><strong>Pro (Most Booked):</strong> best-value bundle most people choose</li>
    <li><strong>Elite:</strong> premium touches + priority access; limited slots protect quality</li>
  </ul>
  <p><strong>Anchoring tip:</strong> Price Pro so it clearly out-values Elite and feels worth the step-up from Starter.</p>
  <h2>Copy That Converts (per card)</h2>
  <ul>
    <li>Name: “Puppy Starter,” “Calm Groom,” “Travel-Ready Sit”</li>
    <li>Outcome line: “Daily routine kept + gentle reassurance”</li>
    <li>Bullets (3–5): what they get, not internal ops</li>
    <li>Guarantee: refund the session if not a match on first visit</li>
    <li>CTA: “Book Now” or “Check availability”</li>
  </ul>
  <h2>Add-Ons: The Smart Extras (3–5)</h2>
  <ul>
    <li>Updates Pack: extra photos + WhatsApp summary</li>
    <li>Training Top-Up: 10 minutes reinforcing trainer cues</li>
    <li>Pickup Window Guarantee: precise time window</li>
    <li>Key-Safe Install</li>
  </ul>
  <p><em>Microcopy:</em> Prefer extra updates or a precise pickup window? Add what you need—no fluff.</p>
  <h2>From-Prices & Transparency</h2>
  <p>Show “from” rates and typical ranges. Explain what moves price: travel, size, timing, special handling.</p>
  <h2>Handle Objections Inline</h2>
  <p>FAQ under cards: cancellation, deposits, anxious pets, meds. Small print in plain English.</p>
  <h2>Design Notes (mobile-first)</h2>
  <ul>
    <li>Highlight the “Most Booked” card</li>
    <li>Big CTAs (≥44px)</li>
    <li>Mobile order: Pro → Starter → Elite</li>
    <li>Sticky summary bar after choosing add-ons</li>
  </ul>
  <p><strong>Primary CTA:</strong> Download Pricing Page Checklist + Copy Prompts (PDF)</p>$$,
  '[
    {"q":"How many pricing tiers should I use?","a":"Three tiers convert best: Starter, Pro (Most Booked), and Elite."},
    {"q":"How many add-ons should I list?","a":"Three to five. More creates decision fatigue and reduces conversions."},
    {"q":"Should I show from prices?","a":"Yes. From-prices reduce uncertainty and help qualified buyers self-select."}
  ]'::jsonb,
  'pillar-2',
  '/og/blog.jpg',
  'Pet-care pricing tier cards with a highlighted Most Booked option.',
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'pet-care-pricing-page-3-tiers-anchor-add-ons');

-- Pillar 2 • Post 3
INSERT INTO public.posts (
  slug, title, excerpt, meta_title, meta_description, content, faq, pillar_tag, og_image_url, cover_alt, published_at
)
SELECT
  'pet-care-gallery-that-sells-before-after-reels-trust',
  'Gallery Pages That Sell: Before/After, Reels & Trust Badges',
  'People don’t book because your photos are pretty. They book because your photos reduce risk. Use before/after storytelling, short reels, and trust badges to show gentle handling, outcomes, and consistency.',
  'Pet-Care Gallery That Sells: Before/After & Reels',
  'Turn your gallery into a sales page: before/after storytelling, short reels, safety badges, and captions that answer buyer questions.',
  $$<h2>Build Your Gallery Like a Case Study</h2>
  <h3>Section 1 — Before/After</h3>
  <p><strong>Before:</strong> tangled coat/anxious pet (owner consent).</p>
  <p><strong>After:</strong> calm pet, clean finish, happy owner quote.</p>
  <p><em>Caption:</em> 45-min calm groom | No muzzling | Breaks for reassurance.</p>
  <h3>Section 2 — Process Reels (10–20s)</h3>
  <ul>
    <li>What a 30-min visit looks like</li>
    <li>Fear-free nail trim, start to finish</li>
    <li>First day with a nervous rescue</li>
  </ul>
  <h3>Section 3 — Outcomes Grid</h3>
  <ul>
    <li>Shinier coat</li>
    <li>Happy, tired dog</li>
    <li>Medication given correctly</li>
    <li>Clean workspace</li>
  </ul>
  <h2>Captions That Answer Sales Questions</h2>
  <ul>
    <li>How long did it take?</li>
    <li>What tools/products did you use?</li>
    <li>How did you keep them calm?</li>
    <li>What did the owner say after?</li>
  </ul>
  <p><em>Template:</em> 15-min visit for Luna (NN2). Litter cleaned, meds given, 3 photo updates. Owner: “Came home to a relaxed cat—thank you!”</p>
  <h2>Trust & Safety in the Gallery</h2>
  <p>Badges inline: Insurance, DBS, first aid, Fear Free. Consent line and hygiene notes.</p>
  <h2>Technical Tips</h2>
  <ul>
    <li>Compress images (WebP) and lazy-load</li>
    <li>Descriptive alt text (pet name, service, area)</li>
    <li>Group reels by theme</li>
  </ul>
  <h2>UGC Section</h2>
  <p>Invite clients to submit photos with consent; add a referral CTA.</p>
  <p><strong>Primary CTA:</strong> Download the Gallery Shot-List + Caption Prompts</p>$$,
  '[
    {"q":"What photos convert best for groomers and sitters?","a":"Before/after sequences, calm-handling moments, and what-the-visit-looks-like reels."},
    {"q":"How many images per gallery section?","a":"Six to nine per section keeps load times fast and avoids fatigue."},
    {"q":"Do I need owner consent to post photos?","a":"Yes—add a consent checkbox in your intake form and show a short consent line on the gallery page."}
  ]'::jsonb,
  'pillar-2',
  '/og/blog.jpg',
  'Pet-care gallery with before/after photos, reels, and trust badges.',
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'pet-care-gallery-that-sells-before-after-reels-trust');

-- Pillar 2 • Post 4
INSERT INTO public.posts (
  slug, title, excerpt, meta_title, meta_description, content, faq, pillar_tag, og_image_url, cover_alt, published_at
)
SELECT
  'mobile-first-pet-sitter-ux-thumb-reach-tap-targets',
  'Mobile-First for Walkers & Sitters: Thumb-Reach CTAs + Bigger Tap Targets',
  'If your site frustrates thumbs, it bleeds bookings. Optimise for one-hand use: big tap targets, sticky actions, fast loads, and forms that don’t feel like work.',
  'Mobile-First Pet Sitter UX: Thumb-Reach & Tap Targets',
  'Most bookings start on phones. Use thumb-zone CTAs, ≥44px tap targets, sticky actions, and speedy pages to win on mobile.',
  $$<h2>Design for the Thumb Zone</h2>
  <ul>
    <li>Primary actions within easy reach (bottom-right/center)</li>
    <li>Sticky action bar: Get Quote • Call • WhatsApp</li>
    <li>CTA hierarchy: one primary, one secondary</li>
  </ul>
  <h2>Tap-Target & Text Basics</h2>
  <ul>
    <li>Buttons/links ≥ 44px height</li>
    <li>Readable text (min 16px) and 45–75 chars line length</li>
    <li>Generous spacing to avoid mis-taps</li>
  </ul>
  <h2>Mobile Nav That Doesn’t Hide the Shop</h2>
  <p>Keep Book/Quote visible; add Call now on peak days; concise labels (Prices, Services, Areas).</p>
  <h2>Forms That Don’t Kill Momentum</h2>
  <ul>
    <li>Stepper forms (3–5 steps) with progress</li>
    <li>Smart defaults (postcode prefix), good date pickers</li>
    <li>Friendly error messages</li>
  </ul>
  <h2>Performance = Trust</h2>
  <ul>
    <li>Compress images, lazy-load, prefetch next page</li>
    <li>Avoid heavy animation on low-end devices</li>
    <li>Prevent layout shift with reserved space</li>
  </ul>
  <h2>Accessibility That Helps Everyone</h2>
  <ul>
    <li>Visible focus states and contrast</li>
    <li>Clear labels (don’t rely on placeholders)</li>
    <li>Tap-friendly checkboxes for consent/meds/anxiety notes</li>
  </ul>
  <h2>Track What Matters</h2>
  <ul>
    <li>Sticky bar clicks, call taps, WhatsApp clicks</li>
    <li>Form step abandonment</li>
    <li>Core Web Vitals</li>
  </ul>
  <p><strong>Primary CTA:</strong> Download the Mobile UX Audit Checklist (PDF)</p>$$,
  '[
    {"q":"What size should mobile buttons be?","a":"Aim for at least 44px height with ample spacing to avoid accidental taps."},
    {"q":"Where should the main CTA go on mobile?","a":"Keep a sticky action bar at the bottom with one primary CTA, plus a quick call/WhatsApp option."},
    {"q":"How do I speed up my mobile pages?","a":"Compress images (WebP), lazy-load below the fold, reduce heavy animations, and prefetch the next page."}
  ]'::jsonb,
  'pillar-2',
  '/og/blog.jpg',
  'Mobile pet-care site showing thumb-reachable CTAs and big tap targets.',
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'mobile-first-pet-sitter-ux-thumb-reach-tap-targets');

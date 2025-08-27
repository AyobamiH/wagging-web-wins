-- Update Pillar 6 blog posts with complete content, images, and metadata

-- Peak Season Pet Sitting Pricing
UPDATE posts SET 
  og_image_url = '/og/peak-season-pet-sitting-pricing.jpg',
  cover_alt = 'Busy calendar with peak dates blocked out and a waitlist indicator',
  content = '<p>Peak season doesn''t have to mean chaos. Use a simple policy stack—deposit, capacity cap, and a fair waitlist—to protect margins, reduce cancellations, and keep communication warm and clear.</p>

<h2>Why peak season needs a policy stack</h2>
<p>When demand spikes (half terms, summer, Bonfire Night, Christmas/New Year), "first come, first served" turns messy—double bookings, last-minute cancellations, stressed customers. A three-part stack keeps you in control and customers informed:</p>
<ul>
<li><strong>Deposit</strong> to create commitment.</li>
<li><strong>Capacity cap</strong> to protect service quality.</li>
<li><strong>Waitlist</strong> to capture overflow without promising the impossible.</li>
</ul>

<h2>Step 1: Deposits that feel fair (and stick)</h2>
<p><strong>Amount:</strong> 25–50% works well. For short jobs, consider a flat £10–£25 deposit.</p>
<p><strong>Refund window:</strong> e.g., 100% refundable up to 14 days before the start date; transferable once after that.</p>
<p><strong>Payment methods:</strong> Card at booking or link via invoice. Avoid manual bank transfers in peak weeks.</p>

<blockquote>
<p><strong>Microcopy for your website:</strong><br>"A small deposit saves your dates and helps us maintain fair availability for all clients. Fully refundable up to 14 days before your booking."</p>
</blockquote>

<h3>Confirmation message (paste-ready)</h3>
<p><strong>Subject:</strong> Your dates are reserved 🎉<br>
<strong>Body (SMS/Email):</strong><br>
"Thanks, {First Name}! We''ve reserved {Dates}. A £{Amount} deposit secures your spot. Pay here: {Link}. It''s fully refundable up to {Refund Window}. Questions? Just reply to this message."</p>

<h2>Step 2: Capacity caps that protect quality</h2>
<p><strong>Daily cap:</strong> Define max pets/visits per day you can deliver to your standard.</p>
<p><strong>Blackout rules:</strong> Pre-block any days you wouldn''t be proud to operate at.</p>
<p><strong>Visible signal:</strong> Add a "Limited spots this week" banner during peaks.</p>

<blockquote>
<p><strong>Capacity maths (quick guide):</strong><br>
Max daily visits = (Available hours – Travel buffer) ÷ Average visit length.<br>
Add 20% wiggle room for emergencies.</p>
</blockquote>

<h2>Step 3: A waitlist that feels respectful (not second class)</h2>
<p><strong>Rules:</strong> First-come, first-served; 12–24 hours to accept once a slot opens.</p>
<p><strong>Expiry:</strong> Offers expire automatically; the next person gets a shot.</p>
<p><strong>Auto-notify:</strong> Fire a text + email when a spot opens.</p>

<blockquote>
<p><strong>Waitlist microcopy:</strong><br>"Full on your dates? Join the waitlist. We''ll text you if a slot opens. You''ll have 24 hours to confirm before we offer it to the next client."</p>
</blockquote>

<h2>Tools & automation (low-effort wins)</h2>
<ul>
<li><strong>Calendly (or your booking tool):</strong> Require deposit on booking for peak categories.</li>
<li><strong>n8n/Zapier:</strong> "Cancellation → notify top 3 on waitlist → auto-expire in 24h → move to next."</li>
<li><strong>Capacity sheet:</strong> A simple Google Sheet counting daily slots is often enough.</li>
</ul>

<h2>Communicate early, often, and kindly</h2>
<p><strong>Pre-season announcement:</strong> Post to your blog, email list, and Google Business Profile with key dates, deposit policy, and link to book.</p>
<p><strong>Reminders:</strong> Friendly "complete your deposit" nudges 24h and 72h after a provisional booking.</p>
<p><strong>Declines:</strong> Offer waitlist + alternative dates so "no" still feels helpful.</p>

<blockquote>
<p><strong>Decline + waitlist template:</strong><br>
"Thanks so much, {Name}. We''re fully booked for {Dates}, but we can add you to our waitlist and text you if anything opens. We can also offer {Alternative Dates}. What suits?"</p>
</blockquote>

<h2>Measure what matters</h2>
<ul>
<li><strong>No-show rate:</strong> Aim &lt;3% with deposits + reminders.</li>
<li><strong>Deposit recovery:</strong> Track how many provisional bookings convert post-deposit.</li>
<li><strong>Client satisfaction:</strong> Ask one question: "How easy was booking during peak season?" (1–5)</li>
</ul>

<div class="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
<h3 class="font-semibold mb-3">Ready to implement these strategies?</h3>
<p class="text-sm mb-4">Download the Peak-Season Policy Kit (deposit policy template, cap calculator, waitlist scripts) or book a free 15-min policy tune-up consultation.</p>
</div>',
  faq = '[
    {"q": "How much should I charge as a deposit?", "a": "25–50% works well; for short jobs, a £10–£25 flat deposit. Pair with a clear refund window (e.g., 14 days)."},
    {"q": "Do booking caps frustrate clients?", "a": "Not if you announce them early, explain the quality reason, and offer a fair waitlist with clear expiry."},
    {"q": "How do I automate waitlist alerts?", "a": "Use your booking tool''s notifications or a simple n8n flow: ''cancellation → SMS/email top 3 → 24-hour expiry → next person.''"}
  ]'::jsonb,
  pillar_tag = 'pillar-6',
  published = true
WHERE slug = 'peak-season-pet-sitting-pricing-deposits-caps-waitlists-uk';

-- Pet Business Partnerships Playbook
UPDATE posts SET 
  og_image_url = '/og/pet-business-partnerships-playbook.jpg',
  cover_alt = 'Pet professional shaking hands with a veterinary partner',
  content = '<p>Partnerships work when both sides win. Here''s exactly what vets, groomers, and trainers want to see—proof, process, and co-marketing—so they feel confident recommending you.</p>

<h2>Start with what each partner values</h2>
<ul>
<li><strong>Vets:</strong> Safety first. Clear escalation protocol, vaccination stance, record-keeping, insurance, DBS, AAL (if applicable).</li>
<li><strong>Groomers:</strong> Punctuality, before/after proof, gentle-handling standards, cross-promos.</li>
<li><strong>Trainers:</strong> Consistency between sessions, behaviour notes, post-care homework for owners.</li>
</ul>

<h2>Build your "Proof Pack" once—reuse forever</h2>
<ul>
<li><strong>Safety & Standards page:</strong> Insurance, DBS, AAL, hygiene, emergency plan, named vet contact.</li>
<li><strong>3 micro-cases:</strong> Problem → action → result (e.g., separation anxiety → structured routine → calmer dog).</li>
<li><strong>Review snippets:</strong> Highlight keywords partners care about (reliability, calm handling, communication).</li>
<li><strong>Service overview one-pager:</strong> Exactly what you do, where, hours, response time, pricing from £X.</li>
<li><strong>Leave-behind checklist:</strong> One-pager + business cards with QR to a partner-only landing page.</li>
</ul>

<h2>Outreach scripts (email/DM/printed letter)</h2>
<blockquote>
<p><strong>Subject:</strong> Can we make life easier for your clients?<br>
"Hi {Name}, I run {Brand}—we help your clients with {very specific scenarios}. We''ve attached a one-page overview with our safety protocols, insurance and DBS.</p>
<p>To make this easy: we''ll do the legwork—co-write a short guide for your clients, add your logo, and report monthly on any referrals you receive.</p>
<p>Would you be open to a 10-minute chat next week? Here''s my calendar: {Calendly}. If easier, reply with a time and I''ll meet you at your place."</p>
</blockquote>

<h2>Co-marketing calendar (lightweight)</h2>
<ul>
<li><strong>Monthly theme:</strong> e.g., "New Puppy Month," "Holiday Travel Prep," "Fireworks Anxiety."</li>
<li><strong>What we provide:</strong> A5 printable, one blog post, a GBP post draft, 2x Instagram captions, 1x email paragraph.</li>
<li><strong>Your logo here:</strong> Partners love visibility—put them on the assets.</li>
</ul>

<h2>Make tracking simple (and visible)</h2>
<ul>
<li><strong>UTM links + referral code:</strong> e.g., ?utm_source={Partner}&utm_medium=referral</li>
<li><strong>Sheet columns:</strong> Date, Partner, Lead name, Service, Outcome, Value, Notes.</li>
<li><strong>Monthly mini-report:</strong> "You sent 4 leads; 3 booked; £310 value; 1 five-star review mentioned you."</li>
</ul>

<h2>Pitfalls to avoid</h2>
<ul>
<li>Vague asks ("put our leaflet on your desk?").</li>
<li>No follow-up or results reporting.</li>
<li>Overpromising coverage or response times.</li>
</ul>

<div class="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
<h3 class="font-semibold mb-3">Ready to build partnerships?</h3>
<p class="text-sm mb-4">Download Partner Outreach Scripts + One-Pager Template (editable) or book a 20-minute strategy call to set up your partner funnel.</p>
</div>',
  faq = '[
    {"q": "How many partners should I approach first?", "a": "Start with 3–5 quality partners you can serve well and report to consistently."},
    {"q": "What''s a fair referral incentive?", "a": "Try a give-get: a small client discount and a partner credit or donation to their chosen charity."},
    {"q": "How do I show results to partners?", "a": "Send a simple monthly report: leads received, bookings, value, selected feedback highlights—kept to one page."}
  ]'::jsonb,
  pillar_tag = 'pillar-6',
  published = true
WHERE slug = 'pet-business-partnerships-playbook-vets-groomers-trainers';

-- Productized Pet Care Services
UPDATE posts SET 
  og_image_url = '/og/productized-pet-care-services.jpg',
  cover_alt = 'Three service tier cards for a pet-care business',
  content = '<p>Turn your services into easy-to-choose "products." Use three simple tiers, a few thoughtful add-ons, and clear bundles so clients understand value in seconds—no awkward sales chat required.</p>

<h2>Why productising works</h2>
<ul>
<li><strong>Clarity:</strong> Clients compare like for like.</li>
<li><strong>Speed:</strong> Fewer emails to "explain how it works."</li>
<li><strong>Higher AOV:</strong> Add-ons and bundles lift order value without pressure.</li>
</ul>

<h2>The 3-tier framework (rename to fit your brand)</h2>
<ul>
<li><strong>Starter:</strong> Core outcome. Example—Dog Walk Standard: 30-min walk, GPS log, one photo.</li>
<li><strong>Pro (Most Booked):</strong> Adds the popular extras. Example—45-min walk, basic enrichment, 3 photos, towel dry.</li>
<li><strong>Elite (Limited):</strong> Premium touches and priority access. Example—60-min walk, enrichment plan, mini training reinforcement, same-walker guarantee.</li>
</ul>

<blockquote>
<p><strong>Anchoring tip:</strong> Price Pro to look like strong value vs Elite, and more compelling than Starter.</p>
</blockquote>

<h2>Add-ons that make sense (3–5 max)</h2>
<ul>
<li><strong>Pickup window guarantee:</strong> Precise window for time-sensitive clients.</li>
<li><strong>Updates pack:</strong> Daily WhatsApp summary + extra photos.</li>
<li><strong>Training top-up:</strong> 10-minute reinforcement of trainer''s cues.</li>
<li><strong>Key-safe install:</strong> Upfront convenience, reduces scheduling friction.</li>
</ul>

<blockquote>
<p><strong>Website microcopy:</strong><br>"Prefer extra updates or a precise pickup window? Add what you need—no fluff."</p>
</blockquote>

<h2>Bundles clients actually understand</h2>
<ul>
<li><strong>New Puppy Pack (4 weeks):</strong> 3x short visits + 1x guidance call.</li>
<li><strong>Holiday Travel Pack:</strong> Sits + transport + daily updates.</li>
<li><strong>Confidence Builder Pack:</strong> Walks with gradual exposure plan + check-ins.</li>
</ul>

<h2>UX that converts (fast)</h2>
<ul>
<li><strong>Three cards, one highlighted:</strong> "Most Booked" badge on Pro.</li>
<li><strong>Feature bullets:</strong> 3–5 max per tier.</li>
<li><strong>Guarantee line:</strong> "If we''re not a match in the first visit, we''ll refund the session."</li>
<li><strong>FAQs right below the cards:</strong> Solve objections where they occur.</li>
</ul>

<h2>Implementation checklist</h2>
<ul>
<li>Tier names & prices finalised</li>
<li>3–5 add-ons, priced</li>
<li>1–2 bundles with outcomes stated</li>
<li>Photos for each tier</li>
<li>Guarantee copy</li>
<li>Booking button + deposit rule</li>
<li>FAQ block + terms link</li>
</ul>

<div class="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
<h3 class="font-semibold mb-3">Ready to productise your services?</h3>
<p class="text-sm mb-4">Download Service Card Components (React + Tailwind) + Pricing Copy Cheatsheet or book a quick consult to design your pricing page.</p>
</div>',
  faq = '[
    {"q": "How many add-ons is too many?", "a": "Stick to 3–5 that clients genuinely ask for. More than that creates fatigue."},
    {"q": "Should I show monthly prices?", "a": "If you sell recurring walks/visits, show both per-session and a simple monthly example."},
    {"q": "How do I avoid option overload?", "a": "Highlight one ''Most Booked'' tier, keep bullets tight, and tuck advanced add-ons into a dropdown."}
  ]'::jsonb,
  pillar_tag = 'pillar-6',
  published = true
WHERE slug = 'productized-pet-care-services-pricing-bundles-add-ons';

-- Pet Care Referral Program
UPDATE posts SET 
  og_image_url = '/og/pet-care-referral-program.jpg',
  cover_alt = 'Happy dog owners sharing a referral card',
  content = '<p>Referrals thrive on timing and clarity. Offer a simple give-get, ask at the right moment, and track with UTM links—then publicly thank supporters to keep the loop spinning.</p>

<h2>Design a simple, ethical offer</h2>
<ul>
<li><strong>Give-Get:</strong> "£10 credit for you and your friend after their first completed booking."</li>
<li><strong>One clear rule:</strong> Applies after the first service is completed.</li>
<li><strong>Fair caps:</strong> Max 1 credit per new household; monthly redemption cap if needed.</li>
</ul>

<blockquote>
<p><strong>Microcopy (site):</strong><br>"Invite a friend—when they complete their first booking, you both receive £10 credit. Simple, fair, and appreciated."</p>
</blockquote>

<h2>Ask at the right moment</h2>
<ul>
<li>After a 5-star review (they''re warm).</li>
<li>After a pet milestone (graduated training, first successful sit).</li>
<li>Seasonal cards (pre-Christmas, summer).</li>
<li>In every WhatsApp/email footer (quiet reminder).</li>
</ul>

<blockquote>
<p><strong>Ask script (DM/email):</strong><br>
"Thanks again for trusting us with {Pet Name}. If a friend could use help, here''s your link: {Referral Link}. When they complete their first booking, you both get £10 credit."</p>
</blockquote>

<h2>Track without headaches</h2>
<ul>
<li><strong>Referral link:</strong> UTM source = referral, medium = client, campaign = referrals, plus a short code per client.</li>
<li><strong>Coupon code:</strong> {CLIENTFIRST10} applied after the first booking completes.</li>
<li><strong>Sheet or CRM tags:</strong> Track redemptions and the referring client automatically (n8n/Zapier).</li>
</ul>

<blockquote>
<p><strong>Automation idea (n8n):</strong><br>
Trigger "coupon redeemed" → add credit to referrer → send thank-you note → log to sheet.</p>
</blockquote>

<h2>Say thank you (publicly, with consent)</h2>
<ul>
<li><strong>Social shout-outs:</strong> "Huge thanks to S. for recommending us!"</li>
<li><strong>Hand-written card:</strong> Unexpected delight.</li>
<li><strong>End-of-month leaderboard (optional):</strong> Celebrate, don''t gamify too hard.</li>
</ul>

<h2>Keep it fair & compliant</h2>
<ul>
<li><strong>No spam:</strong> Invite personally; provide opt-out.</li>
<li><strong>Transparent terms:</strong> One short page linked near the referral form.</li>
<li><strong>No misleading claims:</strong> Keep it honest about availability and credit timing.</li>
</ul>

<div class="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
<h3 class="font-semibold mb-3">Ready to launch your referral loop?</h3>
<p class="text-sm mb-4">Download the Referral One-Pager Template (offer copy, rules, codes, tracking sheet) or book a 20-minute setup call to wire this to your booking tool.</p>
</div>',
  faq = '[
    {"q": "What incentive works best?", "a": "A modest give-get (e.g., £10 credit each) tied to a completed first booking drives action without eroding margins."},
    {"q": "How do I prevent abuse?", "a": "Limit to one use per new household, verify email/phone, and require service completion before credit applies."},
    {"q": "Should I cap monthly redemptions?", "a": "Yes, add a fair cap and review quarterly. If you hit the cap, it''s time to expand capacity."}
  ]'::jsonb,
  pillar_tag = 'pillar-6',
  published = true
WHERE slug = 'pet-care-referral-program-give-get-timing-tracking';
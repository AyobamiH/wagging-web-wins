// Pillar 1: Booking, Reminders & Reliability
// Central data for all Pillar 1 content

export interface Pillar1PostData {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  pillarTag: string;
  ogImageUrl: string;
  coverAlt: string;
  content: string;
  faq: Array<{ q: string; a: string; }>;
  internalLinks: string[];
}

export const PILLAR1_POSTS: Pillar1PostData[] = [
  {
    slug: "calendly-vs-built-in-booking-for-pet-sitters",
    title: "Calendly vs Built-In Booking for Pet Sitters: What Actually Converts?",
    excerpt: "Your booking tool is your cash register. Here's how Calendly stacks up against a custom, built-in flow—and a simple way to test which one converts better for your clients.",
    metaTitle: "Calendly vs Built-In Booking for Pet Sitters",
    metaDescription: "Should you use Calendly or build your own booking? A practical guide with conversion principles, UX tips, and a lightweight test plan.",
    primaryKeyword: "calendly for pet sitters",
    pillarTag: "Pillar 1",
    ogImageUrl: "/og/calendly-vs-built-in-booking.jpg",
    coverAlt: "Comparison of a Calendly widget and a custom booking page.",
    content: `
      <h2>Why booking choice matters</h2>
      <p>Your booking system is the first real interaction potential clients have with your business. On mobile (where 70%+ of pet owners browse), speed matters. A clunky booking flow loses clients before they even book their first visit.</p>
      <p>The key factors are mobile optimization, loading speed, and reassurance (trust signals, clear pricing, easy cancellation).</p>

      <h2>Calendly: strengths & trade-offs</h2>
      <h3>Strengths:</h3>
      <ul>
        <li>Quick setup (15 minutes)</li>
        <li>Mobile-optimized out of the box</li>
        <li>Buffer times, availability windows built in</li>
        <li>Email confirmations/reminders included</li>
        <li>Integrates with Google Calendar, Outlook</li>
        <li>Free tier available</li>
      </ul>
      <h3>Trade-offs:</h3>
      <ul>
        <li>Generic branding (unless paid plan)</li>
        <li>Limited customization</li>
        <li>No payment collection during booking</li>
        <li>Data lives in Calendly, not your system</li>
        <li>Monthly fee for advanced features</li>
      </ul>

      <h2>Built-in booking (custom MERN): strengths & trade-offs</h2>
      <h3>Strengths:</h3>
      <ul>
        <li>Full brand control</li>
        <li>Custom business logic (deposits, packages, add-ons)</li>
        <li>Direct payment collection</li>
        <li>Data ownership</li>
        <li>Seamless user experience within your site</li>
      </ul>
      <h3>Trade-offs:</h3>
      <ul>
        <li>Higher development cost</li>
        <li>More maintenance required</li>
        <li>Longer time to market</li>
        <li>Need technical expertise</li>
        <li>Responsibility for uptime/security</li>
      </ul>

      <h2>The 7 conversion rules</h2>
      <ol>
        <li>Mobile-first design (thumb-friendly tap targets)</li>
        <li>Show pricing upfront (no surprises)</li>
        <li>Minimize form fields (name, email, phone, service type)</li>
        <li>Clear cancellation policy visible</li>
        <li>Progress indicators for multi-step flows</li>
        <li>Instant confirmation (email + SMS)</li>
        <li>Easy rescheduling options</li>
      </ol>

      <h2>Lightweight A/B test (2 weeks)</h2>
      <p>Run a simple 50/50 split test for 2 weeks minimum:</p>
      <ul>
        <li><strong>Group A:</strong> Calendly widget</li>
        <li><strong>Group B:</strong> Custom booking flow</li>
      </ul>
      <p><strong>Success metric:</strong> Booking completion rate</p>
      <p><strong>Secondary metrics:</strong> Time to complete, mobile vs desktop performance</p>
      <p><strong>Decision rule:</strong> Switch if there's ≥15% improvement with ≥50 total bookings</p>

      <h2>Implementation tips</h2>
      <p>For Calendly integration, use this React snippet:</p>
      <pre><code>import { InlineWidget } from "react-calendly";

export default function BookNow() {
  return (
    &lt;div className="mx-auto max-w-2xl p-4"&gt;
      &lt;h1 className="text-2xl font-semibold mb-2"&gt;Book a visit&lt;/h1&gt;
      &lt;p className="text-sm mb-4"&gt;Choose a time that suits. Deposits refundable up to 14 days before.&lt;/p&gt;
      &lt;InlineWidget url="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call" /&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <p>For custom booking flows, ensure you have:</p>
      <ul>
        <li>Stripe PaymentIntent setup</li>
        <li>Webhook handling with retries</li>
        <li>Email/SMS provider integration</li>
        <li>GA4 event tracking</li>
        <li>Proper error state handling</li>
      </ul>

      <h2>What most pet pros should do</h2>
      <p>Start with Calendly to validate demand and get bookings flowing immediately. Run the A/B test once you have steady traffic. Go custom when you're ready to scale and need more control over the booking experience.</p>
    `,
    faq: [
      {
        q: "Should I use Calendly or build a custom booking system?",
        a: "Start with Calendly for quick setup and validation, then consider custom booking when you need more control and have steady traffic to A/B test."
      },
      {
        q: "How do I test which booking system converts better?",
        a: "Run a 50/50 split test for 2 weeks minimum, measuring booking completion rates with at least 50 total bookings before making a decision."
      },
      {
        q: "What's most important for mobile booking conversion?",
        a: "Mobile-first design, upfront pricing, minimal form fields, and clear cancellation policies are the key factors for mobile booking success."
      }
    ],
    internalLinks: [
      "/blog/reduce-no-shows-pet-grooming-pet-sitting",
      "/pricing",
      "/blog/pet-business-partnerships-playbook"
    ]
  },
  {
    slug: "reduce-no-shows-pet-grooming-pet-sitting",
    title: "No-Show Killers: Reminder Texts, Deposits & Cut-Off Rules That Stick",
    excerpt: "A practical, copy-and-paste playbook to slash no-shows using reminders, small deposits, and fair cut-off rules—plus automation ideas.",
    metaTitle: "Reduce No-Shows: Reminders, Deposits & Cut-Off Rules",
    metaDescription: "A practical, copy-and-paste playbook to slash no-shows using reminders, small deposits, and fair cut-off rules—plus automation ideas.",
    primaryKeyword: "reduce no-shows pet grooming",
    pillarTag: "Pillar 1",
    ogImageUrl: "/og/reduce-no-shows-pet-care.jpg",
    coverAlt: "SMS reminder message for a pet-care appointment.",
    content: `
      <h2>Why people no-show (and how to counter it)</h2>
      <p>Understanding the psychology behind no-shows helps you build better systems:</p>
      <ul>
        <li><strong>They forgot:</strong> Counter with reminder sequences</li>
        <li><strong>No real commitment:</strong> Counter with small deposits</li>
        <li><strong>Life happened:</strong> Counter with easy rescheduling</li>
        <li><strong>They're shopping around:</strong> Counter with clear value communication</li>
        <li><strong>Booking too far in advance:</strong> Counter with cut-off rules</li>
      </ul>

      <h2>Recommended policy (simple, fair)</h2>
      <p>Here's a policy that works for most pet care businesses:</p>
      <ul>
        <li><strong>Deposit:</strong> £10-20 per service, refundable up to 24 hours before</li>
        <li><strong>Cancellation:</strong> 24 hours notice required</li>
        <li><strong>No-show fee:</strong> Full service charge</li>
        <li><strong>Rescheduling:</strong> Free up to 24 hours before, £5 fee within 24 hours</li>
        <li><strong>Maximum advance booking:</strong> 4 weeks ahead</li>
      </ul>

      <h2>Friendly copy</h2>
      <p>Use this wording: "We require a small deposit to secure your booking—it's fully refundable up to 24 hours before your appointment and helps us keep our schedule reliable for all our pet families."</p>

      <h2>Reminder sequence</h2>
      <p>Copy-and-paste reminder templates:</p>
      
      <h3>T-72h Email:</h3>
      <p><em>Subject: Your [Pet Name] appointment is coming up!</em></p>
      <p>Hi [Name],</p>
      <p>Just a friendly reminder that [Pet Name] has an appointment with us on [Date] at [Time].</p>
      <p>If you need to reschedule (free up to 24hrs before), just reply to this email or call [Phone].</p>
      <p>Looking forward to seeing [Pet Name]!</p>

      <h3>T-24h SMS:</h3>
      <p>"Hi [Name], [Pet Name]'s appointment is tomorrow at [Time]. Need to reschedule? Call [Phone]. See you soon!"</p>

      <h3>T-3h SMS:</h3>
      <p>"[Pet Name]'s appointment is today at [Time]. We're looking forward to seeing you both!"</p>

      <h3>Missed appointment flow:</h3>
      <p>"Hi [Name], we missed [Pet Name] today. Please call [Phone] to reschedule. The deposit will be applied to your next visit."</p>

      <h2>Automation wiring</h2>
      <p>Use n8n or Zapier to automate the reminder sequence:</p>
      <ol>
        <li>Trigger: New booking created</li>
        <li>Wait: Until 72 hours before appointment</li>
        <li>Send: Email reminder</li>
        <li>Wait: Until 24 hours before appointment</li>
        <li>Send: SMS reminder</li>
        <li>Wait: Until 3 hours before appointment</li>
        <li>Send: Final SMS reminder</li>
      </ol>

      <h2>Deposits + Stripe</h2>
      <p>Server-side setup for deposit collection:</p>
      <ul>
        <li>Create PaymentIntent for deposit amount</li>
        <li>Store booking with "pending" status</li>
        <li>On successful payment, update to "confirmed"</li>
        <li>For cancellations >24h, process refund automatically</li>
        <li>For no-shows, capture remaining balance</li>
      </ul>

      <h2>Track what matters</h2>
      <p>Key metrics to monitor:</p>
      <ul>
        <li>No-show rate (target: <5%)</li>
        <li>Cancellation rate (target: <10%)</li>
        <li>Average advance booking time</li>
        <li>Reminder open/click rates</li>
        <li>Deposit conversion rate</li>
        <li>Revenue recovery from no-show fees</li>
      </ul>
    `,
    faq: [
      {
        q: "What's the best deposit amount for pet services?",
        a: "£10-20 works for most services. It's enough to show commitment but not so high that it creates booking friction."
      },
      {
        q: "How far in advance should I send reminders?",
        a: "Send email reminders 72 hours before, SMS at 24 hours and 3 hours before the appointment for best results."
      },
      {
        q: "Should I charge no-show fees?",
        a: "Yes, charge the full service amount for no-shows. This policy, combined with deposits and reminders, reduces no-shows significantly."
      }
    ],
    internalLinks: [
      "/blog/calendly-vs-built-in-booking-for-pet-sitters",
      "/blog/peak-season-pet-sitting-pricing",
      "/contact"
    ]
  },
  {
    slug: "automating-pet-sitter-care-updates-whatsapp-email-client-portal",
    title: "Automating Care Updates: WhatsApp vs Email vs Client Portal",
    excerpt: "Choose the right channel for daily updates with photos and notes. Pros/cons, consent tips, and a simple automation blueprint.",
    metaTitle: "Care Updates: WhatsApp vs Email vs Client Portal",
    metaDescription: "Choose the right channel for daily updates with photos and notes. Pros/cons, consent tips, and a simple automation blueprint.",
    primaryKeyword: "pet sitter client updates automation",
    pillarTag: "Pillar 1",
    ogImageUrl: "/og/pet-care-updates-channels.jpg",
    coverAlt: "Comparison of pet-care updates across WhatsApp, email, and a client portal.",
    content: `
      <h2>The job to be done</h2>
      <p>Pet owners want reassurance their furry family is happy and safe. Daily updates serve multiple purposes:</p>
      <ul>
        <li>Build trust and reduce anxiety</li>
        <li>Show professionalism and attention to detail</li>
        <li>Create positive memories and photo keepsakes</li>
        <li>Justify premium pricing through transparency</li>
        <li>Generate word-of-mouth and social sharing</li>
      </ul>

      <h2>Channel comparison</h2>
      
      <h3>WhatsApp</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Instant delivery and high open rates</li>
        <li>Easy photo/video sharing</li>
        <li>Two-way communication</li>
        <li>Personal, conversational feel</li>
        <li>Works on any smartphone</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Requires phone number consent</li>
        <li>No professional archiving</li>
        <li>Can become too casual</li>
        <li>Notification fatigue</li>
      </ul>
      <p><strong>Best for:</strong> Daily walk updates, quick reassurance messages</p>

      <h3>Email</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Professional presentation</li>
        <li>Rich formatting and branding</li>
        <li>Easy to archive and search</li>
        <li>Can include detailed reports</li>
        <li>Universal access</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Lower immediate engagement</li>
        <li>Can end up in spam folders</li>
        <li>More formal, less personal</li>
        <li>Image compression issues</li>
      </ul>
      <p><strong>Best for:</strong> End-of-day summaries, detailed care reports</p>

      <h3>Client Portal</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Centralized communication hub</li>
        <li>Secure and private</li>
        <li>Comprehensive activity logging</li>
        <li>Easy photo galleries</li>
        <li>Professional differentiation</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Requires login (friction)</li>
        <li>Higher development cost</li>
        <li>May have lower engagement</li>
        <li>Needs user education</li>
      </ul>
      <p><strong>Best for:</strong> Premium services, repeat clients, multi-pet families</p>

      <h2>Decision guide</h2>
      <p>Choose your primary channel based on your service type:</p>
      <ul>
        <li><strong>Dog walking:</strong> WhatsApp for quick updates</li>
        <li><strong>Pet sitting (1-3 days):</strong> Email summaries + WhatsApp photos</li>
        <li><strong>Extended pet sitting:</strong> Client portal + email notifications</li>
        <li><strong>Premium services:</strong> All three channels coordinated</li>
      </ul>

      <h2>Automation blueprint</h2>
      <p>Simple workflow: <strong>Capture → Route → Send → Archive</strong></p>
      <ol>
        <li><strong>Capture:</strong> Mobile app or form for quick updates</li>
        <li><strong>Route:</strong> Logic to determine which channel(s) to use</li>
        <li><strong>Send:</strong> Automated delivery via chosen channel</li>
        <li><strong>Archive:</strong> Store in CRM/portal for future reference</li>
      </ol>

      <h2>Daily summary email template</h2>
      <p><strong>Subject:</strong> [Pet Name] Daily Update - [Date]</p>
      <p>Hi [Owner Name],</p>
      <p>[Pet Name] had a wonderful day! Here's what we got up to:</p>
      <p><strong>Walk/Exercise:</strong> [Duration, route, energy level]</p>
      <p><strong>Meals:</strong> [What eaten, appetite, any notes]</p>
      <p><strong>Bathroom:</strong> [Frequency, any concerns]</p>
      <p><strong>Mood & Behavior:</strong> [Happy, playful, etc.]</p>
      <p><strong>Special moments:</strong> [Cute thing they did]</p>
      <p>See you tomorrow!</p>
      <p>[Your Name]</p>

      <h2>WhatsApp from-the-field update</h2>
      <p>"[Pet Name] loving this sunny walk! 🌞 Found every puddle on the path 😄 [photo]"</p>

      <h2>Minimal portal spec</h2>
      <p>Essential features for a client portal:</p>
      <ul>
        <li><strong>Data model:</strong> Pets, visits, updates, photos, notes</li>
        <li><strong>User roles:</strong> Pet owner (view), pet sitter (create), admin (manage)</li>
        <li><strong>UX:</strong> Mobile-first, photo gallery, timeline view</li>
        <li><strong>Privacy:</strong> SSL, user authentication, data encryption</li>
      </ul>
    `,
    faq: [
      {
        q: "Which is better for pet care updates: WhatsApp or email?",
        a: "WhatsApp for immediate updates and photos, email for detailed daily summaries. Many successful pet sitters use both channels strategically."
      },
      {
        q: "How often should I send updates to pet owners?",
        a: "For dog walking: 1-2 quick updates per walk. For pet sitting: 2-3 updates per day plus an end-of-day summary."
      },
      {
        q: "Do I need a client portal for my pet sitting business?",
        a: "Not essential for basic services, but valuable for premium offerings and building professional differentiation with repeat clients."
      }
    ],
    internalLinks: [
      "/blog/reduce-no-shows-pet-grooming-pet-sitting",
      "/blog/productized-pet-care-services",
      "/contact"
    ]
  },
  {
    slug: "route-optimization-dog-walking-schedule-uk",
    title: "Route Recurring Dog-Walks Efficiently (and Keep Margins)",
    excerpt: "A practical framework to cluster walks by area and window, reduce drive time, and keep clients happy—plus a simple weekly planning routine.",
    metaTitle: "Route Recurring Dog-Walks Efficiently (Keep Margins)",
    metaDescription: "A practical framework to cluster walks by area and window, reduce drive time, and keep clients happy—plus a simple weekly planning routine.",
    primaryKeyword: "schedule optimization dog walking",
    pillarTag: "Pillar 1",
    ogImageUrl: "/og/dog-walking-route-optimization.jpg",
    coverAlt: "Dog-walking route with client clusters marked on a map.",
    content: `
      <h2>The constraints</h2>
      <p>Efficient dog walking scheduling must balance several factors:</p>
      <ul>
        <li><strong>Time windows:</strong> Client preferences and dog needs</li>
        <li><strong>Geography:</strong> Travel time between locations</li>
        <li><strong>Dog compatibility:</strong> Some dogs can't be walked together</li>
        <li><strong>Buffer times:</strong> Allowing for delays and cleanup</li>
        <li><strong>Energy levels:</strong> Matching walks to sitter capacity</li>
      </ul>

      <h2>Weekly planning rhythm</h2>
      <p>Every Sunday, spend 30 minutes planning the week:</p>
      <ol>
        <li>Review all recurring bookings</li>
        <li>Check for any changes or cancellations</li>
        <li>Group walks by postcode area</li>
        <li>Assign time windows to each cluster</li>
        <li>Build daily routes within each area</li>
        <li>Send confirmation messages to clients</li>
      </ol>

      <h2>Simple clustering method</h2>
      <p>Four-step process for efficient routing:</p>
      <ol>
        <li><strong>Postcode grouping:</strong> Group clients by first part of postcode (e.g., "SW1", "N1")</li>
        <li><strong>Window sorting:</strong> Within each area, sort by preferred time slots</li>
        <li><strong>Nearest-neighbor:</strong> Connect adjacent locations to minimize travel</li>
        <li><strong>Buffer addition:</strong> Add 10-15 minutes between each walk</li>
      </ol>

      <h2>The 80/20 tools</h2>
      <p>You don't need expensive software. These simple tools work:</p>
      <ul>
        <li><strong>Google Maps:</strong> For route planning and traffic updates</li>
        <li><strong>Spreadsheet:</strong> Client database with postcodes and preferences</li>
        <li><strong>Calendar app:</strong> Block out time slots for each area</li>
        <li><strong>Templates:</strong> Standardized messages for clients</li>
      </ul>

      <h2>Weekly confirmation message</h2>
      <p>"Hi [Name], just confirming [Dog Name]'s walks for this week: [Days/Times]. I'll be in your area [Time Range] each day. Any changes needed? Reply by Saturday evening. Thanks!"</p>

      <h2>Curveball playbook</h2>
      <p>Plans change. Here's how to handle common disruptions:</p>
      
      <h3>Weather (rain/heat):</h3>
      <ul>
        <li>Indoor alternatives for small dogs</li>
        <li>Shorter walks with extra play time</li>
        <li>Reschedule to cooler parts of day</li>
      </ul>

      <h3>Sickness (yours or theirs):</h3>
      <ul>
        <li>Partner network for backup coverage</li>
        <li>Clear policies on sick dog handling</li>
        <li>24-hour advance notice where possible</li>
      </ul>

      <h3>Last-minute add-ons:</h3>
      <ul>
        <li>Premium rate for same-day requests</li>
        <li>Only accept if in planned route area</li>
        <li>Maximum 2 add-ons per day</li>
      </ul>

      <h2>Metrics that protect margins</h2>
      <p>Track these weekly:</p>
      <ul>
        <li><strong>Drive time ratio:</strong> Travel time ÷ billable time (target: <25%)</li>
        <li><strong>Dogs per hour:</strong> Including travel (target: 2-3 dogs/hour)</li>
        <li><strong>Area utilization:</strong> How many clients per postcode area</li>
        <li><strong>Cancellation rate:</strong> Last-minute changes (target: <10%)</li>
        <li><strong>Fuel cost per walk:</strong> Monthly fuel ÷ total walks</li>
      </ul>

      <h2>Optional: Basic optimization logic</h2>
      <p>For tech-savvy dog walkers, simple scoring system:</p>
      <ul>
        <li>Distance penalty: +1 point per 5 minutes drive time</li>
        <li>Time preference bonus: -2 points for perfect time match</li>
        <li>Area density bonus: -1 point per other client in same postcode</li>
        <li>Capacity cap: Maximum 8 walks per day</li>
      </ul>
      <p>Assign walks to minimize total score across the week.</p>
    `,
    faq: [
      {
        q: "How do I reduce driving time between dog walks?",
        a: "Group clients by postcode area and create time windows for each area. This clustering approach can reduce drive time by 30-40%."
      },
      {
        q: "What's the ideal number of dog walks per day?",
        a: "6-8 walks per day is optimal for most dog walkers, allowing proper time for each dog plus travel and breaks."
      },
      {
        q: "How do I handle last-minute booking requests?",
        a: "Only accept same-day requests if they fit your planned route, and charge a premium rate to protect your margins."
      }
    ],
    internalLinks: [
      "/blog/automating-pet-sitter-care-updates-whatsapp-email-client-portal",
      "/blog/pet-care-referral-program",
      "/blog/peak-season-pet-sitting-pricing"
    ]
  }
];

export const PILLAR1_HUB_DATA = {
  title: "Pillar 1 — Booking, Reminders & Reliability",
  description: "Reduce friction, increase trust, and protect your calendar with proven systems for booking management, client communication, and operational efficiency.",
  readingOrder: [
    { step: 1, title: "Calendly vs Built-In", slug: "calendly-vs-built-in-booking-for-pet-sitters" },
    { step: 2, title: "No-Show Killers", slug: "reduce-no-shows-pet-grooming-pet-sitting" },
    { step: 3, title: "Care Updates", slug: "automating-pet-sitter-care-updates-whatsapp-email-client-portal" },
    { step: 4, title: "Route Optimisation", slug: "route-optimization-dog-walking-schedule-uk" }
  ]
};
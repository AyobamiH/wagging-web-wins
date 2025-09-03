// src/components/whyDoDogs/PillarHero.tsx
import { motion, useReducedMotion } from "framer-motion";

type Props = { title: string; subtitle: string };

export default function PillarHero({ title, subtitle }: Props) {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { y: 12, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-gradient-to-br from-primary/5 via-primary/10 to-transparent
      "
      aria-labelledby="pillar-hero-title"
    >
      {/* Ambient blobs & pattern (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-28 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {/* Carded glass wrapper so it feels like the rest of the app */}
        <div className="rounded-2xl border bg-card/60 backdrop-blur-md p-6 sm:p-10 shadow-sm">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              Owner-friendly • Vet-safe pointers
            </span>
          </motion.div>

          <motion.h1
            id="pillar-hero-title"
            {...fadeUp(0.05)}
            className="
              text-balance text-center
              text-3xl md:text-5xl font-extrabold tracking-tight
              bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent
              mt-4
            "
          >
            {title}
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="mx-auto mt-3 max-w-3xl text-center text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>

          {/* Chips */}
          <motion.ul
            {...fadeUp(0.18)}
            className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground"
          >
            {["Plain-English", "When to call your vet", "Quick next steps"].map((t) => (
              <li
                key={t}
                className="rounded-full border bg-background/60 px-3 py-1"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.24)}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
              className="
                inline-flex items-center justify-center rounded-2xl
                bg-gradient-primary px-6 py-3 text-base font-semibold
                text-primary-foreground shadow-glow
                transition-transform duration-200
                hover:scale-[1.02] active:scale-[0.99]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              "
            >
              Book a consult
            </a>
            <a
              href="#clusters"
              className="
                inline-flex items-center justify-center rounded-2xl
                px-6 py-3 text-base font-semibold
                border bg-background/60
                hover:bg-primary/10
                transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              "
            >
              See all guides →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Soft wave divider to transition into the content below */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        className="absolute bottom-0 left-0 right-0 h-16 w-full text-primary/10"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,64L48,53.3C96,43,192,21,288,21.3C384,21,480,43,576,53.3C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
      </svg>
    </section>
  );
}

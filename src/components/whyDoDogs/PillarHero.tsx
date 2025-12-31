// src/components/whyDoDogs/PillarHero.tsx
import { motion } from "framer-motion";

type Props = { title: string; subtitle: string };

export default function PillarHero({ title, subtitle }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-card/50">
      {/* Soft spotlight for contrast */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_380px_at_50%_15%,hsl(var(--primary)/0.08),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* Glass panel that aligns the content */}
        <div className="rounded-3xl border border-border bg-card/80 p-8 sm:p-12 backdrop-blur-md shadow-glow">
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              text-center text-4xl md:text-6xl font-extrabold tracking-tight
              text-foreground
            "
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Feature chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Plain-English", "When to call your vet", "Quick next steps"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Primary actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
              className="
                inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold
                bg-primary text-primary-foreground shadow-glow transition-all hover:scale-[1.015] hover:bg-primary/90
              "
            >
              Book a consult
            </a>
            <a
              href="#clusters"
              className="
                inline-flex items-center justify-center rounded-2xl border border-border
                bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground
                hover:bg-secondary/80 transition-colors
              "
            >
              See all guides →
            </a>
          </div>
        </div>
      </div>

      {/* Soft divider at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-background/50 to-transparent" />
    </section>
  );
}

// src/components/whyDoDogs/PillarHero.tsx
import { motion } from "framer-motion";

type Props = { title: string; subtitle: string };

export default function PillarHero({ title, subtitle }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Deep brand background + soft spotlight behind the headline for contrast */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0b1220,40%,#0e1b2e)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_380px_at_50%_15%,rgba(255,255,255,.14),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* Glass panel that aligns the content and gives consistent styling */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,.25)]">
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              text-center text-4xl md:text-6xl font-extrabold tracking-tight
              bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent
              drop-shadow-[0_2px_6px_rgba(0,0,0,.4)]
            "
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-4 max-w-3xl text-center text-slate-200/90 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Feature chips – subtle, legible on dark */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Plain-English", "When to call your vet", "Quick next steps"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200/90"
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
                text-white shadow-md transition-all hover:scale-[1.015]
                bg-gradient-to-r from-indigo-500 to-blue-500
              "
            >
              Book a consult
            </a>
            <a
              href="#clusters"
              className="
                inline-flex items-center justify-center rounded-2xl border border-white/20
                bg-white/5 px-6 py-3 text-base font-semibold text-white/90
                hover:bg-white/10 transition-colors
              "
            >
              See all guides →
            </a>
          </div>
        </div>
      </div>

      {/* Soft divider at the bottom so the next section flows nicely */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 bg-[linear-gradient(to_top,rgba(0,0,0,.25),transparent)]" />
    </section>
  );
}

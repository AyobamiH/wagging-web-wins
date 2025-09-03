// src/components/whyDoDogs/FAQList.tsx
import { ChevronDown } from "lucide-react";

type QA = { q: string; a: string };

export default function FAQList({ items }: { items: QA[] }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Heading matches PillarHero scale + contrast */}
        <h2
          className="
            text-center text-3xl md:text-4xl font-bold tracking-tight
            bg-gradient-to-r from-white via-white to-white/70
            bg-clip-text text-transparent
          "
        >
          Quick answers
        </h2>
        <p className="mt-2 text-center text-sm text-slate-300/80">
          Short, plain-English explanations to common questions.
        </p>

        {/* Glassy container like the hero */}
        <div
          className="
            mt-8 overflow-hidden
            rounded-3xl border border-white/10
            bg-white/[0.06] backdrop-blur-md
            divide-y divide-white/10
            shadow-[0_8px_30px_rgba(0,0,0,.25)]
          "
        >
          {items.map((it, i) => (
            <details key={i} className="group">
              <summary
                className="
                  list-none cursor-pointer
                  flex items-center justify-between gap-3
                  p-5 md:p-6
                  text-slate-100/90 hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2 focus-visible:ring-offset-background
                "
              >
                <span className="font-medium">{it.q}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="px-5 md:px-6 pb-6 -mt-2 text-sm leading-relaxed text-slate-300">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

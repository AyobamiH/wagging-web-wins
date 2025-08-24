import { motion } from "framer-motion";

type Props = { title: string; subtitle: string };

export default function PillarHero({ title, subtitle }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 text-center"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-4 max-w-3xl text-center text-gray-700"
        >
          {subtitle}
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold text-white shadow-sm focus:outline-none focus:ring-2 transition-colors"
            style={{ 
              backgroundColor: "var(--brand-primary)"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--brand-primary-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--brand-primary)")
            }
          >
            Book a consult
          </a>
          <a
            href="#clusters"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold hover:underline"
            style={{ color: "var(--brand-primary)" }}
          >
            See all guides
          </a>
        </div>
      </div>

      {/* Subtle brand divider tint at bottom */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-48"
           style={{ background: "linear-gradient(to top, var(--brand-divider), rgba(0,0,0,0))" }} />
    </section>
  );
}

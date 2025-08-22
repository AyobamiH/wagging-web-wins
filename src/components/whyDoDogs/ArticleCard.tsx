import { motion } from "framer-motion";

type Props = { title: string; description: string; href: string };

export default function ArticleCard({ title, description, href }: Props) {
  return (
    <motion.a
      href={href}
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group block rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md focus:outline-none"
      style={{ borderColor: "var(--brand-divider)" }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
             style={{ backgroundColor: "var(--brand-primary)" }} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-950">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
          <span className="mt-3 inline-block text-sm font-medium group-hover:underline"
                style={{ color: "var(--brand-primary)" }}>
            Read guide →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

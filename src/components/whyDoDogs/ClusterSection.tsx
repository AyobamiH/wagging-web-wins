import ArticleCard from "./ArticleCard";
import type { GuideItem, ClusterKey } from "@/data/whyDoDogs";
import { motion } from "framer-motion";

type Props = { cluster: ClusterKey; items: GuideItem[]; id?: string };

export default function ClusterSection({ cluster, items, id }: Props) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-gray-900"
      >
        {cluster}
      </motion.h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
           style={{ borderColor: "var(--brand-divider)" }}>
        {items.map((g) => (
          <ArticleCard
            key={g.slug}
            title={g.title}
            description={g.metaDescription}
            href={g.slug}
          />
        ))}
      </div>
    </section>
  );
}

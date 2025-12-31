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
      className="group block rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-md focus:outline-none transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:underline">
            Read guide →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

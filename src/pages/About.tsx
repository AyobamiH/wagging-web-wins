import Seo from "@/components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="About | Tail Wagging Websites"
        description="Hi — I’m John. I build practical sites for pet businesses with performance, accessibility and automation."
        path="/about"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "About", item: "/about" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Hi — I’m John. I build practical sites for pet businesses.</h1>
        <p className="mt-3 max-w-3xl">
          “I’m a senior software engineer (MERN stack) who loves hands-on development. My mission is to create tailored software and websites for pet care businesses — efficient, reliable and genuinely useful. I keep things simple for you and clear for your clients.”
        </p>
        <ul className="mt-6 list-disc pl-5 space-y-2 text-sm">
          <li>Pet care niche focus — I understand services, pricing, and trust signals</li>
          <li>Technical depth — performance, accessibility, automation</li>
          <li>Friendly process — plain-English updates, no jargon</li>
        </ul>
        <div className="mt-6">
          <a href="/contact" className="underline">Book a Free Consult</a>
        </div>
      </section>
    </>
  );
}

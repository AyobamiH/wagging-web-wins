import Seo from "@/components/Seo";

export default function FAQ() {
  const faqJsonLd = [{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How long does a website take?", acceptedAnswer: { "@type": "Answer", text: "Most sites launch in 2–4 weeks depending on pages and features." } },
      { "@type": "Question", name: "Can you write the content?", acceptedAnswer: { "@type": "Answer", text: "Yes — we interview you and draft clear, friendly copy for approval." } },
      { "@type": "Question", name: "Do you handle logos or photos?", acceptedAnswer: { "@type": "Answer", text: "We can guide you or collaborate with your designer/photographer." } },
      { "@type": "Question", name: "What about ongoing support?", acceptedAnswer: { "@type": "Answer", text: "Our care plans cover updates, backups, speed checks and small edits." } },
      { "@type": "Question", name: "Will I show up on Google?", acceptedAnswer: { "@type": "Answer", text: "We set up on-page SEO and your Google Business Profile; rankings depend on competition and content, but we give you a plan to grow." } }
    ]
  }];

  const faqs = [
    {
      q: "How long does a website take?",
      a: "Most sites launch in 2–4 weeks depending on pages and features.",
    },
    { q: "Can you write the content?", a: "Yes — we interview you and draft clear, friendly copy for approval." },
    { q: "Do you handle logos or photos?", a: "We can guide you or collaborate with your designer/photographer." },
    { q: "What about ongoing support?", a: "Our care plans cover updates, backups, speed checks and small edits." },
    { q: "Will I show up on Google?", a: "We set up on-page SEO and your Google Business Profile; rankings depend on competition and content, but we give you a plan to grow." },
  ];

  return (
    <>
      <Seo
        title="FAQ | Tail Wagging Websites"
        description="Common questions about timelines, content, support and SEO."
        path="/faq"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "FAQ", item: "/faq" }]}
        jsonLd={faqJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Common questions</h1>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-lg border p-4">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

type QA = { q: string; a: string };

export default function FAQList({ items }: { items: QA[] }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quick answers</h2>
      <div className="mt-6 divide-y rounded-2xl border bg-white"
           style={{ borderColor: "var(--brand-divider)" }}>
        {items.map((it, i) => (
          <details key={i} className="group p-5 open:bg-gray-50">
            <summary className="cursor-pointer list-none text-gray-900 font-medium">
              {it.q}
            </summary>
            <p className="mt-2 text-gray-700">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

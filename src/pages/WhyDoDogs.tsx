import Seo from "@/components/Seo";
import PillarHero from "@/components/whyDoDogs/PillarHero";
import ClusterSection from "@/components/whyDoDogs/ClusterSection";
import RedFlagCallout from "@/components/whyDoDogs/RedFlagCallout";
import FAQList from "@/components/whyDoDogs/FAQList";
import { WHY_DOGS_PILLAR_URL, clusters, guides } from "@/data/whyDoDogs";

export default function WhyDoDogs() {
  const description =
    "Owner-friendly guides to common canine behaviours — what’s normal, when to worry, and how to help. Licking, grass-eating, scooting, howling, digging and more.";

  return (
    <>
      <Seo
        title="Why Do Dogs…? | Tail Wagging Websites"
        description={description}
        path={WHY_DOGS_PILLAR_URL}
        imageUrl="https://tailwaggingwebdesign.com/og/why-dogs.jpg"
        type="website"
      />

      <PillarHero
        title="Why Do Dogs…?"
        subtitle="Quick, plain-English explanations for everyday dog behaviours — with clear next steps."
      />

      <RedFlagCallout />

      <div id="clusters" className="mt-8" />

      {clusters.map((cluster) => (
        <ClusterSection
          key={cluster}
          id={cluster.toLowerCase().replace(/\s+/g, "-")}
          cluster={cluster}
          items={guides.filter((g) => g.cluster === cluster)}
        />
      ))}

      <FAQList
        items={[
          {
            q: "Which topics should I read first?",
            a: "Start with the behaviour you see most. Every guide has red-flag boxes showing when to call your vet.",
          },
          {
            q: "Is this a medical diagnosis?",
            a: "No — these are practical owner guides. If your dog seems unwell, contact your vet or an emergency clinic.",
          },
          {
            q: "Can I share these with clients?",
            a: "Yes. Link to any guide. Trainers/groomers can add a short local intro with contact details.",
          },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 pb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Need tailored help?
        </h2>
        <p className="mt-2 text-gray-700">
          Book a short consult. We’ll triage the behaviour and plan kind, effective next steps.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold shadow-sm focus:outline-none focus:ring-2"
            style={{ backgroundColor: "var(--brand-primary)", color: "#fff" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--brand-primary-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--brand-primary)")
            }
          >
            Book a consult
          </a>
        </div>
      </section>
    </>
  );
}

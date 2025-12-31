import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { guides, clusters, ClusterKey } from "@/data/whyDoDogs";
import RedFlagCallout from "@/components/whyDoDogs/RedFlagCallout";
import FAQList from "@/components/whyDoDogs/FAQList";
import ArticleCard from "@/components/whyDoDogs/ArticleCard";

export default function WhyDogsGuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the guide by matching the slug portion of the path
  const guide = guides.find(g => g.slug === `/why-do-dogs/${slug}/`);
  
  if (!guide) {
    return <Navigate to="/why-do-dogs/" replace />;
  }

  // Get related guides from the same cluster
  const relatedGuides = guides
    .filter(g => g.cluster === guide.cluster && g.slug !== guide.slug)
    .slice(0, 2);

  // Create breadcrumbs
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Why Do Dogs…?", item: "/why-do-dogs/" },
    { name: guide.title.replace("Why do dogs ", "").replace("Why does my dog ", "").replace("Why is my dog ", ""), item: guide.slug }
  ];

  // Article JSON-LD
  const articleJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.metaTitle,
      description: guide.metaDescription,
      datePublished: "2025-08-24",
      dateModified: "2025-08-24",
      author: {
        "@type": "Person",
        name: "Ayobami Haastrup",
        jobTitle: "Pet Care Digital Specialist"
      },
      publisher: {
        "@type": "Organization",
        name: "Tail Wagging Websites",
        logo: {
          "@type": "ImageObject",
          url: "https://tailwaggingwebdesign.com/og/logo.jpg"
        }
      },
      image: `https://tailwaggingwebdesign.com/og/${guide.ogImageName}.jpg`,
      mainEntityOfPage: `https://tailwaggingwebdesign.com${guide.slug}`,
      keywords: [guide.primaryKeyword, ...guide.secondaryPhrases],
      wordCount: Math.round((guide.wordTargetMin + guide.wordTargetMax) / 2),
      articleSection: guide.cluster,
      inLanguage: "en-GB"
    }
  ];

  return (
    <>
      <Seo
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={guide.slug}
        imageUrl={`https://tailwaggingwebdesign.com/og/${guide.ogImageName}.jpg`}
        imageAlt={guide.imageAlt}
        type="article"
        keywords={[guide.primaryKeyword, ...guide.secondaryPhrases]}
        breadcrumbs={breadcrumbs}
        jsonLd={articleJsonLd}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {guide.cluster}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {guide.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
                {guide.metaDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Red Flag Callout */}
        <RedFlagCallout />

        {/* Main Content */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-gray mx-auto dark:prose-invert"
            >
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What you need to know
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Understanding <strong>{guide.primaryKeyword}</strong> is important for every dog owner. 
                  This guide covers the main reasons behind this behavior, what's normal vs concerning, 
                  and practical steps you can take.
                </p>
              </div>

              {/* Quick Triage */}
              <div className="mb-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Quick check: Is this normal?
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ <strong className="text-accent-success">Usually normal:</strong> Occasional, mild behavior</li>
                  <li>✓ <strong className="text-accent-warn">Monitor:</strong> Sudden changes or increased frequency</li>
                  <li>⚠️ <strong className="text-accent-error">See your vet:</strong> Persistent, severe, or painful behavior</li>
                </ul>
              </div>

              {/* Main Causes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why this happens
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Most cases of {guide.primaryKeyword.toLowerCase()} are completely normal and relate to:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>• Natural instincts and breed behaviors</li>
                  <li>• Communication and social bonding</li>
                  <li>• Environmental responses</li>
                  <li>• Health and comfort needs</li>
                </ul>
              </div>

              {/* What to do */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  What you can do
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 bg-accent-success/10 rounded-lg border border-accent-success/20">
                    <h4 className="font-semibold text-accent-success mb-2">✓ Helpful approaches</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Observe patterns and triggers</li>
                      <li>• Provide alternative outlets</li>
                      <li>• Use positive reinforcement</li>
                      <li>• Maintain consistent routines</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-accent-error/10 rounded-lg border border-accent-error/20">
                    <h4 className="font-semibold text-accent-error mb-2">✗ Avoid these</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Punishment or harsh corrections</li>
                      <li>• Ignoring sudden behavior changes</li>
                      <li>• Assuming it will resolve on its own</li>
                      <li>• Using outdated training methods</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* When to seek help */}
              <div className="mb-12 p-6 bg-accent-warn/10 rounded-2xl border border-accent-warn/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  When to contact your vet
                </h3>
                <p className="text-muted-foreground mb-3">Book an appointment if you notice:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sudden onset or dramatic increase in behavior</li>
                  <li>• Signs of pain, distress, or discomfort</li>
                  <li>• Behavior interfering with eating, sleeping, or daily activities</li>
                  <li>• Any concerning physical symptoms</li>
                </ul>
              </div>
            </motion.article>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-16 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Common questions about {guide.primaryKeyword.toLowerCase()}
            </h2>
            <FAQList 
              items={[
                {
                  q: `Is ${guide.primaryKeyword.toLowerCase()} normal in all dogs?`,
                  a: `Most dogs will show this behavior at some point, but frequency and intensity can vary by breed, age, and individual temperament. What matters is understanding your dog's normal patterns and watching for changes.`
                },
                {
                  q: `How long does this behavior typically last?`,
                  a: `This depends on the underlying cause. Natural behaviors may be ongoing but manageable, while stress-related behaviors often improve with environmental changes or training support.`
                },
                {
                  q: `Can I prevent this behavior completely?`,
                  a: `Complete prevention isn't always possible or necessary for natural behaviors. Focus on management, providing appropriate outlets, and addressing any underlying issues rather than total elimination.`
                },
                {
                  q: `Should I be concerned about my other pets?`,
                  a: `Monitor how this behavior affects other pets in your household. Some behaviors are social and may influence other animals, while others are individual responses that don't spread.`
                }
              ]}
            />
          </div>
        </section>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Related guides in {guide.cluster}
            </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedGuides.map((relatedGuide) => (
                  <ArticleCard
                    key={relatedGuide.slug}
                    title={relatedGuide.title}
                    description={relatedGuide.metaDescription}
                    href={relatedGuide.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-4 py-16 bg-gradient-primary">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Need personalized advice for your dog?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
                Every dog is different. Get tailored guidance for your specific situation with a consultation.
              </p>
              <a
                href="https://calendly.com/coffee-chat-with-ayobami-haastrup/consultation-call"
                className="inline-flex items-center justify-center rounded-2xl bg-background px-8 py-4 text-lg font-semibold text-foreground shadow-glow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-primary transition-all duration-300"
              >
                Book a consultation
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { EnhancedSupabasePostRepository } from "@/lib/repositories/supabase-adapters.enhanced";

const postRepository = new EnhancedSupabasePostRepository();

export default function BlogPostSupabase() {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['supabase-post', slug],
    queryFn: () => postRepository.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', slug],
    queryFn: async () => {
      const posts = await postRepository.list({ limit: 4 });
      return posts.filter(p => p.slug !== slug);
    },
    enabled: !!slug,
  });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        <Link 
          to="/blog" 
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="aspect-video w-full mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        <Link 
          to="/blog" 
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200);

  return (
    <>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        imageUrl={post.ogImageUrl || "https://tailwaggingwebdesign.com/og/blog.jpg"}
        imageAlt={post.coverAlt || `${post.title} cover image`}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `https://tailwaggingwebdesign.com/blog/${post.slug}`,
            "headline": post.title,
            "description": post.metaDescription,
            "datePublished": post.publishedAt,
            "dateModified": post.publishedAt,
            "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
            "articleBody": post.excerpt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://tailwaggingwebdesign.com/blog/${post.slug}`
            },
            "author": {
              "@type": "Organization",
              "name": "Tail Wagging Websites Factory Northampton",
              "url": "https://tailwaggingwebdesign.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tail Wagging Websites Factory Northampton",
              "url": "https://tailwaggingwebdesign.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tailwaggingwebdesign.com/og.png",
                "width": 1200,
                "height": 630
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": post.ogImageUrl || "https://tailwaggingwebdesign.com/og/blog.jpg",
              "width": 1200,
              "height": 630,
              "caption": post.coverAlt || `${post.title} cover image`
            },
            "url": `https://tailwaggingwebdesign.com/blog/${post.slug}`,
            "isPartOf": {
              "@type": "Blog",
              "name": "Tail Wagging Web Design Blog",
              "url": "https://tailwaggingwebdesign.com/blog"
            },
            "about": {
              "@type": "Thing",
              "name": "Pet Care Web Design",
              "description": "Web design and digital marketing for pet care businesses"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Pet Care Business Owners"
            }
          },
          ...(post.faq ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faq.map((faqItem) => ({
              "@type": "Question",
              "name": faqItem.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faqItem.a
              }
            }))
          }] : [])
        ]}
      />

      <BlogPostLayout
        title={post.title}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        readingTime={readingTime}
        pillarTag={post.pillarTag}
        coverImage={post.ogImageUrl || "/og/blog.jpg"}
        coverAlt={post.coverAlt}
        content={post.content}
      >
        {/* Calendly Embed */}
        <div className="my-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border/50">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Get Personalized Help</h2>
            <p className="text-muted-foreground mb-4">
              Ready to implement these strategies? Book a free consultation to discuss your specific needs, or explore our{' '}
              <Link to="/services" className="text-accent hover:underline">complete pet-care web design services</Link>
              {' '}for comprehensive solutions.
            </p>
            <CalendlyEmbed 
              buttonText="Book Free Consultation"
              buttonSize="lg"
              ariaLabel="Book a free consultation to discuss blog topic"
              trackingLocation={`blog_post_${slug}`}
            />
          </div>
        </div>

        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faq.map((faqItem, index) => (
                <div key={index} className="border border-border rounded-lg p-6 bg-card/50">
                  <h3 className="font-semibold mb-2">{faqItem.q}</h3>
                  <p className="text-muted-foreground">{faqItem.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">Related posts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.filter(related => related.slug !== post.slug).slice(0, 3).map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.ogImageUrl || "/og/blog.jpg"}
                        alt={relatedPost.coverAlt || `${relatedPost.title} cover image`}
                        width={400}
                        height={225}
                        loading="lazy"
                        decoding="async"
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      {relatedPost.pillarTag && (
                        <Badge variant="outline" className="self-start mb-2 capitalize text-xs">
                          {relatedPost.pillarTag.replace('pillar-', 'Category ')}
                        </Badge>
                      )}
                      <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(relatedPost.publishedAt), 'MMM d, yyyy')}
                      </p>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </BlogPostLayout>
    </>
  );
}
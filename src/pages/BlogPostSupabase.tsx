import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";

const postRepository = new SupabasePostRepository();

export default function BlogPostSupabase() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['supabase-post', slug],
    queryFn: () => postRepository.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.pillarTag],
    queryFn: () => postRepository.list({ 
      pillar: post?.pillarTag, 
      limit: 3 
    }),
    enabled: !!post?.pillarTag,
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

  // Handle content - if it's already HTML, use it directly; otherwise convert markdown
  const isHtml = post.content.trim().startsWith('<');
  const htmlContent = isHtml ? post.content : post.content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .split('\n\n').map(p => p.trim() ? `<p>${p.replace(/\n/g, '<br>')}</p>` : '').join('');

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
            "headline": post.title,
            "description": post.metaDescription,
            "datePublished": post.publishedAt,
            "author": {
              "@type": "Organization",
              "name": "Tail Wagging Websites"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tail Wagging Websites",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tailwaggingwebdesign.com/og.png"
              }
            },
            "image": post.ogImageUrl || "https://tailwaggingwebdesign.com/og/blog.jpg",
            "url": `https://tailwaggingwebdesign.com/blog/${post.slug}`
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

      <div className="min-h-screen bg-background">
        <article className="mx-auto max-w-4xl px-4 py-8">
          <div className="mb-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl mb-8">
            <img
              src={post.ogImageUrl || "/og/blog.jpg"}
              alt={post.coverAlt || `${post.title} cover image`}
              width={1200}
              height={630}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full"
            />
          </div>

          <header className="mb-8">
            {post.pillarTag && (
              <div className="mb-4">
                <Badge variant="secondary" className="capitalize">
                  {post.pillarTag.replace('-', ' ')}
                </Badge>
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </div>
            </div>

            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          <div 
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:marker:text-muted-foreground prose-blockquote:border-l-primary/40 prose-blockquote:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-hr:border-border prose-headings:scroll-mt-20 mb-12"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

        {/* Calendly Embed after second H2 */}
        <div className="my-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Get Personalized Help</h3>
            <p className="text-muted-foreground mb-4">
              Ready to implement these strategies? Book a free consultation to discuss your specific needs.
            </p>
            <CalendlyEmbed 
              buttonText="Book Free Consultation"
              buttonSize="lg"
              ariaLabel="Book a free consultation to discuss blog topic"
              trackingLocation={`blog_post_${slug}`}
            />
          </div>
        </div>

        {/* Internal Links */}
        {post.pillarTag === 'pillar-1' && (
          <div className="my-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-4">More from Pillar 1: Booking & Reliability</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Link to="/blog/pillar-1" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">View All Pillar 1 Articles</span>
              </Link>
              {slug !== 'calendly-vs-built-in-booking-for-pet-sitters' && (
                <Link to="/blog/calendly-vs-built-in-booking-for-pet-sitters" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  → Calendly vs Built-In Booking
                </Link>
              )}
              {slug !== 'reduce-no-shows-pet-grooming-pet-sitting' && (
                <Link to="/blog/reduce-no-shows-pet-grooming-pet-sitting" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  → No-Show Prevention Strategies
                </Link>
              )}
              {slug !== 'automating-pet-sitter-care-updates-whatsapp-email-client-portal' && (
                <Link to="/blog/automating-pet-sitter-care-updates-whatsapp-email-client-portal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  → Automating Care Updates
                </Link>
              )}
              {slug !== 'route-optimization-dog-walking-schedule-uk' && (
                <Link to="/blog/route-optimization-dog-walking-schedule-uk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  → Route Optimization
                </Link>
              )}
            </div>
          </div>
        )}

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
                            {relatedPost.pillarTag.replace('-', ' ')}
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
        </article>
      </div>
    </>
  );
}
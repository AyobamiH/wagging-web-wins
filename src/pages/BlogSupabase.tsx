
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ArrowLeft, Clock, Filter, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Seo from "@/components/Seo";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";

const postRepository = new SupabasePostRepository();

export default function BlogSupabase() {
  const { slug } = useParams<{ slug: string }>();

  // If we have a slug, we're viewing a single post
  if (slug) {
    return <BlogPost slug={slug} />;
  }

  // Otherwise, we're viewing the blog index
  return <BlogIndex />;
}

// Blog post component for individual posts
function BlogPost({ slug }: { slug: string }) {
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['supabase-post', slug],
    queryFn: () => postRepository.getBySlug(slug),
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
              fetchPriority="high"
              decoding="async"
              className="object-cover w-full h-full"
            />
          </div>

          <header className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="capitalize">
                {post.pillarTag ? post.pillarTag.replace('pillar-', 'Category ') : 'Article'}
              </Badge>
            </div>
            
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
            className="blog-content mb-12"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Calendly Embed after content */}
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
                {relatedPosts.slice(0, 3).map((relatedPost) => (
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
                        <Badge variant="outline" className="self-start mb-2 capitalize text-xs">
                          {relatedPost.pillarTag ? relatedPost.pillarTag.replace('pillar-', 'Category ') : 'Article'}
                        </Badge>
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

// Blog index component for listing all posts
function BlogIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const postsPerPage = 6;
  
  const { data: allPosts, isLoading, error } = useQuery({
    queryKey: ['all-posts'],
    queryFn: () => postRepository.list({ limit: 100, featuredFirst: true }),
  });

  // Get unique categories from posts
  const categories = allPosts ? 
    Array.from(new Set(allPosts.map(post => post.pillarTag).filter(Boolean)))
      .sort()
    : [];

  // Filter posts by selected category
  const filteredPosts = allPosts ? 
    selectedCategory === "all" 
      ? allPosts 
      : allPosts.filter(post => post.pillarTag === selectedCategory)
    : [];

  // Featured posts (first 3 posts from filtered results)
  const featuredPosts = filteredPosts.slice(0, 3);
  const remainingPosts = filteredPosts.slice(3);

  // Calculate pagination for remaining posts
  const totalPosts = remainingPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = remainingPosts.slice(startIndex, endIndex);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !allPosts) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Error loading posts</h1>
        <p className="mt-2 text-muted-foreground">There was an error loading the blog posts.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Blog | Pet Care Business Tips & Web Design Insights"
        description="Expert tips for pet care businesses on website design, local SEO, marketing automation, and client management. Boost your pet grooming, dog walking, or pet sitting business."
        path="/blog"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "url": "https://tailwaggingwebdesign.com/blog",
            "name": "Tail Wagging Web Design Blog",
            "description": "Expert tips for pet care businesses on website design, local SEO, marketing automation, and client management."
          }
        ]}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Pet Care Business Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips and insights for pet care businesses on website design, marketing, and growth strategies.
            </p>
          </header>

          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center mb-4 md:hidden">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace('pillar-', 'Category ').replace(/^\w/, c => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="hidden md:flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="transition-all duration-200"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200 capitalize"
                >
                  {category.replace('pillar-', '').replace(/-/g, ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Featured Posts</h2>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Large featured post */}
                {featuredPosts[0] && (
                  <Card className="lg:col-span-2 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                    <Link to={`/blog/${featuredPosts[0].slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={featuredPosts[0].ogImageUrl || "/og/blog.jpg"}
                          alt={featuredPosts[0].coverAlt || `${featuredPosts[0].title} cover image`}
                          width={800}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3 capitalize">
                          {featuredPosts[0].pillarTag ? featuredPosts[0].pillarTag.replace('pillar-', '').replace(/-/g, ' ') : 'Article'}
                        </Badge>
                        <h3 className="text-2xl font-bold line-clamp-2 hover:text-primary transition-colors mb-3">
                          {featuredPosts[0].title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 mb-3">
                          {featuredPosts[0].excerpt}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(featuredPosts[0].publishedAt), 'MMM d, yyyy')}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                )}
                
                {/* Smaller featured posts */}
                <div className="space-y-6">
                  {featuredPosts.slice(1, 3).map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                      <Link to={`/blog/${post.slug}`}>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.ogImageUrl || "/og/blog.jpg"}
                            alt={post.coverAlt || `${post.title} cover image`}
                            width={400}
                            height={225}
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2 capitalize text-xs">
                            {post.pillarTag ? post.pillarTag.replace('pillar-', '').replace(/-/g, ' ') : 'Article'}
                          </Badge>
                          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors mb-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* More Posts Section */}
          {posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                {selectedCategory === "all" ? "More Posts" : `More ${selectedCategory.replace('pillar-', '').replace(/-/g, ' ')} Posts`}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.ogImageUrl || "/og/blog.jpg"}
                          alt={post.coverAlt || `${post.title} cover image`}
                          width={400}
                          height={225}
                          loading="lazy"
                          decoding="async"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <Badge variant="outline" className="self-start mb-2 capitalize text-xs">
                          {post.pillarTag ? post.pillarTag.replace('pillar-', '').replace(/-/g, ' ') : 'Article'}
                        </Badge>
                        <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </p>
                      </CardHeader>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Show message when no posts in category */}
          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => {
                          setCurrentPage(currentPage - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => {
                          setCurrentPage(currentPage + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

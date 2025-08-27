import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, TrendingUp } from "lucide-react";
import Seo from "@/components/Seo";
import { SupabasePostRepository } from "@/lib/repositories/supabase-adapters";

const POSTS_PER_PAGE = 6;
const postRepository = new SupabasePostRepository();

export default function BlogSupabase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pillarFilter = searchParams.get('pillar') || undefined;

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['supabase-posts', currentPage, pillarFilter],
    queryFn: () => postRepository.list({ 
      limit: POSTS_PER_PAGE,
      offset: (currentPage - 1) * POSTS_PER_PAGE,
      pillar: pillarFilter
    }),
  });

  const { data: allPosts } = useQuery({
    queryKey: ['all-posts-count', pillarFilter],
    queryFn: () => postRepository.list({ pillar: pillarFilter }),
  });

  const totalPages = allPosts ? Math.ceil(allPosts.length / POSTS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (pillarFilter) params.set('pillar', pillarFilter);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePillarFilter = (pillar?: string) => {
    const params = new URLSearchParams();
    if (pillar) params.set('pillar', pillar);
    setSearchParams(params);
  };

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">Unable to load blog posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title="Blog • Tail Wagging Websites"
        description="Insights, tips and guides for pet business owners on web design, local SEO, marketing automation and growing your business online."
        path="/blog"
        imageUrl="https://tailwaggingwebdesign.com/og/blog.jpg"
        imageAlt="Tail Wagging Websites Blog"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" }
        ]}
      />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Pet Business Insights</h1>
            <p className="text-lg text-muted-foreground">
              Practical strategies and tools to grow your pet service business
            </p>
            
            {/* Pillar Navigation */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Link 
                to="/blog/pillar/booking-and-reliability"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg hover:shadow-md transition-all duration-200 group"
              >
                <div className="bg-primary/20 rounded-full p-2">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Pillar 1: Booking & Reliability</h3>
                  <p className="text-sm text-muted-foreground">Master booking systems, reduce no-shows, and optimize scheduling</p>
                </div>
              </Link>
              
              <Link 
                to="/blog/pillar/offers-pricing-partnerships"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg hover:shadow-md transition-all duration-200 group"
              >
                <div className="bg-accent/20 rounded-full p-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">Pillar 6: Offers & Partnerships</h3>
                  <p className="text-sm text-muted-foreground">Strategic pricing, partnerships, and business growth</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Pillar Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => handlePillarFilter()}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !pillarFilter 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => handlePillarFilter('Pillar 1')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pillarFilter === 'Pillar 1' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Pillar 1: Booking & Reliability
            </button>
            <button
              onClick={() => handlePillarFilter('pillar-6')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pillarFilter === 'pillar-6' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Pillar 6: Offers & Partnerships
            </button>
          </div>

          {/* Featured Pillar Hubs */}
          {!pillarFilter && (
            <div className="mb-12 grid gap-6 md:grid-cols-2">
              {/* Pillar 1 Hub */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">P1</span>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">New Collection</Badge>
                    <h2 className="text-xl font-semibold">Booking & Reliability</h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Master booking systems, reduce no-shows, automate updates, and optimize scheduling to build a reliable foundation.
                </p>
                <Link 
                  to="/blog/pillar/booking-and-reliability"
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  Explore Pillar 1 →
                </Link>
              </div>

              {/* Pillar 6 Hub */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">P6</span>
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Featured Collection</Badge>
                    <h2 className="text-xl font-semibold">Offers & Partnerships</h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Strategic pricing, partnership playbooks, and referral systems that drive sustainable growth.
                </p>
                <Link 
                  to="/blog/pillar/offers-pricing-partnerships"
                  className="inline-flex items-center text-accent hover:underline font-medium"
                >
                  Explore Pillar 6 →
                </Link>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold">No posts yet</h2>
              <p className="mt-2 text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post) => (
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
                      <div className="flex items-center gap-2 mb-2">
                        {post.pillarTag && (
                          <Badge variant="secondary" className="text-xs capitalize">
                            {post.pillarTag.replace('-', ' ')}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </time>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const pageNum = i + Math.max(1, currentPage - 2);
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={pageNum === currentPage}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
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
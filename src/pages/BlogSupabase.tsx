import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Blog</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tips and guides for pet business owners on web design, local SEO, marketing automation and growing your business online.
            </p>
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

          {/* Featured Pillar 6 Hub */}
          {!pillarFilter && (
            <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">Featured Collection</Badge>
                  <h2 className="text-2xl font-semibold mb-3">Offers, Pricing & Partnerships</h2>
                  <p className="text-muted-foreground mb-4">
                    Master pricing strategies, partnership playbooks, and referral systems that drive sustainable growth.
                  </p>
                  <Link 
                    to="/blog/pillar/offers-pricing-partnerships"
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    Explore Pillar 6 →
                  </Link>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">P6</span>
                </div>
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
                    {post.ogImageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.ogImageUrl}
                          alt={post.coverAlt || `${post.title} cover image`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
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
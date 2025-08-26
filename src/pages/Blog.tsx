import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Seo from "@/components/Seo";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const HYGRAPH_API_ENDPOINT = 'https://ap-south-1.cdn.hygraph.com/content/cm42biopg009607w3wk4e5ay2/master';
const POSTS_PER_PAGE = 6;

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: {
    url: string;
    altText?: string;
  };
  author?: {
    name: string;
  };
}

interface PostsResponse {
  posts: Post[];
  postsConnection: {
    aggregate: {
      count: number;
    };
  };
}

const fetchPosts = async (page: number): Promise<PostsResponse> => {
  const skip = (page - 1) * POSTS_PER_PAGE;
  
  const query = `
    query Posts($first: Int!, $skip: Int!) {
      posts(orderBy: publishedAt_DESC, first: $first, skip: $skip) {
        id
        slug
        title
        excerpt
        publishedAt
        coverImage {
          url
          altText
        }
        author {
          name
        }
      }
      postsConnection {
        aggregate {
          count
        }
      }
    }
  `;

  const response = await fetch(HYGRAPH_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        first: POSTS_PER_PAGE,
        skip,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const { data } = await response.json();
  return data;
};

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  const totalPages = data ? Math.ceil(data.postsConnection.aggregate.count / POSTS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          { name: "Home", item: "https://tailwaggingwebdesign.com/" },
          { name: "Blog", item: "https://tailwaggingwebdesign.com/blog" }
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog • Tail Wagging Websites",
            "description": "Insights, tips and guides for pet business owners on web design, local SEO, marketing automation and growing your business online.",
            "url": "https://tailwaggingwebdesign.com/blog",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tailwaggingwebdesign.com/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tailwaggingwebdesign.com/blog" }
              ]
            }
          }
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips and guides for pet business owners on web design, local SEO, marketing automation and growing your business online.
          </p>
        </div>

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
        ) : data?.posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No posts yet</h2>
            <p className="mt-2 text-muted-foreground">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.slug}`}>
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.coverImage.url}
                          alt={post.coverImage.altText || `${post.title} cover image`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {post.author?.name && <span>By {post.author.name}</span>}
                        <span>•</span>
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </time>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
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
          </>
        )}
      </div>
    </>
  );
}
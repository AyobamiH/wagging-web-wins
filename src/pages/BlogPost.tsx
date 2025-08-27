import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Seo from "@/components/Seo";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock } from "lucide-react";

const HYGRAPH_API_ENDPOINT = 'https://ap-south-1.cdn.hygraph.com/content/cm42biopg009607w3wk4e5ay2/master';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: {
    html: string;
  };
  publishedAt: string;
  updatedAt?: string;
  coverImage?: {
    url: string;
    altText?: string;
  };
  author?: {
    name: string;
  };
  seoDescription?: string;
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  coverImage?: {
    url: string;
    altText?: string;
  };
}

const fetchPost = async (slug: string): Promise<{ post: BlogPost; relatedPosts: RelatedPost[] }> => {
  const query = `
    query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        id
        slug
        title
        excerpt
        content {
          html
        }
        publishedAt
        updatedAt
        coverImage {
          url
          altText
        }
        author {
          name
        }
        seoDescription
      }
      relatedPosts: posts(orderBy: publishedAt_DESC, first: 3, where: { slug_not: $slug }) {
        id
        slug
        title
        publishedAt
        coverImage {
          url
          altText
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
      variables: { slug },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const { data } = await response.json();
  
  if (!data.post) {
    throw new Error('Post not found');
  }

  return {
    post: data.post,
    relatedPosts: data.relatedPosts || []
  };
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug!),
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

  const { post, relatedPosts } = data!;
  const readingTime = post.content?.html ? Math.ceil(post.content.html.replace(/<[^>]*>/g, '').split(' ').length / 200) : 1;

  return (
    <>
      <Seo
        title={post.title}
        description={post.seoDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        imageUrl={post.coverImage?.url || "https://tailwaggingwebdesign.com/og/blog.jpg"}
        imageAlt={post.coverImage?.altText || `${post.title} cover image`}
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
            "description": post.seoDescription || post.excerpt,
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt || post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author?.name || "Tail Wagging Websites"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tail Wagging Websites",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tailwaggingwebdesign.com/og.png"
              }
            },
            "image": post.coverImage?.url || "https://tailwaggingwebdesign.com/og/blog.jpg",
            "url": `https://tailwaggingwebdesign.com/blog/${post.slug}`,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog" },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": `/blog/${post.slug}` }
              ]
            }
          }
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

        {post.coverImage && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-8">
            <img
              src={post.coverImage.url}
              alt={post.coverImage.altText || `${post.title} cover image`}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {post.author?.name && (
              <span>By {post.author.name}</span>
            )}
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </div>
          </div>
        </header>

        {post.content?.html && (
          <div 
            className="prose prose-gray max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Related posts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    {relatedPost.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.coverImage.url}
                          alt={relatedPost.coverImage.altText || `${relatedPost.title} cover image`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
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
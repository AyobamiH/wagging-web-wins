import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DOMPurify from "dompurify";

interface BlogPostLayoutProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  pillarTag?: string;
  coverImage?: string;
  coverAlt?: string;
  content: string;
  children?: ReactNode;
}

export default function BlogPostLayout({
  title,
  excerpt,
  publishedAt,
  readingTime,
  pillarTag,
  coverImage,
  coverAlt,
  content,
  children,
}: BlogPostLayoutProps) {
  // Check if content is already HTML (for backwards compatibility)
  const isHtml = content.trim().startsWith('<');

  return (
    <div className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-8">
        {/* Back to blog link */}
        <div className="mb-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>

        {/* Cover image */}
        {coverImage && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-8">
            <img
              src={coverImage}
              alt={coverAlt || `${title} cover image`}
              width={1200}
              height={630}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Article header */}
        <header className="mb-8">
          {/* Blog label badge */}
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
              Tail Wagging Blog
            </Badge>
            {pillarTag && (
              <Badge variant="outline" className="capitalize">
                {pillarTag.replace('pillar-', '').replace(/-/g, ' ')}
              </Badge>
            )}
          </div>
          
          {/* Title - Only H1 on page */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {title}
          </h1>
          
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <time dateTime={publishedAt}>
              {format(new Date(publishedAt), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </header>

        {/* Article body with typography styles */}
        <div className="prose prose-lg prose-slate max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-ul:my-4 prose-ul:text-muted-foreground
          prose-ol:my-4 prose-ol:text-muted-foreground
          prose-li:my-1
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
          prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-img:rounded-lg prose-img:shadow-md
        ">
          {isHtml ? (
            // Render HTML for backwards compatibility (old posts) - SANITIZED for security
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          ) : (
            // Render Markdown for new posts
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          )}
        </div>

        {/* Additional content (FAQs, related posts, etc.) */}
        {children}
      </article>
    </div>
  );
}

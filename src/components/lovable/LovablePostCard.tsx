import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/repositories/types";
import { getCategoryTitle } from "./LovableCategoryCard";

interface LovablePostCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

export function LovablePostCard({ post, variant = 'default' }: LovablePostCardProps) {
  const readingTime = Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200);
  const category = post.extras?.lovableCategory;

  if (variant === 'featured') {
    return (
      <Link to={`/blog/${post.slug}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-card/50 backdrop-blur-sm border-primary/20 group">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto overflow-hidden">
              <img
                src={post.ogImageUrl || "/og/blog.jpg"}
                alt={post.coverAlt || `${post.title} cover image`}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <CardHeader className="flex flex-col justify-center p-6">
              <div className="flex items-center gap-2 mb-3">
                {category && (
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryTitle(category)}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                  Featured
                </Badge>
              </div>
              <CardTitle className="text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mb-4">
                {post.excerpt}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </time>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} min
                </span>
              </div>
            </CardHeader>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm h-full group">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.ogImageUrl || "/og/blog.jpg"}
            alt={post.coverAlt || `${post.title} cover image`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <CardHeader className="p-5">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <Badge variant="outline" className="text-xs">
                {getCategoryTitle(category)}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm mb-3">
            {post.excerpt}
          </CardDescription>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} min
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

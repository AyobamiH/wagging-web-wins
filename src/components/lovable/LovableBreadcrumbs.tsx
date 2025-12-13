import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import type { LovableCategory } from "@/lib/repositories/types";
import { getCategoryTitle } from "./LovableCategoryCard";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LovableBreadcrumbsProps {
  category?: LovableCategory;
  postTitle?: string;
}

export function LovableBreadcrumbs({ category, postTitle }: LovableBreadcrumbsProps) {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Lovable', href: '/blog/lovable' },
  ];

  if (category) {
    items.push({
      label: getCategoryTitle(category),
      href: postTitle ? `/blog/lovable/${category}` : undefined,
    });
  }

  if (postTitle) {
    items.push({ label: postTitle });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {item.href ? (
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

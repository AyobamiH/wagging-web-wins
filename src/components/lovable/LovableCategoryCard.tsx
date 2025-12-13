import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Bug, 
  Briefcase, 
  Compass, 
  Layers,
  LucideIcon 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LovableCategory } from "@/lib/repositories/types";

interface CategoryConfig {
  title: string;
  description: string;
  icon: LucideIcon;
}

const CATEGORY_CONFIG: Record<LovableCategory, CategoryConfig> = {
  'guides': {
    title: 'Guides',
    description: 'Step-by-step tutorials for common Lovable patterns and workflows',
    icon: BookOpen,
  },
  'debug-diaries': {
    title: 'Debug Diaries',
    description: 'Real debugging sessions with solutions to tricky problems',
    icon: Bug,
  },
  'case-studies': {
    title: 'Case Studies',
    description: 'Deep dives into successful Lovable projects and architectures',
    icon: Briefcase,
  },
  'survival-notes': {
    title: 'Survival Notes',
    description: 'Quick tips and gotchas for Lovable developers',
    icon: Compass,
  },
  'frameworks': {
    title: 'Frameworks',
    description: 'Reusable patterns, templates, and mental models',
    icon: Layers,
  },
};

interface LovableCategoryCardProps {
  category: LovableCategory;
  postCount?: number;
}

export function LovableCategoryCard({ category, postCount }: LovableCategoryCardProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  return (
    <Link to={`/blog/lovable/${category}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 flex items-center gap-2">
                {config.title}
                {postCount !== undefined && postCount > 0 && (
                  <span className="text-xs font-normal px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-sm">
                {config.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function getCategoryTitle(category: LovableCategory): string {
  return CATEGORY_CONFIG[category]?.title || category;
}

export function getCategoryDescription(category: LovableCategory): string {
  return CATEGORY_CONFIG[category]?.description || '';
}

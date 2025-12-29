// Backend-agnostic repository interfaces

export interface ReviewCount {
  total: number;
  average: number;
  breakdown?: { [star: number]: number };
}

// Lovable content hub categories
export const LOVABLE_CATEGORIES = [
  'guides',
  'debug-diaries', 
  'case-studies',
  'survival-notes',
  'frameworks'
] as const;

export type LovableCategory = typeof LOVABLE_CATEGORIES[number];

// Extended extras field for Lovable posts
export interface LovableExtras {
  lovableCategory?: LovableCategory;
  featured?: boolean;
  relatedSlugs?: string[];
  redditSnippet?: string;
  tags?: string[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  faq?: Array<{ q: string; a: string }>;
  pillarTag?: string;
  publishedAt: string;
  ogImageUrl?: string;
  coverAlt?: string;
  extras?: LovableExtras;
}

export interface PostSeed extends Omit<Post, 'id' | 'publishedAt'> {
  publishedAt?: string;
}

export interface PostListParams {
  pillar?: string;
  featuredFirst?: boolean;
  limit?: number;
  offset?: number;
}

export interface LovableListParams {
  category?: LovableCategory;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface PostRepository {
  getBySlug(slug: string): Promise<Post | null>;
  list(params?: PostListParams): Promise<Post[]>;
  seed(posts: PostSeed[]): Promise<void>;
  create(post: PostSeed): Promise<Post>;
  update(id: string, post: Partial<PostSeed>): Promise<Post>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Post | null>;
  
  // Lovable-specific methods
  listLovablePosts?(params?: LovableListParams): Promise<Post[]>;
  listLovableByCategory?(category: LovableCategory, params?: Omit<LovableListParams, 'category'>): Promise<Post[]>;
  listFeaturedLovable?(limit?: number): Promise<Post[]>;
}

export interface SettingsRepository {
  getReviewCount(): Promise<ReviewCount>;
  getCalendlyUrl(): Promise<string>;
}

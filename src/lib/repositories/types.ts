// Backend-agnostic repository interfaces

export interface ReviewCount {
  total: number;
  average: number;
  breakdown?: { [star: number]: number };
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

export interface PostRepository {
  getBySlug(slug: string): Promise<Post | null>;
  list(params?: PostListParams): Promise<Post[]>;
  seed(posts: PostSeed[]): Promise<void>;
}

export interface SettingsRepository {
  getReviewCount(): Promise<ReviewCount>;
}
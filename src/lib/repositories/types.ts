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
  create(post: PostSeed): Promise<Post>;
  update(id: string, post: Partial<PostSeed>): Promise<Post>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Post | null>;
}

export interface SettingsRepository {
  getReviewCount(): Promise<ReviewCount>;
  getCalendlyUrl(): Promise<string>;
}
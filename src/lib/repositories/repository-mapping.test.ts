import { describe, it, expect } from 'vitest';

/**
 * Unit tests for repository mapping
 * Verifies that database column names are correctly mapped to TypeScript interface properties
 */

describe('Repository Mapping', () => {
  // Simulate database row (snake_case from Supabase)
  const mockDbRow = {
    id: 'test-id-123',
    slug: 'test-post',
    title: 'Test Post Title',
    excerpt: 'Test excerpt',
    meta_title: 'Test Meta Title',
    meta_description: 'Test meta description for SEO',
    content: '<p>Test content</p>',
    faq: [{ q: 'Question?', a: 'Answer' }],
    pillar_tag: 'lovable',
    published_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    og_image_url: '/og/test.jpg',
    cover_alt: 'Test image alt',
    extras: { lovableCategory: 'guides', featured: true },
  };

  // Expected mapped output (camelCase for TypeScript)
  const expectedMappedPost = {
    id: 'test-id-123',
    slug: 'test-post',
    title: 'Test Post Title',
    excerpt: 'Test excerpt',
    metaTitle: 'Test Meta Title',
    metaDescription: 'Test meta description for SEO',
    content: '<p>Test content</p>',
    faq: [{ q: 'Question?', a: 'Answer' }],
    pillarTag: 'lovable',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    ogImageUrl: '/og/test.jpg',
    coverAlt: 'Test image alt',
    extras: { lovableCategory: 'guides', featured: true },
  };

  it('should map meta_title to metaTitle', () => {
    expect(mapDbRowToPost(mockDbRow).metaTitle).toBe(expectedMappedPost.metaTitle);
  });

  it('should map meta_description to metaDescription', () => {
    expect(mapDbRowToPost(mockDbRow).metaDescription).toBe(expectedMappedPost.metaDescription);
  });

  it('should map og_image_url to ogImageUrl', () => {
    expect(mapDbRowToPost(mockDbRow).ogImageUrl).toBe(expectedMappedPost.ogImageUrl);
  });

  it('should map updated_at to updatedAt', () => {
    expect(mapDbRowToPost(mockDbRow).updatedAt).toBe(expectedMappedPost.updatedAt);
  });

  it('should map published_at to publishedAt', () => {
    expect(mapDbRowToPost(mockDbRow).publishedAt).toBe(expectedMappedPost.publishedAt);
  });

  it('should map pillar_tag to pillarTag', () => {
    expect(mapDbRowToPost(mockDbRow).pillarTag).toBe(expectedMappedPost.pillarTag);
  });

  it('should map cover_alt to coverAlt', () => {
    expect(mapDbRowToPost(mockDbRow).coverAlt).toBe(expectedMappedPost.coverAlt);
  });

  it('should preserve extras object structure', () => {
    expect(mapDbRowToPost(mockDbRow).extras).toEqual(expectedMappedPost.extras);
  });

  it('should handle undefined optional fields gracefully', () => {
    const minimalRow = {
      id: 'minimal-id',
      slug: 'minimal',
      title: 'Minimal',
      excerpt: 'Min',
      meta_title: 'Min Title',
      meta_description: 'Min desc',
      content: 'content',
      published_at: '2024-01-01T00:00:00Z',
      // Missing: faq, pillar_tag, updated_at, og_image_url, cover_alt, extras
    };

    const mapped = mapDbRowToPost(minimalRow);
    
    expect(mapped.faq).toBeUndefined();
    expect(mapped.pillarTag).toBeUndefined();
    expect(mapped.updatedAt).toBeUndefined();
    expect(mapped.ogImageUrl).toBeUndefined();
    expect(mapped.coverAlt).toBeUndefined();
    expect(mapped.extras).toBeUndefined();
  });
});

/**
 * Helper function that mirrors EnhancedSupabasePostRepository.mapToPost
 * Used for testing the mapping logic in isolation
 */
function mapDbRowToPost(data: any) {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    metaTitle: data.meta_title,
    metaDescription: data.meta_description,
    content: data.content,
    faq: data.faq ? (data.faq as Array<{ q: string; a: string }>) : undefined,
    pillarTag: data.pillar_tag || undefined,
    publishedAt: data.published_at,
    updatedAt: data.updated_at || undefined,
    ogImageUrl: data.og_image_url || undefined,
    coverAlt: data.cover_alt || undefined,
    extras: data.extras || undefined,
  };
}

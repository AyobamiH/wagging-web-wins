import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const HYGRAPH_API_ENDPOINT = 'https://ap-south-1.cdn.hygraph.com/content/cm42biopg009607w3wk4e5ay2/master';

interface BlogPost {
  slug: string;
  updatedAt: string;
  publishedAt: string;
}

async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const query = `
    query AllBlogPosts {
      posts(orderBy: publishedAt_DESC, first: 1000) {
        slug
        updatedAt
        publishedAt
      }
    }
  `;

  try {
    const response = await fetch(HYGRAPH_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const { data, errors } = await response.json();
    
    if (errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
    }

    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function generateBlogSitemap(posts: BlogPost[]): string {
  const baseUrl = 'https://tailwaggingwebdesign.com';
  
  const urlElements = posts.map(post => {
    const lastmod = post.updatedAt || post.publishedAt;
    const formattedDate = new Date(lastmod).toISOString().split('T')[0];
    
    return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Blog Posts -->${urlElements}
</urlset>`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating blog sitemap...');
    
    const posts = await fetchAllBlogPosts();
    console.log(`Found ${posts.length} blog posts`);
    
    const sitemap = generateBlogSitemap(posts);
    
    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate blog sitemap',
        message: error.message 
      }), 
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
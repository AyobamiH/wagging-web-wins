import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPost {
  slug: string;
  updated_at: string;
  published_at: string;
}

async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    console.log('Fetching posts from Supabase...');
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, updated_at, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(1000);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log(`Found ${posts?.length || 0} published posts`);
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function generateBlogSitemap(posts: BlogPost[]): string {
  const baseUrl = 'https://tailwaggingwebdesign.com';
  
  const urlElements = posts.map(post => {
    const lastmod = post.updated_at || post.published_at;
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
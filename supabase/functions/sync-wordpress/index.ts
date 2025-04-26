
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get WordPress settings
    const { data: settings } = await supabaseClient
      .from('wp_blog_settings')
      .select('*')
      .single();

    if (!settings?.wordpress_url) {
      throw new Error('WordPress URL not configured');
    }

    // Fetch posts from WordPress
    const wpResponse = await fetch(`${settings.wordpress_url}/wp-json/wp/v2/posts?_embed`);
    const posts = await wpResponse.json();

    // Process and insert posts
    for (const post of posts) {
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      
      await supabaseClient.from('wp_blog_posts').upsert({
        wp_id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        featured_image_url: featuredImage,
        author: post._embedded?.author?.[0]?.name || 'Unknown',
        published_at: post.date,
        updated_at: post.modified,
        status: post.status
      });
    }

    // Update last synced timestamp
    await supabaseClient
      .from('wp_blog_settings')
      .update({ last_synced: new Date().toISOString() })
      .eq('id', settings.id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

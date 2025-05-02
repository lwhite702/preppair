
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
    const { data: settings, error: settingsError } = await supabaseClient
      .from('wp_blog_settings')
      .select('*')
      .single();

    if (settingsError) {
      throw new Error(`Failed to retrieve WordPress settings: ${settingsError.message}`);
    }

    if (!settings?.wordpress_url) {
      throw new Error('WordPress URL not configured');
    }

    console.log(`Starting sync with WordPress at ${settings.wordpress_url}`);

    // Fetch posts from WordPress
    const wpResponse = await fetch(`${settings.wordpress_url}/wp-json/wp/v2/posts?_embed&per_page=10`);
    
    if (!wpResponse.ok) {
      throw new Error(`WordPress API returned ${wpResponse.status}: ${await wpResponse.text()}`);
    }
    
    const posts = await wpResponse.json();
    console.log(`Retrieved ${posts.length} posts from WordPress`);

    // Process and insert posts
    for (const post of posts) {
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
      
      // Calculate read time - rough estimate based on word count
      const wordCount = post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;
      
      // Extract categories as an array of strings
      const categories = post._embedded?.['wp:term']?.[0]?.map(cat => cat.slug) || [];
      
      // Insert or update post in database
      const { error: upsertError } = await supabaseClient.from('wp_blog_posts').upsert({
        wp_id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        featured_image_url: featuredImage,
        author: post._embedded?.author?.[0]?.name || 'Unknown',
        read_time: readTime,
        categories: categories,
        published_at: post.date,
        updated_at: post.modified,
        status: post.status
      });

      if (upsertError) {
        console.error(`Error upserting post ${post.id}: ${upsertError.message}`);
      }
    }

    // Update last synced timestamp
    await supabaseClient
      .from('wp_blog_settings')
      .update({ last_synced: new Date().toISOString() })
      .eq('id', settings.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully synced ${posts.length} posts from ${settings.wordpress_url}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Sync error: ${error.message}`);
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

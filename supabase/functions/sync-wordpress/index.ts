
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

    // Hardcoded WordPress URL
    const wordpressUrl = "https://wrelik.com";
    console.log(`Starting sync with WordPress at ${wordpressUrl}`);

    // Fetch posts from WordPress
    const wpUrl = wordpressUrl.trim().replace(/\/$/, '');
    const fetchUrl = `${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=10`;
    console.log(`Fetching from: ${fetchUrl}`);
    
    // Add a user agent to avoid being blocked
    const wpResponse = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 InterviewGuide/1.0'
      }
    });
    
    if (!wpResponse.ok) {
      const errorText = await wpResponse.text();
      console.error(`WordPress API error: ${wpResponse.status} ${wpResponse.statusText}`);
      console.error(`Response body: ${errorText}`);
      throw new Error(`WordPress API returned ${wpResponse.status}: ${errorText}`);
    }
    
    // Get the raw response text first
    const responseText = await wpResponse.text();
    console.log(`Response length: ${responseText.length}`);
    console.log(`Response preview: ${responseText.substring(0, 200)}`);
    
    // Check if response looks like HTML instead of JSON
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('Received HTML instead of JSON');
      throw new Error('WordPress API returned HTML instead of JSON. The site might be redirecting to a login page.');
    }
    
    // Try parsing the JSON
    let posts;
    try {
      posts = JSON.parse(responseText);
      console.log(`Retrieved ${posts.length} posts from WordPress`);
    } catch (error) {
      console.error('Failed to parse WordPress response:', error);
      throw new Error(`Invalid JSON response from WordPress: ${error.message}`);
    }

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
      .eq('id', 1); // Using id 1 as default since we're not fetching settings anymore

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully synced ${posts.length} posts from ${wordpressUrl}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Sync error: ${error.message}`);
    return new Response(JSON.stringify({ 
      error: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

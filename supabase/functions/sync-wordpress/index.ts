
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { parse as parseXML } from 'https://deno.land/x/xml@2.1.1/mod.ts';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define URL formats to try
const urlFormats = [
  "{baseUrl}/wp-json/wp/v2/posts",       // Standard WordPress REST API
  "{baseUrl}/index.php/wp-json/wp/v2/posts", // With index.php
  "{baseUrl}/feed"                        // RSS Feed fallback
];

async function tryWordPressUrl(baseUrl: string, format: string) {
  // Replace baseUrl in the format
  const url = format.replace("{baseUrl}", baseUrl.trim().replace(/\/$/, ''));
  
  console.log(`Trying WordPress URL: ${url}`);
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; InterviewGuide/1.0)',
    'Accept': format.includes('feed') ? 'application/rss+xml, text/xml' : 'application/json',
    'Content-Type': format.includes('feed') ? 'text/xml' : 'application/json',
    'Cache-Control': 'no-cache',
  };

  // Implement timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log(`Response from ${url}: Status ${response.status}`);
    
    // Log headers for debugging
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    console.log(`Response headers:`, responseHeaders);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response body: ${errorText}`);
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    
    if (format.includes('feed')) {
      // Handle RSS feed response
      return parseRssFeed(responseText);
    } else {
      // Handle JSON API response
      if (!contentType.includes('application/json')) {
        console.error(`Expected JSON but got ${contentType}`);
        console.error(`Response preview: ${responseText.substring(0, 200)}`);
        throw new Error(`Expected JSON response but got ${contentType}`);
      }
      
      try {
        const posts = JSON.parse(responseText);
        return { posts, source: 'REST API' };
      } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error(`Invalid JSON response: ${error.message}`);
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Error with URL ${url}:`, error.message);
    throw error;
  }
}

// Parse RSS feed XML into a format similar to the WP REST API
function parseRssFeed(xmlContent) {
  console.log(`Parsing RSS feed`);
  
  try {
    const parsedXml = parseXML(xmlContent);
    const channel = parsedXml.rss?.channel;
    
    if (!channel) {
      throw new Error('Invalid RSS feed format - no channel found');
    }
    
    const posts = (channel.item || []).map((item, index) => {
      // Extract image URL from content if possible
      let featuredImage = null;
      const content = item['content:encoded'] || '';
      const imgMatch = content.match(/<img.+?src=["'](.+?)["']/i);
      if (imgMatch && imgMatch[1]) {
        featuredImage = imgMatch[1];
      }
      
      // Format date to ISO string
      const pubDate = new Date(item.pubDate).toISOString();

      // Extract categories
      const categories = Array.isArray(item.category) 
        ? item.category.map(cat => typeof cat === 'string' ? cat.toLowerCase() : '')
        : [typeof item.category === 'string' ? item.category.toLowerCase() : ''];
      
      return {
        id: index + 1,
        title: { rendered: item.title || '' },
        slug: item.link?.split('/').filter(Boolean).pop() || `post-${index + 1}`,
        excerpt: { rendered: item.description || '' },
        content: { rendered: content || item.description || '' },
        featured_image_url: featuredImage,
        author: item['dc:creator'] || 'Unknown',
        status: 'published',
        date: pubDate,
        modified: pubDate,
        _embedded: {
          'wp:term': [[{ slug: categories }]]
        }
      };
    });
    
    return { posts, source: 'RSS Feed' };
  } catch (error) {
    console.error('Failed to parse RSS feed:', error);
    throw new Error(`RSS parsing error: ${error.message}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get WordPress URL from request body or use default
    let wordpressUrl;
    
    try {
      const requestData = await req.json();
      wordpressUrl = requestData.wordpressUrl || "https://wrelik.com";
      console.log(`WordPress URL from request: ${wordpressUrl}`);
    } catch (e) {
      // Default URL if request doesn't contain a valid JSON body
      wordpressUrl = "https://wrelik.com";
      console.log(`Using default WordPress URL: ${wordpressUrl}`);
    }
    
    let successfulFormat = null;
    let result = null;
    let lastError = null;
    
    // Try each URL format until one works
    for (const format of urlFormats) {
      try {
        console.log(`Trying format: ${format}`);
        result = await tryWordPressUrl(wordpressUrl, format);
        successfulFormat = format;
        console.log(`Successfully used format: ${format}`);
        break;
      } catch (error) {
        lastError = error;
        console.error(`Format ${format} failed:`, error.message);
        continue; // Try next format
      }
    }
    
    if (!result) {
      throw new Error(`All WordPress API formats failed. Last error: ${lastError?.message || 'Unknown error'}`);
    }
    
    const { posts, source } = result;
    console.log(`Retrieved ${posts.length} posts from ${source}`);
    
    // Process and insert posts
    for (const post of posts) {
      // For REST API, use the structure we already know
      // For RSS, we've transformed the data to match this structure in parseRssFeed
      
      let featuredImage = post.featured_image_url;
      if (!featuredImage && post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Calculate read time - rough estimate based on word count
      let content = post.content?.rendered || '';
      const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;
      
      // Extract categories as an array of strings
      let categories = [];
      if (post._embedded?.['wp:term']?.[0]) {
        categories = post._embedded['wp:term'][0].map(cat => cat.slug || '');
      }
      
      // Insert or update post in database
      const { error: upsertError } = await supabaseClient.from('wp_blog_posts').upsert({
        wp_id: post.id,
        title: post.title.rendered || post.title,
        slug: post.slug,
        excerpt: post.excerpt?.rendered || post.excerpt || '',
        content: content,
        featured_image_url: featuredImage,
        author: post._embedded?.author?.[0]?.name || post.author || 'Unknown',
        read_time: readTime,
        categories: categories,
        published_at: post.date,
        updated_at: post.modified || post.date,
        status: post.status || 'published'
      });

      if (upsertError) {
        console.error(`Error upserting post ${post.id}: ${upsertError.message}`);
      }
    }

    // Update last synced timestamp
    await supabaseClient
      .from('wp_blog_settings')
      .update({ last_synced: new Date().toISOString(), sync_source: source })
      .eq('id', 1)
      .select();

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully synced ${posts.length} posts from ${wordpressUrl} using ${source}`,
      format: successfulFormat
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error(`Sync error: ${error.message}`);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

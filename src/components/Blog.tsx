
import { BookOpen, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from './blog/BlogPost';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

const Blog = ({ isStandalonePage = false }) => {
  const { data: posts, isLoading, refetch } = useBlogPosts();
  const [syncing, setSyncing] = useState(false);

  // Automatically sync posts when component mounts
  useEffect(() => {
    // Only sync if we're on the standalone blog page
    if (isStandalonePage) {
      handleSync();
    }
  }, [isStandalonePage]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-wordpress');
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Blog Synced",
        description: data.message || "Successfully synced posts from WordPress",
      });
      
      // Refetch posts after syncing
      refetch();
    } catch (error) {
      console.error("Failed to sync blog:", error);
      toast({
        title: "Sync Failed",
        description: error.message || "Could not sync posts from WordPress",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <section className={`py-20 ${isStandalonePage ? 'bg-background' : 'bg-gradient-to-b from-brand-navy/30 to-background'}`}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Blog
          </span>
          <h2 className="heading-lg mb-4 text-foreground">Latest Interview Tips</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Expert advice and insights to help you ace your next interview.
          </p>
          {/* Manual sync button removed from UI */}
        </div>

        {isLoading || syncing ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPost
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                readTime={post.read_time}
                featuredImage={post.featured_image_url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts available yet.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleSync}
              disabled={syncing}
            >
              <RefreshCcw className="h-4 w-4" />
              Sync now
            </Button>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Read More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;

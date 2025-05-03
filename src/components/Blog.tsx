
import { BookOpen, RefreshCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from './blog/BlogPost';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

const Blog = ({ isStandalonePage = false }) => {
  const { data: posts, isLoading, refetch } = useBlogPosts();
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncAttempts, setSyncAttempts] = useState(0);

  // Automatically sync posts when component mounts, but only once
  useEffect(() => {
    // Only sync if we're on the standalone blog page and haven't tried too many times
    if (isStandalonePage && syncAttempts === 0) {
      handleSync();
    }
  }, [isStandalonePage, syncAttempts]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncError(null);
    setSyncAttempts(prev => prev + 1);
    
    try {
      const response = await supabase.functions.invoke('sync-wordpress');
      
      if (response.error) {
        throw new Error(response.error.message || "Unknown error occurred");
      }
      
      const data = response.data || {};
      
      toast.success("Blog Synced", {
        description: data.message || "Successfully synced posts from WordPress",
      });
      
      // Refetch posts after syncing
      refetch();
    } catch (error) {
      console.error("Failed to sync blog:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not sync posts from WordPress";
      setSyncError(errorMessage);
      
      toast.error("Sync Failed", {
        description: errorMessage,
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
          {isStandalonePage && syncError && (
            <div className="text-center mb-4 max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="font-medium text-red-800">Sync Error</p>
                </div>
                <p className="text-red-700 text-sm">{syncError}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleSync}
                disabled={syncing}
              >
                <RefreshCcw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Try Again"}
              </Button>
            </div>
          )}
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

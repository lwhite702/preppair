
import { BookOpen, RefreshCcw, AlertCircle, Globe, Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from './blog/BlogPost';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdmin } from '@/hooks/useAdmin';

const Blog = ({ isStandalonePage = false }) => {
  const { data: posts, isLoading, refetch, error: postsError } = useBlogPosts();
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncAttempts, setSyncAttempts] = useState(0);
  const [wordpressUrl, setWordpressUrl] = useState('https://wrelik.com');
  const [lastSyncInfo, setLastSyncInfo] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { isAdmin } = useAdmin();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Automatically sync posts when component mounts, but only once
  useEffect(() => {
    // Only sync if we're on the standalone blog page and haven't tried too many times
    if (isStandalonePage && syncAttempts === 0) {
      handleSync();
    }
    
    // Fetch last sync info
    async function fetchLastSyncInfo() {
      try {
        const { data, error } = await supabase
          .from('wp_blog_settings')
          .select('*')
          .eq('id', '1') // Use string instead of number
          .single();
          
        if (error) throw error;
        setLastSyncInfo(data);
        
        // If we have a wordpress_url, use that as our default
        if (data?.wordpress_url) {
          setWordpressUrl(data.wordpress_url);
        }
      } catch (error) {
        console.error("Failed to fetch sync info:", error);
      }
    }
    
    fetchLastSyncInfo();
  }, [isStandalonePage, syncAttempts]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncError(null);
    setSyncAttempts(prev => prev + 1);
    setSyncStatus('idle');
    
    try {
      // Pass the WordPress URL in the request body
      const response = await supabase.functions.invoke('sync-wordpress', {
        body: { wordpressUrl }
      });
      
      console.log("Sync response:", response);
      
      if (response.error) {
        throw new Error(response.error || "Unknown error occurred");
      }
      
      const data = response.data || {};
      
      if (!data.success) {
        throw new Error(data.error || "Sync was not successful");
      }
      
      // Set success status
      setSyncStatus('success');
      
      // Call toast properly according to sonner's API
      toast(`Blog Synced - ${data.message || "Successfully synced posts from WordPress"}`);
      
      // Refresh last sync info
      const { data: syncInfo } = await supabase
        .from('wp_blog_settings')
        .select('*')
        .eq('id', '1') // Use string instead of number
        .single();
      
      if (syncInfo) {
        setLastSyncInfo(syncInfo);
        // Update the WordPress URL if it changed due to fallback
        if (data.usedFallback && syncInfo.wordpress_url) {
          setWordpressUrl(syncInfo.wordpress_url);
        }
      }
      
      // Refetch posts after syncing
      refetch();
    } catch (error) {
      console.error("Failed to sync blog:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not sync posts from WordPress";
      setSyncError(errorMessage);
      setSyncStatus('error');
      
      // Call toast properly for error states
      toast(`Sync Failed - ${errorMessage}`, {
        duration: 5000,
      });
    } finally {
      setSyncing(false);
    }
  };

  // Show sample posts if there's no data but we're not loading
  const showSamplePosts = !isLoading && (!posts || posts.length === 0);

  return (
    <section className={`py-20 ${isStandalonePage ? 'bg-background' : 'bg-gradient-to-b from-brand-navy/30 to-background'}`}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Blog
          </span>
          <h2 className="heading-lg mb-4 text-foreground">Latest Interview Tips</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-3">
            Expert advice and insights to help you ace your next interview.
          </p>
          
          {isStandalonePage && isAdmin && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-4 w-4" />
                Blog Settings
              </Button>
            </div>
          )}
          
          {isStandalonePage && lastSyncInfo && (
            <div className="text-xs text-muted-foreground max-w-2xl mx-auto mb-4">
              Last synced: {new Date(lastSyncInfo.last_synced).toLocaleString()} 
              {lastSyncInfo.sync_source && ` (${lastSyncInfo.sync_source})`}
              {lastSyncInfo.last_url && ` from ${lastSyncInfo.last_url}`}
            </div>
          )}
          
          {isStandalonePage && syncStatus === 'success' && (
            <Alert className="max-w-2xl mx-auto mb-4 bg-green-50 border-green-200">
              <Info className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-800">Sync Completed</AlertTitle>
              <AlertDescription className="text-green-700">
                Blog posts have been successfully imported.
              </AlertDescription>
            </Alert>
          )}
          
          {isStandalonePage && (syncStatus === 'error' || syncError) && (
            <div className="text-center mb-4 max-w-2xl mx-auto">
              <Alert className="mb-4 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-800">Sync Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {syncError || "There was a problem syncing your blog posts"}
                </AlertDescription>
              </Alert>
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
              Sync blog posts now
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
      
      {/* Blog Settings Dialog */}
      {isAdmin && (
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Blog Settings</DialogTitle>
              <DialogDescription>
                Configure WordPress sync settings. You can test different URLs to find what works.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="wordpress-url" className="text-right text-sm font-medium col-span-1">
                  WordPress URL
                </label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="wordpress-url"
                    value={wordpressUrl}
                    onChange={(e) => setWordpressUrl(e.target.value)}
                    className="flex-1"
                    placeholder="https://yoursite.com"
                  />
                </div>
              </div>
              {lastSyncInfo && (
                <div className="px-1 py-2 text-sm">
                  <p className="font-medium mb-1">Last Sync Information</p>
                  <div className="text-muted-foreground space-y-1">
                    <p>Time: {new Date(lastSyncInfo.last_synced).toLocaleString()}</p>
                    {lastSyncInfo.sync_source && <p>Source: {lastSyncInfo.sync_source}</p>}
                    {lastSyncInfo.last_url && <p>URL: {lastSyncInfo.last_url}</p>}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSettings(false)} variant="outline">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowSettings(false);
                  handleSync();
                }}
                className="gap-2"
                disabled={syncing}
              >
                <Globe className="h-4 w-4" />
                Test & Sync Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Blog;

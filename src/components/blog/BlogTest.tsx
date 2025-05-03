
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

type BlogSettings = {
  id: string;
  wordpress_url: string;
  last_synced: string;
  sync_source?: string;
  sync_frequency: string;
  auto_sync: boolean;
  api_key: string;
  created_at: string;
  updated_at: string;
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  author: string;
  read_time: string | null;
  categories: string[];
  published_at: string;
  updated_at: string;
  status: string;
};

const BlogTest = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncInfo, setLastSyncInfo] = useState<BlogSettings | null>(null);
  const [wordpressUrl, setWordpressUrl] = useState('https://wrelik.com');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [requestLog, setRequestLog] = useState<string[]>([]);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const addToLog = (message: string) => {
    setRequestLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const fetchPosts = async () => {
    try {
      addToLog('Fetching posts...');
      const { data, error } = await supabase
        .from('wp_blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      setPosts(data || []);
      addToLog(`Fetched ${data?.length || 0} posts`);
    } catch (error) {
      console.error('Error fetching posts:', error);
      addToLog(`Error fetching posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const fetchLastSyncInfo = async () => {
    try {
      addToLog('Fetching sync settings...');
      // Using string ID instead of number
      const { data, error } = await supabase
        .from('wp_blog_settings')
        .select('*')
        .eq('id', '1')
        .single();
        
      if (error) {
        addToLog(`Error fetching sync info: ${error.message}`);
        throw error;
      }
      
      setLastSyncInfo(data);
      addToLog('Sync info fetched successfully');
      
      if (data?.wordpress_url) {
        setWordpressUrl(data.wordpress_url);
        addToLog(`Using WordPress URL: ${data.wordpress_url}`);
      }
    } catch (error) {
      console.error("Failed to fetch sync info:", error);
      addToLog(`Failed to fetch sync info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncError(null);
    setSyncStatus('idle');
    addToLog(`Starting sync with URL: ${wordpressUrl}`);
    
    try {
      const response = await supabase.functions.invoke('sync-wordpress', {
        body: { wordpressUrl }
      });
      
      addToLog(`Sync response received: ${JSON.stringify(response)}`);
      
      if (response.error) {
        throw new Error(response.error || "Unknown error occurred");
      }
      
      const data = response.data || {};
      
      if (!data.success) {
        throw new Error(data.error || "Sync was not successful");
      }
      
      // Set success status
      setSyncStatus('success');
      addToLog(`Sync successful: ${data.message || "Successfully synced posts"}`);
      
      // Call toast
      toast(`Blog Synced - ${data.message || "Successfully synced posts from WordPress"}`);
      
      // Refresh last sync info
      await fetchLastSyncInfo();
      
      // Refetch posts after syncing
      await fetchPosts();
    } catch (error) {
      console.error("Failed to sync blog:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not sync posts from WordPress";
      setSyncError(errorMessage);
      setSyncStatus('error');
      addToLog(`Sync error: ${errorMessage}`);
      
      // Call toast for error states
      toast(`Sync Failed - ${errorMessage}`, {
        duration: 5000,
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">WordPress Blog Sync Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Sync Controls</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">WordPress URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={wordpressUrl}
                    onChange={(e) => setWordpressUrl(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="https://yoursite.com"
                  />
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={fetchLastSyncInfo}
                  >
                    Load
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleSync}
                disabled={syncing}
                className="w-full gap-2"
              >
                <RefreshCcw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Test Sync Now"}
              </Button>
              
              {syncStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <Info className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-800">Sync Completed</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Blog posts have been successfully imported.
                  </AlertDescription>
                </Alert>
              )}
              
              {(syncStatus === 'error' || syncError) && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle className="text-red-800">Sync Error</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {syncError || "There was a problem syncing your blog posts"}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {lastSyncInfo && (
              <div className="mt-6 p-3 bg-gray-50 rounded border">
                <h3 className="text-sm font-semibold">Last Sync Information</h3>
                <div className="text-xs space-y-1 mt-2">
                  <p>Time: {new Date(lastSyncInfo.last_synced).toLocaleString()}</p>
                  {lastSyncInfo.sync_source && <p>Source: {lastSyncInfo.sync_source}</p>}
                  {lastSyncInfo.wordpress_url && <p>URL: {lastSyncInfo.wordpress_url}</p>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Debug Log</h2>
            <div className="h-[300px] overflow-y-auto border rounded p-2 bg-gray-50 text-xs font-mono">
              {requestLog.length === 0 ? (
                <p className="text-gray-500">No logs yet. Start a sync to see activity.</p>
              ) : (
                requestLog.map((log, idx) => (
                  <div key={idx} className="py-1 border-b border-gray-100">{log}</div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Fetched Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available. Try syncing first.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                {post.featured_image_url && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    {post.read_time && <span>{post.read_time}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={fetchPosts}>
          Refresh Posts
        </Button>
        <Button variant="outline" onClick={() => setRequestLog([])}>
          Clear Log
        </Button>
      </div>
    </div>
  );
};

export default BlogTest;

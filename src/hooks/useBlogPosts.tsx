
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBlogPosts = (category?: string) => {
  return useQuery({
    queryKey: ["blog-posts", category],
    queryFn: async () => {
      try {
        let query = supabase
          .from("wp_blog_posts")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (category) {
          // Filter by category if provided
          query = query.contains("categories", [category]);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching blog posts:", error);
          throw error;
        }
        
        return data || [];
      } catch (error) {
        console.error("Error in useBlogPosts:", error);
        throw error;
      }
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

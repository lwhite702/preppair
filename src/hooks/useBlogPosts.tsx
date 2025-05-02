
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBlogPosts = (category?: string) => {
  return useQuery({
    queryKey: ["blog-posts", category],
    queryFn: async () => {
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
    },
  });
};

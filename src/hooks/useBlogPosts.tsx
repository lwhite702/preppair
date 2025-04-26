
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBlogPosts = (category?: string) => {
  return useQuery({
    queryKey: ["blog-posts", category],
    queryFn: async () => {
      let query = supabase
        .from("wp_blog_posts")
        .select("*, wp_blog_categories!inner(*)")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (category) {
        query = query.contains("categories", [category]);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};


import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from './blog/BlogPost';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <section className="py-20 bg-gradient-to-b from-brand-navy/30 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Blog
          </span>
          <h2 className="heading-lg mb-4 text-foreground">Latest Interview Tips</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert advice and insights to help you ace your next interview.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts?.map((post) => (
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
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            <BookOpen className="h-5 w-5" />
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;

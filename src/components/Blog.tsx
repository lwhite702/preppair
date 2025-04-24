import { BookOpen, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/config/blogPosts';

const Blog = () => {
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

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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

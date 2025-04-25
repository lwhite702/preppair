
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string | null;
  author: string;
  readTime: string | null;
  featuredImage: string | null;
}

export const BlogPost = ({ 
  title, 
  excerpt, 
  author, 
  readTime, 
  featuredImage 
}: BlogPostProps) => {
  return (
    <Card className="border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
      {featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import BlogTest from '@/components/blog/BlogTest';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BlogTestPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <BlogTest />
      </div>
    </div>
  );
};

export default BlogTestPage;

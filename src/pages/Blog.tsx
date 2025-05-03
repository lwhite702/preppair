
import React from 'react';
import Blog from '@/components/Blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow pt-20">
        <Blog />
      </main>
    </div>
  );
};

export default BlogPage;

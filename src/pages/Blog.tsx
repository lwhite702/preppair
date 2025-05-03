
import React from 'react';
import Blog from '@/components/Blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ErrorBoundary>
        <main className="flex-grow pt-20">
          <Blog isStandalonePage={true} />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default BlogPage;

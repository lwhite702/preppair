
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CreateGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-4xl font-bold mb-8">Create Interview Guide</h1>
        <p className="text-lg mb-6">This page is under development.</p>
      </main>
      <Footer />
    </div>
  );
};

export default CreateGuide;

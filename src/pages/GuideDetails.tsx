
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GuideDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-4xl font-bold mb-8">Guide Details</h1>
        <p className="text-lg mb-6">
          Viewing guide with ID: {id}
        </p>
        <p>This page is under development.</p>
      </main>
      <Footer />
    </div>
  );
};

export default GuideDetails;

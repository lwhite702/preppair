
import React from 'react';
import { useParams } from 'react-router-dom';

const GuideDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Guide Details</h1>
      <p className="text-lg mb-6">
        Viewing guide with ID: {id}
      </p>
      <p>This page is under development.</p>
    </main>
  );
};

export default GuideDetails;

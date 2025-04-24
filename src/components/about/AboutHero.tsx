
import React from 'react';
import { Sparkle } from 'lucide-react';

const AboutHero = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-br from-primary to-yellow-500 p-3 rounded-lg shadow-md inline-flex">
          <Sparkle className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">About PrepPair.Me</h1>
      <p className="text-xl text-muted-foreground">
        Your AI-powered interview sidekick — built by job seekers, for job seekers.
      </p>
    </div>
  );
};

export default AboutHero;

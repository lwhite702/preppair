
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-4xl font-bold mb-8">About PrepPair</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            PrepPair is a cutting-edge AI-powered interview preparation platform that helps job seekers land their dream jobs with confidence. Our platform combines advanced artificial intelligence with proven interview techniques to create personalized preparation guides tailored to your specific needs.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to democratize interview success by providing every job seeker with access to high-quality, personalized interview preparation resources. We believe that everyone deserves the opportunity to present their best self in job interviews.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2024, PrepPair emerged from a simple observation: traditional interview preparation methods weren't keeping pace with the evolving job market. Our team of industry veterans and AI specialists came together to create a solution that combines human insight with artificial intelligence.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mt-12">
            <p className="text-sm text-gray-600">
              PrepPair™ is a registered trademark of Wrelik Brands LLC. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

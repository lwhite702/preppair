
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="mb-4">
              By accessing and using PrepPair, you agree to be bound by these Terms of Service. Our service is provided "as is" and is subject to the following terms and conditions.
            </p>
            {/* Add more terms content */}
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use PrepPair.
            </p>
            {/* Add more privacy content */}
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Copyright Notice</h2>
            <p className="mb-4">
              PrepPair™ is a registered trademark of Wrelik Brands LLC. All content, features, and functionality of the PrepPair platform are owned by Wrelik Brands LLC and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;

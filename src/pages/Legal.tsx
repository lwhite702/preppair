
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/components/ui/link';

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16 bg-background">
        <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="text-muted-foreground mb-6">
              Our Terms of Service outline the rules and guidelines for using PrepPair's services and features.
            </p>
            <Link href="/terms" className="text-primary hover:underline font-medium">
              Read Terms →
            </Link>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">
              Learn how we collect, use, and protect your personal information when you use our services.
            </p>
            <Link href="/privacy" className="text-primary hover:underline font-medium">
              Read Privacy Policy →
            </Link>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground mb-6">
              Information about how we use cookies and similar technologies across our websites.
            </p>
            <Link href="/cookies" className="text-primary hover:underline font-medium">
              Read Cookie Policy →
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            PrepPair™ is a registered trademark of Wrelik Brands LLC. All rights reserved.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;

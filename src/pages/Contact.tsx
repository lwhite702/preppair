
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <main className="container py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions about PrepPair? We're here to help! Fill out the form below or reach out through our support channels.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input placeholder="Your name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="How can we help?" className="min-h-[150px]" />
            </div>
            
            <Button className="w-full">Send Message</Button>
          </form>

          <div className="mt-12 pt-12 border-t">
            <h3 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4">
              <p>Email: support@preppair.me</p>
              <p>Business Hours: Monday - Friday, 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

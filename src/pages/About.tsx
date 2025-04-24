
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import MainContent from '@/components/about/MainContent';
import CompanyValues from '@/components/about/CompanyValues';
import HowItWorks from '@/components/about/HowItWorks';
import TeamSection from '@/components/about/TeamSection';
import PrivacySection from '@/components/about/PrivacySection';
import TrademarkNotice from '@/components/about/TrademarkNotice';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white/5">
      <Header />
      <main className="flex-grow container py-16">
        <div className="max-w-4xl mx-auto">
          <AboutHero />
          <MainContent />
          <CompanyValues />
          <HowItWorks />
          <TeamSection />
          <PrivacySection />
          <TrademarkNotice />
          
          {/* CTA */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Ace Your Next Interview?</h2>
            <Link to="/create">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Create Your Free Guide
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

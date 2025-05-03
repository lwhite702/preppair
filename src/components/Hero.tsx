
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Enhanced gradient overlay with darker background for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#303F9F] to-[#3949AB] opacity-95" />
      
      {/* Animated floating elements with reduced opacity */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-[#D6BCFA] to-[#B794F4] rounded-full blur-xl opacity-10 animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-[#7E69AB] to-[#5E4A9D] rounded-full blur-xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Enhanced main title with stronger text shadow and outline for better visibility */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-display 
            [text-shadow:_0_1px_0_rgb(0_0_0_/_40%),_0_0_8px_rgba(0,0,0,0.5)]
            animate-fade-in">
              Unlock Your Full Interview Potential
            </h1>
          </div>
          
          {/* Enhanced subtitle with better contrast */}
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] 
          [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
            Get personalized interview guides, smart feedback, and coaching from your AI mentor.
          </p>
          
          {/* CTA Buttons with improved visibility */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:400ms]">
            <Link href="/create-guide">
              <Button size="lg" className="bg-gradient-to-r from-[#F97316] to-[#FDBA74] hover:opacity-90 text-white px-8 py-6 text-lg shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Create Free Guide
                <Sparkle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {!user && (
              <Link href="/auth">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-white/90 px-8 py-6 text-lg border border-white/30">
                  Sign In
                </Button>
              </Link>
            )}
            {user && (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-brand-navy hover:bg-white/90 px-8 py-6 text-lg border border-white/30">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
          
          {/* Feature Badges with improved visibility */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:600ms]">
            <FeatureBadge>AI-Powered</FeatureBadge>
            <FeatureBadge>Smart Feedback</FeatureBadge>
            <FeatureBadge>Personal Coach</FeatureBadge>
            <FeatureBadge>Proven Results</FeatureBadge>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full text-white hover:bg-white/30 transition-colors shadow-md">
      <Sparkle className="h-4 w-4 text-[#FFCC80]" />
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Hero;

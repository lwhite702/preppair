
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen bg-[#1A1F2C] overflow-hidden flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1F2C] via-[#2A1F3D] to-[#3D1F4F] opacity-80" />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-[#FF8A4C] to-[#FFA149] rounded-full blur-xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-[#FF4C9D] to-[#FF49B6] rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight [text-shadow:_0_0_30px_rgba(255,255,255,0.2)] animate-fade-in">
            Your AI Interview Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-[#E5E7EB] mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Get personalized interview guides, smart feedback, and coaching from your AI mentor.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:400ms]">
            <RouterLink to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-gradient-to-r from-[#FF4C9D] to-[#FF8A4C] hover:opacity-90 text-white px-8 py-6 text-lg shadow-[0_0_20px_rgba(255,76,157,0.3)]">
                {user ? "Go to Dashboard" : "Get Started Free"}
                <Sparkle className="ml-2 h-5 w-5" />
              </Button>
            </RouterLink>
            {!user && (
              <RouterLink to="/auth">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm">
                  Sign In
                </Button>
              </RouterLink>
            )}
          </div>
          
          {/* Feature Badges */}
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
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-white/80">
      <Sparkle className="h-4 w-4 text-[#FF4C9D]" />
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Hero;


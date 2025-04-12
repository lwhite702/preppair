
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@/components/ui/link';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-6 animate-fade-in">
            Ace Your Next Interview with AI-Powered Guidance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            Upload your resume and job description, and get a personalized interview guide with tailored questions, answers, and strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Button size="lg" asChild>
              <RouterLink to="/dashboard">
                Create Your Guide <ArrowRight className="ml-2 h-4 w-4" />
              </RouterLink>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

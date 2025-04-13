
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@/components/ui/link';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  action: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

const Hero = ({ title, subtitle, description, action, secondaryAction }: HeroProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-primary animate-fade-in">
            {subtitle}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            {action}
            {secondaryAction}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

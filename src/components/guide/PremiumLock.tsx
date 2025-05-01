
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PremiumLockProps {
  onUpgrade: () => void;
}

export const PremiumLock: React.FC<PremiumLockProps> = ({ onUpgrade }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-sm rounded-md">
      <div className="text-center max-w-md p-6">
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
        <p className="text-muted-foreground mb-6">
          Upgrade to our premium plan to access the complete interview guide with all questions, insights, and preparation tips.
        </p>
        <Button size="lg" onClick={onUpgrade}>
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

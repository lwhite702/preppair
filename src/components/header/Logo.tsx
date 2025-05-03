
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Link } from '@/components/ui/link';
import { useIsMobile } from '@/hooks/use-mobile';

const Logo: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex-1">
      <Link href="/" className="flex items-center">
        <div className={`bg-gradient-to-br from-primary to-yellow-500 ${isMobile ? 'p-1.5' : 'p-2'} rounded-lg shadow-md`}>
          <Sparkle className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
        </div>
        <div className="ml-2 flex flex-col">
          <span className={`text-white font-display font-bold ${isMobile ? 'text-lg' : 'text-xl'} tracking-tight`}>
            PrepPair.Me
          </span>
          {!isMobile && (
            <span className="text-white/70 text-[10px] -mt-1 font-medium">Your AI Interview Partner</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Logo;

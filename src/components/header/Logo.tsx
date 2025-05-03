
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';

const Logo: React.FC = () => {
  const { isMobile } = useScreenSize();
  
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center">
        <div className={`bg-gradient-to-br from-primary to-yellow-500 ${isMobile ? 'p-1' : 'p-2'} rounded-lg shadow-md`}>
          <Sparkle className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-white`} />
        </div>
        <div className="ml-2 flex flex-col">
          <span className={`text-white font-display font-bold ${isMobile ? 'text-sm' : 'text-xl'} tracking-tight`}>
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

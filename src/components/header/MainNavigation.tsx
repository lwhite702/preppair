
import React from 'react';
import { Link } from '@/components/ui/link';

const MainNavigation: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8">
      <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        About
      </Link>
      <Link href="/faq" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        FAQ
      </Link>
      <Link href="/pricing" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        Pricing
      </Link>
      <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        Contact
      </Link>
    </div>
  );
};

export default MainNavigation;

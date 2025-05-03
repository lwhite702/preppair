
import React from 'react';
import { Link } from '@/components/ui/link';

const MainNavigation: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
      <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium">
        About
      </Link>
      <Link href="/faq" className="text-white/90 hover:text-white transition-colors font-medium">
        FAQ
      </Link>
      <Link href="/pricing" className="text-white/90 hover:text-white transition-colors font-medium">
        Pricing
      </Link>
      <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-medium">
        Contact
      </Link>
    </div>
  );
};

export default MainNavigation;

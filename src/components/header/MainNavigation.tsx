
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const MainNavigation: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8">
      <RouterLink to="/about" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        About
      </RouterLink>
      <RouterLink to="/faq" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        FAQ
      </RouterLink>
      <RouterLink to="/pricing" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        Pricing
      </RouterLink>
      <RouterLink to="/contact" className="text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
        Contact
      </RouterLink>
    </div>
  );
};

export default MainNavigation;

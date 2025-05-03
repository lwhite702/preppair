
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button 
      className="md:hidden p-1.5 text-white hover:text-primary rounded-md"
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

export default MobileMenuButton;

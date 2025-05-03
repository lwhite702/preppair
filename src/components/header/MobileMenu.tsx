
import React from 'react';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  user, 
  handleSignOut 
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden py-2 border-t border-white/10 absolute top-full left-0 right-0 bg-brand-navy/95 backdrop-blur-md shadow-md z-50">
      <nav className="flex flex-col space-y-2 container">
        <Link
          href="/about"
          className="text-white/90 hover:text-white transition-colors font-medium px-1 py-1.5"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/faq"
          className="text-white/90 hover:text-white transition-colors font-medium px-1 py-1.5"
          onClick={() => setIsMenuOpen(false)}
        >
          FAQ
        </Link>
        <Link
          href="/pricing"
          className="text-white/90 hover:text-white transition-colors font-medium px-1 py-1.5"
          onClick={() => setIsMenuOpen(false)}
        >
          Pricing
        </Link>
        <Link
          href="/contact"
          className="text-white/90 hover:text-white transition-colors font-medium px-1 py-1.5"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="outline"
                className="border-primary/50 bg-primary/10 text-white hover:bg-primary/20 w-full font-medium text-sm h-9"
              >
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="ghost"
              className="w-full text-white/80 hover:text-white font-medium h-9 text-sm"
              onClick={() => {
                handleSignOut();
                setIsMenuOpen(false);
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/create-guide"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="default"
                className="bg-primary text-white hover:bg-primary/90 w-full font-medium h-9 text-sm"
              >
                Get Started
              </Button>
            </Link>
            <Link
              href="/auth"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="outline"
                className="border-primary/50 bg-primary/10 text-white hover:bg-primary/20 w-full font-medium h-9 text-sm"
              >
                Sign In
              </Button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;

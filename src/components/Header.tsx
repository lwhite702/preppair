
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    // Only scroll to top if navigating to a new path
    if (path !== location.pathname) {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-brand-navy/95 to-brand-navy/85 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="container py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
              href="/"
              className="flex items-center cursor-pointer"
            >
              <div className="bg-gradient-to-br from-primary to-yellow-500 p-2 rounded-lg shadow-md">
                <Sparkle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-2 flex flex-col">
                <span className="text-white font-display font-bold text-xl tracking-tight">PrepPair.Me</span>
                <span className="text-white/70 text-[10px] -mt-1 font-medium">Your AI Interview Partner</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/about');
              }}
              href="/about" 
              className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
            >
              About
            </a>
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/faq');
              }}
              href="/faq" 
              className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
            >
              FAQ
            </a>
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/pricing');
              }}
              href="/pricing" 
              className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
            >
              Pricing
            </a>
            <a 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/contact');
              }}
              href="/contact" 
              className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
            >
              Contact
            </a>
          </div>
          
          {/* User Menu - Right aligned */}
          <div className="flex-1 flex justify-end">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-primary bg-primary/10 text-white hover:bg-primary/20 font-medium">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => {
                    handleNavigation('/dashboard');
                  }}>
                    My Guides
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="border-primary bg-primary/10 text-white hover:bg-primary/20 font-medium"
                onClick={() => handleNavigation('/auth')}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-4 p-2 text-white hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/about');
                  setIsMenuOpen(false);
                }}
                href="/about"
                className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                About
              </a>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/faq');
                  setIsMenuOpen(false);
                }}
                href="/faq"
                className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                FAQ
              </a>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/pricing');
                  setIsMenuOpen(false);
                }}
                href="/pricing"
                className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                Pricing
              </a>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/contact');
                  setIsMenuOpen(false);
                }}
                href="/contact"
                className="text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                Contact
              </a>
              {user ? (
                <>
                  <Button 
                    variant="outline"
                    className="border-primary bg-primary/10 text-white hover:bg-primary/20 w-full font-medium"
                    onClick={() => {
                      handleNavigation('/dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost"
                    className="w-full text-white/80 hover:text-white font-medium"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  className="border-primary bg-primary/10 text-white hover:bg-primary/20 w-full font-medium"
                  onClick={() => {
                    handleNavigation('/auth');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

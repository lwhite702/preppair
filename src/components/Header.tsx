
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-[#141B40]/80 to-[#1A237E]/80 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="container py-4">
        <nav className="flex items-center justify-center relative">
          
          {/* Centered Logo */}
          <Link to="/" className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img 
              src="/lovable-uploads/39c7204a-3071-4ad6-a1da-957a62a4903f.png" 
              alt="PrepPair Logo" 
              className="h-12 w-auto"
              style={{ filter: 'invert(88%) sepia(40%) saturate(700%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
            />
            <span className="ml-2 text-white font-bold text-xl select-none">PrepPair</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#F97316] bg-[#F97316]/10 text-white hover:bg-[#F97316]/20">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
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
                className="border-[#F97316] bg-[#F97316]/10 text-white hover:bg-[#F97316]/20"
                onClick={() => navigate('/auth')}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-[#F97316] absolute right-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/faq"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Button 
                    variant="outline"
                    className="border-[#F97316] bg-[#F97316]/10 text-white hover:bg-[#F97316]/20 w-full"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost"
                    className="w-full text-white/80 hover:text-white"
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
                  className="border-[#F97316] bg-[#F97316]/10 text-white hover:bg-[#F97316]/20 w-full"
                  onClick={() => {
                    navigate('/auth');
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



import React, { useState } from 'react';
import { Menu, X, UserCircle, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from '@/components/ui/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-brand-navy/95 to-brand-navy/85 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="container py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-br from-primary to-yellow-500 p-2 rounded-lg shadow-md">
                <Sparkle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-2 flex flex-col">
                <span className="text-white font-display font-bold text-xl tracking-tight">PrepPair.Me</span>
                <span className="text-white/70 text-[10px] -mt-1 font-medium">Your AI Interview Partner</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
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
                  <DropdownMenuItem onClick={() => {}}>
                    <Link href="/dashboard" className="w-full">My Guides</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-3">
                <Link href="/create-guide">
                  <Button 
                    variant="default"
                    className="bg-primary text-white hover:bg-primary/90 font-medium"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button 
                    variant="outline" 
                    className="border-primary bg-primary/10 text-white hover:bg-primary/20 font-medium"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </div>
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
              <Link
                href="/about"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/pricing"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-white/90 hover:text-white transition-colors font-medium"
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
                      className="border-primary bg-primary/10 text-white hover:bg-primary/20 w-full font-medium"
                    >
                      Dashboard
                    </Button>
                  </Link>
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
                <>
                  <Link
                    href="/create-guide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button 
                      variant="default"
                      className="bg-primary text-white hover:bg-primary/90 w-full font-medium"
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
                      className="border-primary bg-primary/10 text-white hover:bg-primary/20 w-full font-medium"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

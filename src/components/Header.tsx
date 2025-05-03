
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
import { useScreenSize } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isMobile } = useScreenSize();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const headerHeight = isMobile ? "h-14" : "h-16"; // Define explicit header height

  return (
    <>
      {/* Add a spacer div that matches the header height */}
      <div className={headerHeight}></div>
      
      <header className={`fixed top-0 w-full z-50 bg-gradient-to-r from-brand-navy/95 to-brand-navy/85 backdrop-blur-md border-b border-white/10 shadow-md ${headerHeight}`}>
        <div className="container py-2 md:py-4 h-full flex items-center">
          <nav className="flex items-center justify-between w-full">
            {/* Compact Logo */}
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
                    <Button 
                      variant="outline" 
                      className="border-primary bg-primary/10 text-white hover:bg-primary/20 font-medium"
                      size={isMobile ? "sm" : "default"}
                    >
                      <UserCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-1`} />
                      {isMobile ? "Menu" : "Dashboard"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-brand-navy/95 backdrop-blur-md border border-white/10 text-white">
                    <DropdownMenuItem onClick={() => {}} className="hover:bg-white/10 focus:bg-white/10">
                      <Link href="/dashboard" className="w-full">My Guides</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="hover:bg-white/10 focus:bg-white/10">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Link href="/create-guide">
                    <Button 
                      variant="default"
                      className="bg-primary text-white hover:bg-primary/90 font-medium"
                      size={isMobile ? "sm" : "default"}
                    >
                      {isMobile ? "Start" : "Get Started"}
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button 
                      variant="outline" 
                      className="border-primary bg-primary/10 text-white hover:bg-primary/20 font-medium"
                      size={isMobile ? "sm" : "default"}
                    >
                      <UserCircle className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-1`} />
                      {isMobile ? "Sign In" : "Sign In"}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden ml-2 p-1.5 text-white hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation - Compact Overlay */}
          {isMenuOpen && (
            <div className="md:hidden py-3 border-t border-white/10 absolute top-full left-0 right-0 bg-brand-navy/95 backdrop-blur-md shadow-md">
              <nav className="flex flex-col space-y-3 container">
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
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

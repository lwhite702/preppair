
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useScreenSize } from '@/hooks/use-mobile';

// Import the extracted components
import Logo from './header/Logo';
import MainNavigation from './header/MainNavigation';
import UserMenu from './header/UserMenu';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isMobile } = useScreenSize();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const headerHeight = isMobile ? "h-14" : "h-16"; // Define explicit header height
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Add a spacer div that matches the header height */}
      <div className={headerHeight}></div>
      
      <header className={`fixed top-0 w-full z-50 bg-gradient-to-r from-brand-navy/95 to-brand-navy/85 backdrop-blur-md border-b border-white/10 shadow-md ${headerHeight}`}>
        <div className="container py-2 md:py-4 h-full flex items-center">
          <nav className="flex items-center justify-between w-full">
            {/* Logo Component */}
            <Logo />

            {/* Desktop Navigation */}
            <MainNavigation />
            
            {/* User Menu */}
            <div className="flex-1 flex justify-end">
              <UserMenu user={user} handleSignOut={handleSignOut} />

              {/* Mobile Menu Button */}
              <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MobileMenu 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            user={user} 
            handleSignOut={handleSignOut}
          />
        </div>
      </header>
    </>
  );
};

export default Header;

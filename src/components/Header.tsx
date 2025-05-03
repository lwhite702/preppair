
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/header/Logo';
import UserMenu from '@/components/header/UserMenu';
import MainNavigation from '@/components/header/MainNavigation';
import MobileMenu from '@/components/header/MobileMenu';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#141B40] bg-opacity-90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Logo />

          {user && (
            <NavigationMenu className="hidden md:flex ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActive('/dashboard') ? 'bg-primary/20' : ''}`}>
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/guide/create">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActive('/guide/create') ? 'bg-primary/20' : ''}`}>
                      Create Guide
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/job-tracker">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActive('/job-tracker') ? 'bg-primary/20' : ''}`}>
                      Job Tracker
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/calendar">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${isActive('/calendar') ? 'bg-primary/20' : ''}`}>
                      Calendar
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <MainNavigation />
          <UserMenu user={user} handleSignOut={handleSignOut} />
          <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} user={user} handleSignOut={handleSignOut} />
        </div>
      </div>
    </header>
  );
};

export default Header;

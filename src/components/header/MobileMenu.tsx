
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, user, handleSignOut }) => {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] bg-[#141B40] text-white border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-6 mt-6">
            <div className="flex flex-col space-y-3">
              {user ? (
                <>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/guide/create">Create Guide</Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/job-tracker">Job Tracker</Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/calendar">Calendar</Link>
                  </Button>
                </>
              ) : null}
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                <Link to="/about">About</Link>
              </Button>
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                <Link to="/faq">FAQ</Link>
              </Button>
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
            <div className="pt-2 border-t border-white/10">
              {user ? (
                <Button onClick={() => { handleSignOut(); setIsOpen(false); }} variant="destructive">
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                    <Link to="/guide/create">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;

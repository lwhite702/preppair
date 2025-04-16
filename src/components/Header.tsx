import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="border-b border-white/10 bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/39c7204a-3071-4ad6-a1da-957a62a4903f.png" 
              alt="PrepPair Logo"
              className="h-8 w-8 object-contain mr-2"
            />
            <span className="text-xl font-bold gradient-text">PrepPair.me</span>
          </div>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#jobs" className="font-medium text-foreground/80 hover:text-primary transition-colors">Jobs</a>
          <a href="#pricing" className="font-medium text-foreground/80 hover:text-primary transition-colors">Pricing</a>
          <a href="#blog" className="font-medium text-foreground/80 hover:text-primary transition-colors">Blog</a>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-foreground">{getInitials(profile?.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{profile?.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/dashboard')} className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="flex items-center border-primary/30 hover:bg-primary/20" onClick={() => navigate('/auth')}>
              <UserCircle className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t border-white/10">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#how-it-works"
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            {user ? (
              <>
                <div className="py-2">
                  <div className="font-medium">{profile?.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center w-full bg-transparent border-primary/30"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/dashboard');
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center w-full bg-transparent border-destructive/30 text-destructive" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="flex items-center justify-center w-full bg-transparent border-primary/30 hover:bg-primary/20" 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/auth');
                }}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

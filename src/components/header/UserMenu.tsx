
import React from 'react';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, handleSignOut }) => {
  const { isMobile } = useScreenSize();
  
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-primary/50 bg-primary/10 text-white hover:bg-primary/20 font-medium"
            size={isMobile ? "sm" : "default"}
          >
            <UserCircle className="h-4 w-4" />
            {!isMobile && <span className="ml-1">Dashboard</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-brand-navy/95 backdrop-blur-md border border-white/10 text-white">
          <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10">
            <Link to="/dashboard" className="w-full">My Guides</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut} className="hover:bg-white/10 focus:bg-white/10">
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <div className="flex gap-1 items-center">
      <Link to="/guide/create">
        <Button 
          variant="default"
          className="bg-primary text-white hover:bg-primary/90 font-medium"
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Start" : "Get Started"}
        </Button>
      </Link>
      <Link to="/auth">
        <Button 
          variant="outline" 
          className="border-primary/50 bg-primary/10 text-white hover:bg-primary/20 font-medium"
          size={isMobile ? "sm" : "default"}
        >
          <UserCircle className="h-4 w-4" />
          {!isMobile && <span className="ml-1">Sign In</span>}
        </Button>
      </Link>
    </div>
  );
};

export default UserMenu;

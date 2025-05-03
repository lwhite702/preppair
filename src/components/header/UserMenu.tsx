
import React from 'react';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();
  
  if (user) {
    return (
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
    );
  }
  
  return (
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
  );
};

export default UserMenu;

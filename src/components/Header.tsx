
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">InterviewAce</span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link to="/dashboard" className="font-medium text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/" className="font-medium text-gray-700 hover:text-primary transition-colors">Pricing</Link>
          <Button variant="outline" className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button variant="outline" className="flex items-center justify-center w-full">
              <UserCircle className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

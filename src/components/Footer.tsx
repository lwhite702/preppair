
import { Link } from "@/components/ui/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-primary mb-4">InterviewAce</h2>
            <p className="text-muted-foreground max-w-xs">
              AI-powered interview preparation to help you land your dream job.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/">Features</Link></li>
                <li><Link href="/">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/">About</Link></li>
                <li><Link href="/">Blog</Link></li>
                <li><Link href="/">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/">Privacy</Link></li>
                <li><Link href="/">Terms</Link></li>
                <li><Link href="/">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} InterviewAce. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Twitter
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              LinkedIn
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

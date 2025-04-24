
import { Link } from "@/components/ui/link";
import { Twitter, Linkedin, Github, MessageSquare, Sparkle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy/95 py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-primary to-yellow-500 p-2 rounded-lg shadow-md">
                <Sparkle className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white ml-2 font-display">PrepPair.Me</h2>
            </div>
            <p className="text-gray-300 max-w-xs leading-relaxed">
              Your AI interview partner—turning resumes and job descriptions into tailored prep guides.
            </p>
            
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4 text-white text-lg">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="text-gray-300 hover:text-primary font-medium">Dashboard</Link></li>
                <li><Link href="/#features" className="text-gray-300 hover:text-primary font-medium">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-300 hover:text-primary font-medium">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-white text-lg">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-300 hover:text-primary font-medium">About</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-primary font-medium">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-primary font-medium">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 text-white text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/legal" className="text-gray-300 hover:text-primary font-medium">Privacy</Link></li>
                <li><Link href="/legal" className="text-gray-300 hover:text-primary font-medium">Terms</Link></li>
                <li><Link href="/legal" className="text-gray-300 hover:text-primary font-medium">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 font-medium">
            © {currentYear} PrepPair.Me. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <MessageSquare className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm text-gray-300 font-medium">
              Built with ❤️ for job seekers everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

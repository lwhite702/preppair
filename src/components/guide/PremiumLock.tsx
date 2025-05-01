
import { Button } from "@/components/ui/button";
import { Lock, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PremiumLockProps {
  onUpgrade?: () => void;
}

export const PremiumLock = ({ onUpgrade }: PremiumLockProps) => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Star className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-semibold text-yellow-800">Unlock Premium Content</h3>
      </div>
      
      <p className="text-yellow-800 mb-4">
        Get every advantage in your interview preparation with our complete premium guide.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Complete Guide Access</p>
            <p className="text-sm text-gray-600">All sections unlocked</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">STAR Story Templates</p>
            <p className="text-sm text-gray-600">Tailored to your experience</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Follow-up Email Generator</p>
            <p className="text-sm text-gray-600">Stand out after your interview</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">Interview Calendar</p>
            <p className="text-sm text-gray-600">Track all your applications</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-md border border-yellow-200">
        <div>
          <p className="font-semibold text-gray-900">Premium Membership</p>
          <p className="text-sm text-gray-600">
            <span className="text-xl font-bold text-primary">$24.99</span>/month - Cancel anytime
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-colors w-full sm:w-auto"
          onClick={handleUpgrade}
          size="lg"
        >
          Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-center mt-4 text-gray-600">
        One successful interview can be worth thousands of dollars in salary negotiations.
      </p>
    </div>
  );
};

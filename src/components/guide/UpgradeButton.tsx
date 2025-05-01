
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UpgradeButtonProps {
  onClick?: () => void;
}

export const UpgradeButton = ({ onClick }: UpgradeButtonProps) => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to pricing page as default action
      navigate('/pricing');
    }
  };

  return (
    <Button 
      variant="outline" 
      className="gap-1 border-yellow-400 hover:bg-yellow-50 text-yellow-800"
      onClick={handleUpgrade}
    >
      <Crown className="h-4 w-4" />
      Upgrade to Premium
    </Button>
  );
};

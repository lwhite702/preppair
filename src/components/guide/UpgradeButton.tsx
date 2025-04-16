
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UpgradeButtonProps {
  onClick?: () => void;
}

export const UpgradeButton = ({ onClick }: UpgradeButtonProps) => {
  const handleUpgrade = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior
      toast.info("Upgrade feature coming soon!");
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

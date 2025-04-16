
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface PremiumLockProps {
  onUpgrade?: () => void;
}

export const PremiumLock = ({ onUpgrade }: PremiumLockProps) => {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      toast.info("Upgrade feature coming soon!");
    }
  };

  return (
    <div className="mt-8 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="h-5 w-5 text-yellow-600" />
        <h3 className="font-medium text-yellow-800">Premium Content Locked</h3>
      </div>
      <p className="text-sm text-yellow-700 mb-4">
        Upgrade to Premium to unlock all sections, STAR story templates, and the follow-up email generator.
      </p>
      <Button 
        className="bg-yellow-500 hover:bg-yellow-600 text-white"
        onClick={handleUpgrade}
      >
        Upgrade for $24.99/month
      </Button>
    </div>
  );
};


import { Crown } from "lucide-react";

export const PremiumBadge = () => {
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
      <Crown className="h-3 w-3" />
      <span>Premium</span>
    </div>
  );
};

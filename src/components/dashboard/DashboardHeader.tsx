
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  profile: UserProfile | null;
  guidesCount: number;
}

const DashboardHeader = ({ profile, guidesCount }: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
      <div>
        <h1 className={`font-bold tracking-tight ${isMobile ? "text-2xl" : "text-3xl"}`}>
          Welcome, {profile?.name || "User"}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          {guidesCount} interview {guidesCount === 1 ? "guide" : "guides"} created
        </p>
      </div>
      
      <Link to="/create">
        <Button className="flex items-center gap-1" size={isMobile ? "sm" : "default"}>
          <PlusCircle className={`${isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} mr-1`} />
          {isMobile ? "New Guide" : "Create New Guide"}
        </Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;


import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  profile: UserProfile | null;
  guidesCount: number;
}

const DashboardHeader = ({ profile, guidesCount }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {profile?.name || "User"}
        </h1>
        <p className="text-muted-foreground">
          You have created {guidesCount} interview {guidesCount === 1 ? "guide" : "guides"} so far.
        </p>
      </div>
      
      <Link to="/create">
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4 mr-1" />
          Create New Guide
        </Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;

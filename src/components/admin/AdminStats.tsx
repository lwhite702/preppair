import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useScreenSize } from "@/hooks/use-mobile";

interface StatsData {
  totalUsers: number;
  totalGuides: number;
  guidesThisMonth: number;
  guidesLastMonth: number;
  averageGuidesPerUser: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useScreenSize();

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get total users
      const { count: totalUsers, error: usersError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      
      if (usersError) throw usersError;
      
      // Get total guides
      const { count: totalGuides, error: guidesError } = await supabase
        .from("interview_guides")
        .select("*", { count: "exact", head: true });
      
      if (guidesError) throw guidesError;
      
      // Get guides created this month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
      
      const { count: guidesThisMonth, error: thisMonthError } = await supabase
        .from("interview_guides")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth)
        .lte("created_at", endOfMonth);
      
      if (thisMonthError) throw thisMonthError;
      
      // Get guides created last month
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();
      
      const { count: guidesLastMonth, error: lastMonthError } = await supabase
        .from("interview_guides")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfLastMonth)
        .lte("created_at", endOfLastMonth);
      
      if (lastMonthError) throw lastMonthError;
      
      // Calculate average guides per user
      const averageGuidesPerUser = totalUsers ? Math.round((totalGuides / totalUsers) * 10) / 10 : 0;
      
      setStats({
        totalUsers: totalUsers || 0,
        totalGuides: totalGuides || 0,
        guidesThisMonth: guidesThisMonth || 0,
        guidesLastMonth: guidesLastMonth || 0,
        averageGuidesPerUser
      });
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-4 md:py-8 flex justify-center">
        <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Platform Overview</h2>
      
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          description="Registered accounts"
          icon={<Users className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />}
          isMobile={isMobile}
        />
        
        <StatCard
          title="Total Guides"
          value={stats?.totalGuides || 0}
          description="Interview guides created"
          icon={<FileText className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />}
          isMobile={isMobile}
        />
        
        <StatCard
          title="Guides This Month"
          value={stats?.guidesThisMonth || 0}
          description={stats && stats.guidesLastMonth > 0 ? (
            <>
              {stats.guidesThisMonth > stats.guidesLastMonth ? (
                <span className="text-green-500">
                  ↑ {Math.round((stats.guidesThisMonth / stats.guidesLastMonth - 1) * 100)}%
                </span>
              ) : (
                <span className="text-red-500">
                  ↓ {Math.round((1 - stats.guidesThisMonth / stats.guidesLastMonth) * 100)}%
                </span>
              )}
            </>
          ) : "No comparison data"}
          icon={<Calendar className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />}
          isMobile={isMobile}
        />
        
        <StatCard
          title="Guides Per User"
          value={stats?.averageGuidesPerUser || 0}
          description="Average per registered user"
          icon={<Users className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />}
          isMobile={isMobile}
        />
      </div>

      <Card>
        <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
          <CardTitle className={isMobile ? 'text-lg' : ''}>Monthly Usage</CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? 'px-3 pb-3 pt-0' : ''}>
          <div className={`${isMobile ? 'h-[150px]' : 'h-[200px]'} flex items-center justify-center`}>
            <p className="text-muted-foreground text-sm">
              Charts component can be added here using rechart library
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Extract stat card into its own component for cleaner code
const StatCard = ({ 
  title, 
  value, 
  description, 
  icon,
  isMobile 
}: { 
  title: string; 
  value: number | string; 
  description: string | React.ReactNode;
  icon: React.ReactNode;
  isMobile: boolean;
}) => (
  <Card className="shadow-sm">
    <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-1 ${isMobile ? 'pt-2 px-2' : 'pb-2'}`}>
      <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className={isMobile ? 'pt-0 px-2 pb-2' : ''}>
      <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{value}</div>
      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>
        {description}
      </p>
    </CardContent>
  </Card>
);

export default AdminStats;

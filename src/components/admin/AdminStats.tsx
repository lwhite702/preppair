
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

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
      <div className="py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Platform Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered accounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalGuides}</div>
            <p className="text-xs text-muted-foreground">
              Interview guides created
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.guidesThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {stats && stats.guidesLastMonth > 0 ? (
                <>
                  {stats.guidesThisMonth > stats.guidesLastMonth ? (
                    <span className="text-green-500">
                      ↑ {Math.round((stats.guidesThisMonth / stats.guidesLastMonth - 1) * 100)}%
                    </span>
                  ) : (
                    <span className="text-red-500">
                      ↓ {Math.round((1 - stats.guidesThisMonth / stats.guidesLastMonth) * 100)}%
                    </span>
                  )} from last month
                </>
              ) : (
                "No comparison data"
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides Per User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.averageGuidesPerUser}</div>
            <p className="text-xs text-muted-foreground">
              Average per registered user
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Charts component can be added here using rechart library
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;

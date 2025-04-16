
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminGuides from "@/components/admin/AdminGuides";
import AdminStats from "@/components/admin/AdminStats";
import { useAdmin } from "@/hooks/useAdmin";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-gray-100 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-primary">Overview</TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-primary">Users</TabsTrigger>
                <TabsTrigger value="guides" className="data-[state=active]:bg-white data-[state=active]:text-primary">Interview Guides</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <AdminStats />
              </TabsContent>
              
              <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <AdminUsers />
              </TabsContent>
              
              <TabsContent value="guides" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <AdminGuides />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

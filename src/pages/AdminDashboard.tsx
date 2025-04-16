
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
          <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access the admin dashboard.
            </p>
            <a href="/" className="text-primary hover:underline">
              Return to Home
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                Admin Portal
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-white p-1 border border-gray-200 rounded-lg">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger 
                  value="guides" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Interview Guides
                </TabsTrigger>
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

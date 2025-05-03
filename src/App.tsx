
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading"; // Create this simple loading component
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LegalPagesIndex, { TermsOfService, PrivacyPolicy, CookiePolicy } from "./components/LegalPages";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateGuide = lazy(() => import("./pages/CreateGuide"));
const Auth = lazy(() => import("./pages/Auth"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const GuideDetails = lazy(() => import("./pages/GuideDetails"));
const Admin = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/legal" element={<LegalPagesIndex />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/create-guide" element={<CreateGuide />} />
                  <Route path="/blog" element={<Blog />} />

                  {/* Legal Routes */}
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/cookies" element={<CookiePolicy />} />

                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/guides/:id" element={
                    <ProtectedRoute>
                      <GuideDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

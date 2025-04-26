
import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "@/components/ui/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const LegalPagesIndex = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-12 text-center">Legal Documents</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>Our terms outline your rights and responsibilities when using PrepPair's services.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/terms" className="text-primary hover:underline font-medium">Read Terms →</Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>Learn how we collect, use, and protect your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/privacy" className="text-primary hover:underline font-medium">Read Privacy Policy →</Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Cookie Policy</CardTitle>
                <CardDescription>Information about how we use cookies and similar tracking technologies.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/cookies" className="text-primary hover:underline font-medium">Read Cookie Policy →</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPagesIndex;

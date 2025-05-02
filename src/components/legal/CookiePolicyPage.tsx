
import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { 
  LegalSection, 
  LegalNavigation, 
  LegalHeader, 
  ContactInfo, 
  PolicySeparator 
} from "./shared/LegalComponents";

const CookiePolicyPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background">
        <LegalHeader />
        <LegalSection title="Cookie Policy">
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Purpose</h2>
              <p className="text-base leading-relaxed">
                This Cookie Policy describes how and why we use cookies to improve your experience on PrepPair.me and ResumeFormatter.io.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. What Cookies Are Used</h2>
              <div className="relative overflow-x-auto shadow-sm rounded-lg border mb-6">
                <table className="w-full text-left">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 font-semibold">Type</th>
                      <th className="p-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Essential</td>
                      <td className="p-4">Required for login sessions, form security, and core features</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Functional</td>
                      <td className="p-4">Store user preferences and editor state</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Analytics</td>
                      <td className="p-4">Help us understand how users interact with the software</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Marketing</td>
                      <td className="p-4">Occasionally used to promote new features internally</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
              <p className="mb-4">We may use cookies from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stripe (for payment session management)</li>
                <li>Google Analytics (site usage tracking)</li>
                <li>Vercel (for performance metrics)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <p>You can disable cookies via your browser settings. Note that some features may not function correctly if cookies are disabled.</p>
            </div>
          </section>
        </LegalSection>
        <LegalNavigation />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;

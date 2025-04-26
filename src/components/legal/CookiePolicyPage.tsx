import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation } from "./shared/LegalComponents";

const CookiePolicyPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Cookie Policy">
        <p className="text-lg mb-4">Last updated: April 24, 2025</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit our websites. They help us remember your preferences and improve your experience.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. Types of Cookies We Use</h2>
        <h3 className="text-lg font-medium mt-6 mb-3">Essential Cookies</h3>
        <p>Required for basic website functionality. These cannot be disabled.</p>
        
        <h3 className="text-lg font-medium mt-6 mb-3">Performance Cookies</h3>
        <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
        
        <h3 className="text-lg font-medium mt-6 mb-3">Functionality Cookies</h3>
        <p>Remember your preferences and settings to enhance your experience.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Managing Cookies</h2>
        <p>You can control cookies through your browser settings. However, disabling certain cookies may limit your access to some features.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Third-Party Cookies</h2>
        <p>We use trusted third-party services that may also set cookies:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Google Analytics for website analytics</li>
          <li>Stripe for payment processing</li>
          <li>Intercom for customer support</li>
        </ul>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export default CookiePolicyPage;

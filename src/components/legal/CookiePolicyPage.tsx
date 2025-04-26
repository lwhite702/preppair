
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation } from "./shared/LegalComponents";

const CookiePolicyPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Cookie Policy">
        <p className="text-lg text-muted-foreground mb-8">Last updated: April 24, 2025</p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-6">1. What Are Cookies?</h2>
        <p className="text-base leading-relaxed">
          Cookies are small text files stored on your device when you visit our websites. They help us remember your preferences and improve your experience.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">2. Types of Cookies We Use</h2>
        <h3 className="text-xl font-medium mt-8 mb-4">Essential Cookies</h3>
        <p className="text-base leading-relaxed">Required for basic website functionality. These cannot be disabled.</p>
        
        <h3 className="text-xl font-medium mt-8 mb-4">Performance Cookies</h3>
        <p className="text-base leading-relaxed">Help us understand how visitors interact with our website by collecting anonymous information.</p>
        
        <h3 className="text-xl font-medium mt-8 mb-4">Functionality Cookies</h3>
        <p className="text-base leading-relaxed">Remember your preferences and settings to enhance your experience.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">3. Managing Cookies</h2>
        <p className="text-base leading-relaxed">You can control cookies through your browser settings. However, disabling certain cookies may limit your access to some features.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">4. Third-Party Cookies</h2>
        <p className="text-base leading-relaxed mb-4">We use trusted third-party services that may also set cookies:</p>
        <ul className="list-disc pl-8 space-y-3">
          <li className="text-base leading-relaxed">Google Analytics for website analytics</li>
          <li className="text-base leading-relaxed">Stripe for payment processing</li>
          <li className="text-base leading-relaxed">Intercom for customer support</li>
        </ul>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export default CookiePolicyPage;

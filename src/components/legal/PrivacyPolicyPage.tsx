import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation } from "./shared/LegalComponents";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Privacy Policy">
        <p className="text-lg mb-4">Last updated: April 24, 2025</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Information Collection</h2>
        <p>We collect information you provide directly, including:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Name and email address</li>
          <li>Resume content and job descriptions</li>
          <li>Interview feedback and responses</li>
          <li>Account preferences and settings</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Provide and improve our services</li>
          <li>Generate personalized interview guides</li>
          <li>Analyze and optimize resume content</li>
          <li>Send important notifications and updates</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data in a portable format</li>
        </ul>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyPage;

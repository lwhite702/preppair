import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation } from "./shared/LegalComponents";

const TermsOfServicePage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Terms of Service">
        <p className="text-lg mb-4">Last updated: April 24, 2025</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction and Acceptance</h2>
        <p>Welcome to PrepPair.me and MDResume.pro ("the Services"), owned and operated by Wrelik Brands, LLC. By accessing or using our Services, you agree to these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Services.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. Services Description</h2>
        <p>Our Services provide interview preparation and resume enhancement tools, including but not limited to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>AI-powered interview guides</li>
          <li>Resume analysis and optimization</li>
          <li>Job description matching</li>
          <li>Interview feedback tools</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts and Responsibilities</h2>
        <p>To access certain features, you must create an account. You are responsible for:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Maintaining account confidentiality</li>
          <li>All activities under your account</li>
          <li>Providing accurate information</li>
          <li>Notifying us of unauthorized access</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Privacy and Data Protection</h2>
        <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your data. By using our Services, you also agree to our Privacy Policy.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p>All content, features, and functionality of the Services are owned by Wrelik Brands, LLC and protected by international copyright, trademark, and other intellectual property laws.</p>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export default TermsOfServicePage;

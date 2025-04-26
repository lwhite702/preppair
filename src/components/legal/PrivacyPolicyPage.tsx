
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation, LegalHeader, ContactInfo } from "./shared/LegalComponents";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalHeader />
      <LegalSection title="Privacy Policy">
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
            <p className="text-base leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and protect your personal information. 
              We are committed to maintaining the confidentiality of your data and complying with data protection regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Data Collected</h2>
            <p className="mb-4">We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information: name, email address, password (hashed)</li>
              <li>Content: resumes, job descriptions, feedback inputs</li>
              <li>Usage data: IP address, browser, referral source, device type, session logs</li>
              <li>Transaction data: via Stripe, including subscription tier and status</li>
            </ul>
          </div>

          {/* ... Additional sections follow the same pattern ... */}
        </section>
      </LegalSection>
      <LegalNavigation />
      <ContactInfo />
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyPage;

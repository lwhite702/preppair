
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

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
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

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To deliver core product functionality (e.g., AI-generated guides, resume exports)</li>
                <li>To personalize your experience and recommendations</li>
                <li>To provide customer support and notify users about service updates</li>
                <li>To monitor platform usage for performance and reliability</li>
                <li>To improve our AI models through anonymized inputs</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data is encrypted in transit (TLS/SSL) and at rest</li>
                <li>Access is restricted to authorized personnel</li>
                <li>Periodic security reviews and audits are conducted</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Sharing Your Data</h2>
              <p className="mb-4">We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processor (Stripe)</li>
                <li>Hosting and infrastructure services (e.g., Vercel, AWS)</li>
                <li>Analytics and error monitoring tools (e.g., Google Analytics, Sentry)</li>
              </ul>
              <p className="mt-4">We do not sell or rent personal data under any circumstances.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We retain user data for as long as your account is active or as needed to provide the service.</li>
                <li>Anonymized data may be retained indefinitely for research and development.</li>
                <li>You may request data deletion by contacting support@wrelik.com.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. User Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access or export your stored data</li>
                <li>Request data correction or deletion</li>
                <li>Withdraw consent for non-essential communications</li>
                <li>File complaints with data protection authorities</li>
              </ul>
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

export default PrivacyPolicyPage;

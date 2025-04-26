
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation, LegalHeader, ContactInfo } from "./shared/LegalComponents";

const TermsOfServicePage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalHeader />
      <LegalSection title="Terms of Service">
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-base leading-relaxed">
              By accessing or using any part of the Software (PrepPair.me or MDResume.pro), you agree to be bound by these Terms of Service. 
              If you do not agree, you may not use our services. These Terms govern your relationship with Wrelik Brands, LLC and outline 
              your rights and responsibilities when using our software-as-a-service platforms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>PrepPair.me offers AI-powered personalized interview preparation guides, real-time feedback tools, follow-up email generation, and a dashboard for tracking interview performance and readiness.</li>
              <li>MDResume.pro enables users to write resumes in Markdown and convert them into professionally styled PDF or Word documents, with live previews, template selection, and customization tools.</li>
            </ul>
            <p className="mt-4 text-muted-foreground">We reserve the right to update or modify services and features without prior notice.</p>
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

export default TermsOfServicePage;


import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { LegalSection, LegalNavigation, LegalHeader, ContactInfo, PolicySeparator } from "./shared/LegalComponents";

const TermsOfServicePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background">
        <LegalHeader />
        <LegalSection title="Terms of Service">
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-base leading-relaxed">
                By accessing or using any part of the Software (PrepPair.me or ResumeFormatter.io), you agree to be bound by these Terms of Service. 
                If you do not agree, you may not use our services. These Terms govern your relationship with Wrelik Brands, LLC and outline 
                your rights and responsibilities when using our software-as-a-service platforms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>PrepPair.me offers AI-powered personalized interview preparation guides, real-time feedback tools, follow-up email generation, and a dashboard for tracking interview performance and readiness.</li>
                <li>ResumeFormatter.io enables users to write resumes in Markdown and convert them into professionally styled PDF or Word documents, with live previews, template selection, and customization tools.</li>
              </ul>
              <p className="mt-4 text-muted-foreground">We reserve the right to update or modify services and features without prior notice.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Account Creation & Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must be at least 16 years old to create an account or use our services.</li>
                <li>By registering, you represent that all information you provide is accurate and that you will maintain and promptly update your account information.</li>
                <li>Users are responsible for all activity that occurs under their account credentials and should use a strong password and maintain its confidentiality.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Subscriptions and Payment Plans</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free Tier includes basic features such as writing in Markdown and previewing resume content.</li>
                <li>Pro Plans or One-Time Downloads unlock full feature sets including export, advanced templates, priority support, and integration features.</li>
                <li>Subscriptions are billed monthly and renew automatically unless canceled before the next billing cycle.</li>
                <li>Users may upgrade, downgrade, or cancel plans at any time through their account settings.</li>
                <li>Payments are processed securely through Stripe. Wrelik Brands, LLC does not store payment card information directly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Content Ownership and Licensing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users retain full ownership of their resume content, interview answers, and any custom inputs provided to the platform.</li>
                <li>By uploading content, you grant Wrelik Brands, LLC a limited, non-exclusive license to store, process, and analyze your data as necessary to operate the services.</li>
                <li>We may retain anonymized versions of your data for analytics and AI model improvement purposes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Usage Restrictions</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reverse engineer, copy, modify, or distribute the platform's source code or services.</li>
                <li>Use the service in violation of applicable laws or regulations.</li>
                <li>Upload or distribute content that is harmful, threatening, defamatory, obscene, discriminatory, or infringes intellectual property rights.</li>
                <li>Attempt to extract proprietary models or retrain similar services based on your interactions.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. AI Model Use and Responsibility</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our services use artificial intelligence and machine learning to generate content such as interview questions, answers, resume formatting, and strategy suggestions.</li>
                <li>AI-generated outputs are provided "as is" and may not always be accurate, up-to-date, or contextually appropriate.</li>
                <li>You acknowledge that Wrelik Brands, LLC is not liable for actions taken based on AI-generated content. We do not guarantee accuracy, reliability, completeness, or effectiveness of any AI-powered outputs.</li>
                <li>Users should review all generated content carefully and use it as supplemental guidance, not definitive professional advice.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All purchases, including Pro plan subscriptions and one-time resume exports, are non-refundable once rendered.</li>
                <li>If you experience technical issues that prevent usage of paid features, you may submit a support request within 7 days of the transaction.</li>
                <li>Refunds are granted at the sole discretion of Wrelik Brands, LLC, and will only be issued if the issue cannot be resolved by technical support.</li>
                <li>We reserve the right to decline refund requests if there is evidence of misuse, abuse, or excessive refunds requested.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not guarantee that use of the Software will result in job interviews or employment offers.</li>
                <li>PrepPair.me and MDResume.pro do not provide legal, HR, career, or professional consulting services.</li>
                <li>Services are provided on an "as-is" and "as-available" basis without warranties of any kind.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To the fullest extent permitted by law, Wrelik Brands, LLC shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the services.</li>
                <li>Our total liability for any claim related to the services will not exceed the total amount paid by the user in the 12 months prior to the event giving rise to the claim.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may cancel your subscription or delete your account at any time.</li>
                <li>We may suspend or terminate access to the services immediately without notice if you violate these Terms or engage in fraudulent, harmful, or abusive behavior.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>These Terms are governed by the laws of the State of Georgia, United States.</li>
                <li>Disputes will be resolved in the applicable state or federal courts of Fulton County, Georgia.</li>
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

export default TermsOfServicePage;

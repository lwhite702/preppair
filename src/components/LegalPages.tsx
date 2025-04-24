
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "./ui/link";

const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="max-w-4xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
    <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
      {children}
    </div>
  </section>
);

export const TermsOfService = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <LegalSection title="Terms of Service">
      <p>These Terms of Service ("Terms") govern your access to and use of the services provided by <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong>, collectively referred to as the "Software" or "Services". Both are owned and operated by <strong>Wrelik Brands, LLC</strong>, based in <strong>Atlanta, GA, USA</strong>.</p>
      <p>By accessing or using our Software, you agree to be bound by these Terms. If you do not agree, do not use the Software. These Terms apply to both free and paid usage, including trial access.</p>
      {/* Add more terms content from the provided text */}
    </LegalSection>
    <Footer />
  </div>
);

export const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <LegalSection title="Privacy Policy">
      <p><strong>Last updated:</strong> April 24, 2025</p>
      <p><strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> are services operated by <strong>Wrelik Brands, LLC</strong>. We value your privacy and are committed to protecting your data. This policy outlines how we collect, use, and protect your personal information.</p>
      {/* Add more privacy policy content from the provided text */}
    </LegalSection>
    <Footer />
  </div>
);

export const CookiePolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <LegalSection title="Cookie Policy">
      <p><strong>Last updated:</strong> April 24, 2025</p>
      <p>This Cookie Policy explains how <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> use cookies and similar technologies to recognize you when you visit our sites. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
      {/* Add more cookie policy content from the provided text */}
    </LegalSection>
    <Footer />
  </div>
);

export const LegalNavigation = () => (
  <nav className="w-full border-t border-gray-200 py-8 text-center text-sm">
    <Link href="/terms" className="text-gray-600 hover:text-primary mx-4">Terms</Link>
    <Link href="/privacy" className="text-gray-600 hover:text-primary mx-4">Privacy</Link>
    <Link href="/cookies" className="text-gray-600 hover:text-primary mx-4">Cookies</Link>
  </nav>
);

const LegalPages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pb-16">
        <TermsOfService />
        <PrivacyPolicy />
        <CookiePolicy />
        <LegalNavigation />
      </main>
      <Footer />
    </div>
  );
};

export default LegalPages;


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
    <main className="flex-grow bg-background">
      <LegalSection title="Terms of Service">
        <p>These Terms of Service ("Terms") govern your access to and use of the services provided by <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong>, collectively referred to as the "Software" or "Services". Both are owned and operated by <strong>Wrelik Brands, LLC</strong>, based in <strong>Atlanta, GA, USA</strong>.</p>
        <p>By accessing or using our Software, you agree to be bound by these Terms. If you do not agree, do not use the Software. These Terms apply to both free and paid usage, including trial access.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>By creating an account, using our services, or continuing to use our Software after any updates to these terms, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. User Accounts</h2>
        <p>To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Privacy Policy">
        <p><strong>Last updated:</strong> April 24, 2025</p>
        <p><strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> are services operated by <strong>Wrelik Brands, LLC</strong>. We value your privacy and are committed to protecting your data. This policy outlines how we collect, use, and protect your personal information.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <p>We collect information you provide directly, such as your name, email, resume content, and job descriptions. We also collect usage data and information from third-party services with your consent.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <p>We use your information to provide, maintain, and improve our services, process payments, send notifications, and for research and analytics purposes.</p>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export const CookiePolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background">
      <LegalSection title="Cookie Policy">
        <p><strong>Last updated:</strong> April 24, 2025</p>
        <p>This Cookie Policy explains how <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> use cookies and similar technologies to recognize you when you visit our sites. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">1. What Are Cookies</h2>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Cookies</h2>
        <p>We use cookies for several purposes, including to remember your preferences, analyze site traffic, and personalize content.</p>
      </LegalSection>
      <LegalNavigation />
    </main>
    <Footer />
  </div>
);

export const LegalNavigation = () => (
  <nav className="max-w-4xl mx-auto py-8 text-center text-sm border-t border-gray-200 mt-8">
    <Link href="/terms" className="text-primary hover:underline mx-4">Terms of Service</Link>
    <Link href="/privacy" className="text-primary hover:underline mx-4">Privacy Policy</Link>
    <Link href="/cookies" className="text-primary hover:underline mx-4">Cookie Policy</Link>
  </nav>
);

const LegalPages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-12 text-center">Legal Documents</h1>
          <div className="space-y-12">
            <LegalSection title="Terms of Service">
              <p>These Terms of Service ("Terms") govern your access to and use of the services provided by <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong>, collectively referred to as the "Software" or "Services".</p>
              <p><Link href="/terms" className="font-medium">Read full Terms of Service →</Link></p>
            </LegalSection>
            
            <LegalSection title="Privacy Policy">
              <p><strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> are services operated by <strong>Wrelik Brands, LLC</strong>. We value your privacy and are committed to protecting your data.</p>
              <p><Link href="/privacy" className="font-medium">Read full Privacy Policy →</Link></p>
            </LegalSection>
            
            <LegalSection title="Cookie Policy">
              <p>This Cookie Policy explains how <strong>PrepPair.me</strong> and <strong>MDResume.pro</strong> use cookies and similar technologies to recognize you when you visit our sites.</p>
              <p><Link href="/cookies" className="font-medium">Read full Cookie Policy →</Link></p>
            </LegalSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPages;

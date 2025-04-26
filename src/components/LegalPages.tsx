
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "./ui/link";
import { Separator } from "./ui/separator";

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

export const PrivacyPolicy = () => (
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

export const CookiePolicy = () => (
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

export const LegalNavigation = () => (
  <nav className="max-w-4xl mx-auto py-8 px-4">
    <Separator className="mb-8" />
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
      <span className="hidden sm:inline text-muted-foreground">•</span>
      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      <span className="hidden sm:inline text-muted-foreground">•</span>
      <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
    </div>
  </nav>
);

const LegalPages = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow bg-background py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-12 text-center">Legal Documents</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <p className="text-muted-foreground mb-6">Our terms outline your rights and responsibilities when using PrepPair's services.</p>
            <Link href="/terms" className="text-primary hover:underline font-medium">Read Terms →</Link>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">Learn how we collect, use, and protect your personal information.</p>
            <Link href="/privacy" className="text-primary hover:underline font-medium">Read Privacy Policy →</Link>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
            <p className="text-muted-foreground mb-6">Information about how we use cookies and similar tracking technologies.</p>
            <Link href="/cookies" className="text-primary hover:underline font-medium">Read Cookie Policy →</Link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default LegalPages;

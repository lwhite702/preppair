
import React from "react";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-background pt-20 pb-12">
    <section className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display pt-8" id="top">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">Last updated: April 24, 2025</p>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  </div>
);

export const LegalHeader = () => (
  <div className="max-w-4xl mx-auto px-4 pt-24 pb-8 text-center">
    <p className="text-lg text-muted-foreground mb-6">
      All services provided under PrepPair.me and ResumeFormatter.io are operated by Wrelik Brands, LLC, 
      a registered company in Atlanta, Georgia, USA. For all inquiries, please contact: {' '}
      <a href="mailto:support@wrelik.com" className="text-primary hover:underline">
        support@wrelik.com
      </a>
    </p>
    <Separator className="my-8" />
  </div>
);

export const LegalNavigation = () => (
  <nav className="max-w-4xl mx-auto py-10 px-4">
    <Separator className="mb-10" />
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
      <span className="hidden sm:inline text-muted-foreground">•</span>
      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      <span className="hidden sm:inline text-muted-foreground">•</span>
      <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
    </div>
  </nav>
);

export const ContactInfo = () => (
  <div className="max-w-4xl mx-auto px-4 py-8 text-center mb-12">
    <Separator className="mb-8" />
    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
    <p className="text-muted-foreground">
      Wrelik Brands, LLC<br />
      Atlanta, GA, USA<br />
      Email: <a href="mailto:support@wrelik.com" className="text-primary hover:underline">support@wrelik.com</a>
    </p>
    <p className="mt-6 text-sm text-muted-foreground">Effective Date: April 24, 2025</p>
  </div>
);

export const PolicySeparator = () => (
  <div className="my-8 flex justify-center">
    <div className="text-muted-foreground text-center">⸻</div>
  </div>
);

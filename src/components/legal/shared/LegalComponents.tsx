
import React from "react";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";

export const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
    <h1 className="text-4xl md:text-5xl font-bold mb-8 font-display">{title}</h1>
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      {children}
    </div>
  </section>
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


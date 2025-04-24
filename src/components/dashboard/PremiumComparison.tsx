
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumComparisonProps {
  onUpgradeClick: () => void;
}

const PremiumComparison = ({ onUpgradeClick }: PremiumComparisonProps) => {
  const features = [
    {
      name: "Interview Guides",
      free: "1 basic guide per month",
      premium: "Unlimited personalized guides"
    },
    {
      name: "Guide Sections",
      free: "Quick intro and basic questions",
      premium: "Full guide with all sections"
    },
    {
      name: "AI Personalization",
      free: "Basic job matching",
      premium: "Deep resume analysis & custom advice"
    },
    {
      name: "Company Research",
      free: false,
      premium: "Company-specific insights & culture fit tips"
    },
    {
      name: "STAR Story Builder",
      free: false,
      premium: "Create compelling interview stories"
    },
    {
      name: "Smart Follow-ups",
      free: false,
      premium: "AI email generator + templates"
    },
    {
      name: "Interview Calendar",
      free: false,
      premium: "Track interviews & set reminders"
    },
    {
      name: "Progress Tracking",
      free: false,
      premium: "Detailed feedback & improvement analytics"
    }
  ];

  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-b from-card to-card/95 p-8 shadow-lg mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-primary">
            Unlock Your Full Interview Potential
          </h2>
        </div>
        <p className="text-muted-foreground mt-2 text-lg">
          Get comprehensive interview preparation with Premium
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-muted/50">
            <TableHead className="w-[40%] font-bold text-foreground">Feature</TableHead>
            <TableHead className="font-bold text-foreground">Free</TableHead>
            <TableHead className="font-bold text-foreground">Premium</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name} className="border-b border-muted/30">
              <TableCell className="font-medium py-4">{feature.name}</TableCell>
              <TableCell className="py-4">
                {typeof feature.free === 'string' ? (
                  <span className="text-sm text-muted-foreground">{feature.free}</span>
                ) : (
                  feature.free ? <Check className="text-green-500 h-5 w-5" /> : <X className="text-red-400 h-5 w-5" />
                )}
              </TableCell>
              <TableCell className="py-4">
                {typeof feature.premium === 'string' ? (
                  <span className="text-sm font-medium text-primary">{feature.premium}</span>
                ) : (
                  <Check className="text-primary h-5 w-5" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <span className="text-xl font-semibold text-primary">$24.99</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <div>
          <Button 
            onClick={onUpgradeClick} 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium"
            size="lg"
          >
            Upgrade to Premium
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Cancel anytime • Instant access • No hidden fees
        </p>
      </div>
    </div>
  );
};

export default PremiumComparison;

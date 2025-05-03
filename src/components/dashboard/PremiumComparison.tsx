
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
    <div className="rounded-lg border border-primary/20 bg-white p-8 shadow-lg mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-primary">
            Unlock Your Full Interview Potential
          </h2>
        </div>
        <p className="text-gray-700 mt-2 text-lg">
          Get comprehensive interview preparation with Premium
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[40%] font-bold text-gray-800 border-b-2 border-gray-200 px-4 py-3">Feature</TableHead>
              <TableHead className="font-bold text-gray-800 border-b-2 border-gray-200 px-4 py-3">Free</TableHead>
              <TableHead className="font-bold text-primary bg-primary/10 border-b-2 border-primary/20 px-4 py-3">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={feature.name} 
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="font-medium py-4 px-4 border-b border-gray-100 text-gray-800">{feature.name}</TableCell>
                <TableCell className="py-4 px-4 border-b border-gray-100">
                  {typeof feature.free === 'string' ? (
                    <span className="text-sm text-gray-700">{feature.free}</span>
                  ) : (
                    feature.free ? <Check className="text-green-500 h-5 w-5" /> : <X className="text-gray-400 h-5 w-5" />
                  )}
                </TableCell>
                <TableCell className="py-4 px-4 border-b border-gray-100 bg-primary/5">
                  {typeof feature.premium === 'string' ? (
                    <span className="text-sm font-medium text-gray-900">{feature.premium}</span>
                  ) : (
                    <Check className="text-primary h-5 w-5" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <span className="text-xl font-semibold text-primary">$24.99</span>
          <span className="text-sm text-gray-600">/month</span>
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
        <p className="text-sm text-gray-600">
          Cancel anytime • Instant access • No hidden fees
        </p>
      </div>
    </div>
  );
};

export default PremiumComparison;

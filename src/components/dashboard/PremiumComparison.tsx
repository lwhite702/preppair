
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumComparisonProps {
  onUpgradeClick: () => void;
}

const PremiumComparison = ({ onUpgradeClick }: PremiumComparisonProps) => {
  const features = [
    {
      name: "Interview Guides",
      free: "1 basic guide",
      premium: "Unlimited personalized guides"
    },
    {
      name: "Question Bank",
      free: "5 general questions",
      premium: "Full access to role-specific questions"
    },
    {
      name: "AI Personalization",
      free: "Basic",
      premium: "Advanced with company research"
    },
    {
      name: "Follow-up Generator",
      free: false,
      premium: true
    },
    {
      name: "Calendar Integration",
      free: false,
      premium: true
    },
    {
      name: "Interview Feedback Tracking",
      free: false,
      premium: true
    },
    {
      name: "Custom Tones & Formats",
      free: false,
      premium: true
    }
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Upgrade to Premium</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            <TableHead>Free</TableHead>
            <TableHead>Premium</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell>{feature.name}</TableCell>
              <TableCell>
                {typeof feature.free === 'string' ? (
                  feature.free
                ) : (
                  feature.free ? <Check className="text-green-500 h-5 w-5" /> : <X className="text-red-500 h-5 w-5" />
                )}
              </TableCell>
              <TableCell>
                {typeof feature.premium === 'string' ? (
                  feature.premium
                ) : (
                  <Check className="text-green-500 h-5 w-5" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold mb-2">$24.99/month</p>
        <Button onClick={onUpgradeClick} className="w-full sm:w-auto">
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default PremiumComparison;

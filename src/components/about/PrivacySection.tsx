
import React from 'react';
import { Shield, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PrivacySection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-4 font-display">Privacy & Ethics</h2>
      <div className="flex items-start gap-4 bg-muted p-6 rounded-lg border border-primary/10">
        <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
        <div>
          <p className="mb-4">
            At PrepPair.Me, we take your data privacy seriously. Your resumes and job descriptions are 
            used only to generate personalized guides and are never shared with third parties.
          </p>
          <p>
            We're committed to ethical AI practices, ensuring our tools enhance human potential rather than 
            replacing it. Our AI is designed to amplify your unique qualities, not standardize them.
          </p>
          <div className="mt-4">
            <Link to="/legal">
              <Button variant="outline" size="sm" className="gap-1">
                <Sparkle className="h-3 w-3" />
                Read Our Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;

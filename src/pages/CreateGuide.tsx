
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import { GuideContent } from '@/components/guide/GuideContent';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const CreateGuide = () => {
  const { user } = useAuth();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGuideGenerated = (markdownContent: string, error?: string) => {
    setGeneratedGuide(markdownContent);
    setError(error || null);
    
    // Scroll to the generated content
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        {!generatedGuide ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Create Your Interview Guide</h1>
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto text-muted-foreground">
              Upload your resume and job description to get a personalized interview guide - no signup required for your first guide.
            </p>
            <UploadForm onGuideGenerated={handleGuideGenerated} />
          </>
        ) : (
          <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Interview Guide</h2>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>API Configuration Issue</AlertTitle>
                <AlertDescription>
                  {error === "OpenAI API key is not configured" ? 
                    "Using demo content as API key is not configured. This is a preview of how your guide will look." : 
                    error}
                </AlertDescription>
              </Alert>
            )}
            
            <GuideContent 
              markdownContent={generatedGuide} 
              isPremium={false} 
              isRegistered={!!user} 
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CreateGuide;

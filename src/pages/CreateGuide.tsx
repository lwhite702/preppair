
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import { GuideContent } from '@/components/guide/GuideContent';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from '@/components/ErrorBoundary';

interface UploadFormProps {
  onGuideGenerated: (markdownContent: string, error?: string) => void;
  onGenerationStart: () => void;
}

const CreateGuide = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGuideGenerated = (markdownContent: string, error?: string) => {
    setGeneratedGuide(markdownContent);
    setError(error || null);
    setIsGenerating(false);
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleRetry = () => {
    setError(null);
    setGeneratedGuide(null);
    setIsGenerating(false);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ErrorBoundary>
        <main className="flex-grow container py-8 md:py-12">
          {!generatedGuide ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">Create Your Interview Guide</h1>
              <p className="text-lg text-center mb-8 max-w-2xl mx-auto text-muted-foreground">
                Upload your resume and job description to get a personalized interview guide - no signup required for your first guide.
              </p>
              <UploadForm 
                onGuideGenerated={handleGuideGenerated} 
                onGenerationStart={() => setIsGenerating(true)}
              />
              {isGenerating && (
                <div className="text-center mt-8" aria-live="polite">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                  <p className="text-muted-foreground">Creating your personalized guide...</p>
                </div>
              )}
            </>
          ) : (
            <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Your Interview Guide</h2>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" aria-label="Error" />
                  <AlertTitle>Generation Issue</AlertTitle>
                  <AlertDescription className="flex flex-col gap-2">
                    {error === "OpenAI API key is not configured" ? 
                      "Using demo content as API key is not configured. This is a preview of how your guide will look." : 
                      error}
                    <Button 
                      variant="outline" 
                      className="self-start mt-2" 
                      onClick={handleRetry}
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" aria-label="Retry" /> Try Again
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              <GuideContent 
                markdownContent={generatedGuide} 
                isPremium={false} 
                isRegistered={!!user}
                onUpgrade={handleUpgrade}
              />
              {!user && (
                <div className="bg-primary/5 p-4 rounded-lg mt-8 border border-primary/20">
                  <h3 className="font-medium text-lg mb-2">Want to save this guide?</h3>
                  <p className="mb-4">Create a free account to save this guide and access it anytime.</p>
                  <Button 
                    variant="default" 
                    onClick={() => navigate('/auth')}
                  >
                    Create Free Account
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default CreateGuide;

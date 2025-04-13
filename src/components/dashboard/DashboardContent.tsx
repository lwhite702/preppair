
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadForm from "@/components/UploadForm";
import GuideDisplay from "@/components/GuideDisplay";
import InterviewFeedbackForm from "@/components/InterviewFeedbackForm";
import FollowUpEmailGenerator from "@/components/FollowUpEmailGenerator";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DashboardContentProps {
  guides: InterviewGuide[];
  onGuideGenerated: (markdownContent: string) => void;
  refetchGuides: () => void;
}

const DashboardContent = ({ guides, onGuideGenerated, refetchGuides }: DashboardContentProps) => {
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFollowUpGenerator, setShowFollowUpGenerator] = useState(false);
  const [feedbackData, setFeedbackData] = useState<InterviewFeedback | null>(null);

  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    onGuideGenerated(markdownContent);
    
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleViewGuide = (guide: InterviewGuide) => {
    setSelectedGuide(guide);
    setGeneratedGuide(guide.content);
    setShowFeedbackForm(false);
    setShowFollowUpGenerator(false);
    
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };
  
  const handleShowFeedbackForm = () => {
    setShowFeedbackForm(true);
    setShowFollowUpGenerator(false);
  };
  
  const handleFeedbackSubmitted = (feedback: InterviewFeedback) => {
    setFeedbackData(feedback);
    setShowFeedbackForm(false);
    setShowFollowUpGenerator(true);
    
    if (selectedGuide) {
      const updatedGuide = { ...selectedGuide, feedback };
      setSelectedGuide(updatedGuide);
      
      saveFeedbackToDatabase(selectedGuide.id, feedback).catch(error => {
        console.error("Error saving feedback:", error);
        toast.error("Failed to save feedback, but you can still generate a follow-up email");
      });
    }
  };
  
  const saveFeedbackToDatabase = async (guideId: string, feedback: InterviewFeedback) => {
    try {
      const { error } = await supabase
        .from("interview_guides")
        .update({ feedback })
        .eq("id", guideId);
        
      if (error) throw error;
      
      toast.success("Feedback saved successfully");
      refetchGuides();
    } catch (error) {
      console.error("Error saving feedback:", error);
      throw error;
    }
  };
  
  const handleBackToFeedback = () => {
    setShowFeedbackForm(true);
    setShowFollowUpGenerator(false);
  };

  const handleReset = () => {
    setGeneratedGuide(null);
    setSelectedGuide(null);
    setShowFeedbackForm(false);
    setShowFollowUpGenerator(false);
    setFeedbackData(null);
  };

  return (
    <>
      {guides.length > 0 && !generatedGuide && (
        <div className="max-w-3xl mx-auto" onClick={(e) => e.stopPropagation()}>
          {/* This empty div serves as a target for event handling */}
        </div>
      )}

      {!generatedGuide ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Create New Guide</h2>
          <UploadForm onGuideGenerated={handleGuideGenerated} />
        </div>
      ) : showFeedbackForm ? (
        <div id="feedbackForm" className="w-full max-w-3xl mx-auto">
          <InterviewFeedbackForm
            guideId={selectedGuide?.id}
            jobTitle={selectedGuide?.jobTitle || ""}
            company={selectedGuide?.company || ""}
            onFeedbackSubmitted={handleFeedbackSubmitted}
          />
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="text-primary underline"
            >
              Back to guide
            </button>
          </div>
        </div>
      ) : showFollowUpGenerator ? (
        <div id="followUpGenerator" className="w-full max-w-3xl mx-auto">
          <FollowUpEmailGenerator
            feedback={feedbackData!}
            candidateName={selectedGuide?.candidateName}
            jobTitle={selectedGuide?.jobTitle || ""}
            company={selectedGuide?.company || ""}
            onBack={handleBackToFeedback}
          />
        </div>
      ) : (
        <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
          <GuideDisplay 
            markdownContent={generatedGuide} 
            title={selectedGuide?.title}
            company={selectedGuide?.company}
            jobTitle={selectedGuide?.jobTitle}
            candidateName={selectedGuide?.candidateName}
          />
          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleShowFeedbackForm} variant="outline">
              Add Interview Feedback
            </Button>
            <Button onClick={handleReset} variant="ghost">
              Create Another Guide
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardContent;

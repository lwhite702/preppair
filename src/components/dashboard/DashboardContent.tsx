
import { useState, useEffect } from "react";
import UploadForm from "@/components/UploadForm";
import { InterviewGuide, InterviewFeedback } from "@/lib/types";
import { toast } from "sonner";
import { useJobTracker } from "@/hooks/useJobTracker";
import { useAuth } from "@/contexts/AuthContext";
import GuideView from "./guide/GuideView";
import FeedbackManager from "./feedback/FeedbackManager";
import { saveFeedbackToDatabase } from "@/services/feedbackService";

interface DashboardContentProps {
  guides: InterviewGuide[];
  onGuideGenerated: (markdownContent: string) => void;
  refetchGuides: () => void;
  selectedGuideId?: string;
}

const DashboardContent = ({ 
  guides, 
  onGuideGenerated, 
  refetchGuides,
  selectedGuideId 
}: DashboardContentProps) => {
  const { user } = useAuth();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showFollowUpGenerator, setShowFollowUpGenerator] = useState(false);
  const [feedbackData, setFeedbackData] = useState<InterviewFeedback | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { updateJobStatus, markFollowUpSent } = useJobTracker(user?.id);

  useEffect(() => {
    // If a guide is already selected (from parent), use it
    if (selectedGuideId) {
      const guide = guides.find(g => g.id === selectedGuideId);
      if (guide) {
        setSelectedGuide(guide);
        setGeneratedGuide(guide.content);
        
        // If guide has status that requires feedback, show feedback form
        if (guide.status === "interview_completed") {
          setShowFeedbackForm(true);
        } 
        // If guide has status that requires follow-up, show follow-up generator
        else if (guide.status === "feedback_provided" && guide.feedback) {
          setFeedbackData(guide.feedback);
          setShowFollowUpGenerator(true);
        }
      }
    }
  }, [selectedGuideId, guides]);

  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    onGuideGenerated(markdownContent);
    setIsGenerating(false);
    
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleGenerationStart = () => {
    setIsGenerating(true);
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
  
  const handleFeedbackSubmitted = async (feedback: InterviewFeedback) => {
    setIsSubmittingFeedback(true);
    setFeedbackData(feedback);
    
    try {
      if (selectedGuide) {
        const updatedGuide = { ...selectedGuide, feedback };
        setSelectedGuide(updatedGuide);
        
        await saveFeedbackToDatabase(selectedGuide.id, feedback);
        
        // Update job status to feedback_provided
        if (selectedGuide.status === "interview_completed") {
          await updateJobStatus(selectedGuide.id, "feedback_provided");
        }
      }
      
      setShowFeedbackForm(false);
      setShowFollowUpGenerator(true);
      toast.success("Feedback saved successfully");
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Failed to save feedback, but you can still generate a follow-up email");
      
      // Still show the follow-up generator even if saving failed
      setShowFeedbackForm(false);
      setShowFollowUpGenerator(true);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };
  
  const handleFollowUpGenerated = async () => {
    if (selectedGuide) {
      try {
        await markFollowUpSent(selectedGuide.id);
        toast.success("Follow-up email ready to send");
      } catch (error) {
        console.error("Error updating follow-up status:", error);
      }
    }
  };

  const handleReset = () => {
    setGeneratedGuide(null);
    setSelectedGuide(null);
    setShowFeedbackForm(false);
    setShowFollowUpGenerator(false);
    setFeedbackData(null);
  };

  const handleBackToFeedback = () => {
    setShowFeedbackForm(true);
    setShowFollowUpGenerator(false);
  };

  // Content rendering logic
  if (showFeedbackForm || showFollowUpGenerator) {
    return (
      <FeedbackManager
        selectedGuide={selectedGuide}
        isSubmittingFeedback={isSubmittingFeedback}
        showFeedbackForm={showFeedbackForm}
        showFollowUpGenerator={showFollowUpGenerator}
        feedbackData={feedbackData}
        onFeedbackSubmitted={handleFeedbackSubmitted}
        onFollowUpGenerated={handleFollowUpGenerated}
        onCancel={() => setShowFeedbackForm(false)}
        onBackToFeedback={handleBackToFeedback}
      />
    );
  }
  
  if (generatedGuide || selectedGuide) {
    return (
      <GuideView
        selectedGuide={selectedGuide}
        markdownContent={generatedGuide || selectedGuide?.content || ""}
        onShowFeedbackForm={handleShowFeedbackForm}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Create New Guide</h2>
      <UploadForm 
        onGuideGenerated={handleGuideGenerated} 
        onGenerationStart={handleGenerationStart} 
      />
    </div>
  );
};

export default DashboardContent;

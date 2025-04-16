
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, Copy, Check, Send, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { InterviewFeedback } from "@/lib/types";

interface FollowUpEmailGeneratorProps {
  feedback: InterviewFeedback;
  candidateName?: string;
  jobTitle: string;
  company: string;
  onBack: () => void;
  onEmailGenerated?: () => void;
}

const FollowUpEmailGenerator = ({
  feedback,
  candidateName = "Candidate",
  jobTitle,
  company,
  onBack,
  onEmailGenerated
}: FollowUpEmailGeneratorProps) => {
  const [emailContent, setEmailContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateEmail();
  }, []);

  const generateEmail = () => {
    setIsGenerating(true);
    
    // In a real implementation, this would call an API to generate the email
    setTimeout(() => {
      const generatedEmail = createFollowUpEmail(feedback, candidateName, jobTitle, company);
      setEmailContent(generatedEmail);
      setIsGenerating(false);
      
      // Notify parent that email has been generated
      if (onEmailGenerated) {
        onEmailGenerated();
      }
    }, 1000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    toast.success("Email copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSendEmail = () => {
    // In a real implementation, this would open the user's email client
    const subject = encodeURIComponent(`Thank you for the interview - ${jobTitle} position`);
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:${feedback.interviewerNames.join(',')}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
  };
  
  // Helper function to create the follow-up email
  const createFollowUpEmail = (
    feedback: InterviewFeedback,
    candidateName: string,
    jobTitle: string,
    company: string
  ) => {
    const interviewerNames = feedback.interviewerNames.filter(name => name.trim() !== "");
    const lastInterviewer = interviewerNames.pop();
    
    let greeting = "Hello";
    if (interviewerNames.length > 0) {
      greeting = `Hello ${interviewerNames.join(", ")} and ${lastInterviewer}`;
    } else if (lastInterviewer) {
      greeting = `Hello ${lastInterviewer}`;
    }
    
    const hasPositiveFeedback = feedback.impressions.toLowerCase().includes("well") ||
      feedback.impressions.toLowerCase().includes("good") || 
      feedback.impressions.toLowerCase().includes("great");
    
    const positiveStatement = hasPositiveFeedback
      ? "I felt our conversation went well, and I'm even more excited about the opportunity to join your team."
      : "Thank you for taking the time to discuss the role with me.";
    
    let specificPoints = "";
    if (feedback.questions) {
      specificPoints += `\nI particularly enjoyed discussing ${feedback.questions.split('\n')[0].trim()}`;
    }
    
    if (feedback.answers) {
      specificPoints += ` and sharing my experience with ${feedback.answers.split('\n')[0].trim()}.`;
    } else {
      specificPoints += ".";
    }
    
    let nextStepsText = "";
    if (feedback.nextSteps) {
      nextStepsText = `\n\nAs discussed, ${feedback.nextSteps.trim()} `;
    } else {
      nextStepsText = "\n\nI'm looking forward to hearing about the next steps in the process. ";
    }
    nextStepsText += "Please let me know if you need any additional information from me.";
    
    return `${greeting},

Thank you for taking the time to meet with me ${feedback.interviewDate} regarding the ${jobTitle} position at ${company}. ${positiveStatement}${specificPoints}

The conversation reinforced my interest in the role and confidence that my background in ${feedback.answers ? feedback.answers.split('\n')[0] : "this field"} aligns well with what you're looking for in an ideal candidate.${nextStepsText}

Best regards,
${candidateName}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Follow-Up Email</CardTitle>
        <CardDescription>
          Customize this email before sending it to your interviewers at {company}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p className="text-muted-foreground">Generating your follow-up email...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea 
              value={emailContent}
              onChange={e => setEmailContent(e.target.value)}
              className="min-h-[300px] font-mono"
            />
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={generateEmail}
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
              
              <Button
                size="sm"
                className="gap-1 ml-auto"
                onClick={handleSendEmail}
              >
                <Send className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Feedback
        </Button>
        <Button onClick={onBack}>
          Done
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FollowUpEmailGenerator;

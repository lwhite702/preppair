
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, Copy, Check, Send, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { InterviewFeedback } from "./InterviewFeedbackForm";

interface FollowUpEmailGeneratorProps {
  feedback: InterviewFeedback;
  candidateName?: string;
  jobTitle: string;
  company: string;
  onBack: () => void;
}

const FollowUpEmailGenerator = ({
  feedback,
  candidateName = "Candidate",
  jobTitle,
  company,
  onBack,
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
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleCopyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy to Clipboard"}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={generateEmail}
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={handleSendEmail}
              >
                <Send className="h-4 w-4" />
                Open in Email Client
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={onBack} className="w-full">
          Back to Feedback Form
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to generate a follow-up email
function createFollowUpEmail(
  feedback: InterviewFeedback, 
  candidateName: string, 
  jobTitle: string, 
  company: string
): string {
  const interviewerNames = feedback.interviewerNames.filter(name => name.trim());
  const interviewerGreeting = interviewerNames.length > 0 
    ? `Dear ${interviewerNames.join(' and ')},`
    : 'Dear Hiring Team,';

  const nextStepsParagraph = feedback.nextSteps 
    ? `\nI look forward to ${feedback.nextSteps.toLowerCase().includes('next') ? feedback.nextSteps : `the next steps in the process as discussed: ${feedback.nextSteps}`}.` 
    : '\nI look forward to hearing about the next steps in the interview process.';

  return `${interviewerGreeting}

Thank you for taking the time to meet with me on ${formatDate(feedback.interviewDate)} regarding the ${jobTitle} position at ${company}. I enjoyed our conversation and learning more about the role and the company.

${feedback.questions ? `I appreciated the opportunity to discuss ${feedback.questions.split('?')[0]}? ${feedback.answers ? `and share my experience with ${feedback.answers.split('.')[0]}.` : ''}` : ''}

${feedback.impressions}

${nextStepsParagraph}

Please don't hesitate to contact me if you need any additional information about my background or qualifications.

Best regards,
${candidateName}`;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    return dateString;
  }
}

export default FollowUpEmailGenerator;

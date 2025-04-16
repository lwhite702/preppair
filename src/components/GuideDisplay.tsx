
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Printer, CalendarCheck, Lock, Crown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionTier } from "@/lib/types";

interface GuideDisplayProps {
  markdownContent: string;
  title?: string;
  company?: string;
  jobTitle?: string;
  candidateName?: string;
}

const GuideDisplay = ({ 
  markdownContent, 
  title,
  company,
  jobTitle,
  candidateName
}: GuideDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const { subscription, isSubscribed, subscriptionTier } = useSubscription(user?.id);
  
  // Determine if user has premium access
  const isPremium = (subscription?.tier === "premium" && subscription?.status === "active") || 
                    (isSubscribed && subscriptionTier === "premium");
  
  // Generate a default title if none is provided
  const displayTitle = title || (company && jobTitle ? `${jobTitle} at ${company}` : "Your Interview Guide");

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Guide copied to clipboard");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${displayTitle}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 { font-size: 24px; margin-top: 24px; }
            h2 { font-size: 20px; margin-top: 20px; }
            h3 { font-size: 18px; margin-top: 18px; }
            p, ul, ol { margin-bottom: 16px; }
            ul, ol { padding-left: 20px; }
            @media print {
              body { font-size: 12px; }
              h1 { font-size: 18px; }
              h2 { font-size: 16px; }
              h3 { font-size: 14px; }
            }
            .premium-blur {
              filter: blur(4px);
              user-select: none;
              position: relative;
            }
          </style>
        </head>
        <body>
          <h1>${displayTitle}</h1>
          ${candidateName ? `<p><strong>Candidate:</strong> ${candidateName}</p>` : ''}
          <hr />
          ${transformContentWithPremiumLimits(markdownContent, true)}
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleDownload = () => {
    const contentToDownload = isPremium ? markdownContent : getFreeTierContent(markdownContent);
    const blob = new Blob([contentToDownload], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${displayTitle.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Guide downloaded successfully");
  };

  // Function to transform content with premium section limits
  const getFreeTierContent = (content: string): string => {
    const sections = content.split(/^## /m);
    
    // Always show the first 2 sections (intro + 1 more)
    let freeTierContent = sections[0]; // This is content before the first ## heading
    
    // Add the first 2 proper sections (if they exist)
    for (let i = 1; i <= 2 && i < sections.length; i++) {
      freeTierContent += `## ${sections[i]}`;
    }
    
    // Add premium teaser
    freeTierContent += `\n\n## 🔒 Premium Content\nUpgrade to Premium for full access to:\n\n`;
    
    // Add list of locked sections
    for (let i = 3; i < sections.length; i++) {
      const sectionTitle = sections[i].split('\n')[0];
      freeTierContent += `- 🔒 ${sectionTitle}\n`;
    }
    
    freeTierContent += `\nUnlock all content for $24.99/month.`;
    
    return freeTierContent;
  };

  // Function to transform HTML with premium limitations
  const transformContentWithPremiumLimits = (content: string, isHtml = false): string => {
    if (isPremium) {
      // Premium users see everything
      if (isHtml) {
        return content
          .replace(/^# (.*)/gm, '<h1>$1</h1>')
          .replace(/^## (.*)/gm, '<h2>$1</h2>')
          .replace(/^### (.*)/gm, '<h3>$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
          .replace(/<\/ul><ul>/g, '')
          .split('\n\n')
          .map(para => para.startsWith('<h') || para.startsWith('<ul') ? para : `<p>${para}</p>`)
          .join('');
      }
      return content;
    }
    
    // Free users see limited content
    if (!isHtml) {
      return getFreeTierContent(content);
    }
    
    const sections = content.split(/<h2>/i);
    let transformedContent = sections[0]; // Content before first h2
    
    // Add first 2 sections
    for (let i = 1; i <= 2 && i < sections.length; i++) {
      transformedContent += `<h2>${sections[i]}`;
    }
    
    // Add premium teaser
    transformedContent += `
      <h2>🔒 Premium Content</h2>
      <p>Upgrade to Premium for full access to:</p>
      <ul>
    `;
    
    // Add list of locked sections
    for (let i = 3; i < sections.length; i++) {
      const sectionTitle = sections[i].split('</h2>')[0];
      transformedContent += `<li>🔒 ${sectionTitle}</li>`;
    }
    
    transformedContent += `</ul>
      <p>Unlock all content for $24.99/month.</p>
      <div class="premium-cta">
        <button class="upgrade-btn">Upgrade to Premium</button>
      </div>
    `;
    
    return transformedContent;
  };

  const renderPremiumBadge = () => {
    if (!isPremium) return null;
    
    return (
      <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
        <Crown className="h-3 w-3" />
        <span>Premium</span>
      </div>
    );
  };

  const renderUpgradeButton = () => {
    if (isPremium) return null;
    
    return (
      <Button 
        variant="outline" 
        className="gap-1 border-yellow-400 hover:bg-yellow-50 text-yellow-800"
        onClick={() => {
          // Replace this with your actual upgrade flow
          toast.info("Upgrade feature coming soon!");
          // window.location.href = "/pricing";
        }}
      >
        <Crown className="h-4 w-4" />
        Upgrade to Premium
      </Button>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle>{displayTitle}</CardTitle>
            {renderPremiumBadge()}
          </div>
          {candidateName && (
            <div className="text-sm text-muted-foreground">
              Candidate: {candidateName}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          {renderUpgradeButton()}
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div 
              className="prose max-w-none markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: isPremium ? 
                  markdownContent
                    .replace(/^# (.*)/gm, '<h1>$1</h1>')
                    .replace(/^## (.*)/gm, '<h2>$1</h2>')
                    .replace(/^### (.*)/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
                    .replace(/<\/ul><ul>/g, '')
                    .split('\n\n')
                    .map(para => para.startsWith('<h') || para.startsWith('<ul') ? para : `<p>${para}</p>`)
                    .join('') 
                  : transformContentWithPremiumLimits(markdownContent, true)
              }}
            />
            {!isPremium && (
              <div className="mt-8 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-medium text-yellow-800">Premium Content Locked</h3>
                </div>
                <p className="text-sm text-yellow-700 mb-4">
                  Upgrade to Premium to unlock all sections, STAR story templates, and the follow-up email generator.
                </p>
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => {
                    // Replace with actual upgrade flow
                    toast.info("Upgrade feature coming soon!");
                    // window.location.href = "/pricing";
                  }}
                >
                  Upgrade for $24.99/month
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="markdown">
            <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap">
              {isPremium ? markdownContent : getFreeTierContent(markdownContent)}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GuideDisplay;

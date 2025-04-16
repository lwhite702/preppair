
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Printer } from "lucide-react";
import { toast } from "sonner";
import { getFreeTierContent } from "@/utils/premiumContent";

interface GuideActionsProps {
  markdownContent: string;
  displayTitle: string;
  candidateName?: string;
  isPremium: boolean;
  transformForPrint: (content: string, isPrintVersion: boolean) => string;
}

export const GuideActions = ({ 
  markdownContent, 
  displayTitle,
  candidateName,
  isPremium, 
  transformForPrint 
}: GuideActionsProps) => {
  const [copied, setCopied] = useState(false);
  
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
          ${transformForPrint(markdownContent, true)}
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

  return (
    <div className="flex space-x-2">
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
  );
};

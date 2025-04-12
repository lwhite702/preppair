
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, Printer, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

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
          </style>
        </head>
        <body>
          <h1>${displayTitle}</h1>
          ${candidateName ? `<p><strong>Candidate:</strong> ${candidateName}</p>` : ''}
          <hr />
          ${markdownContent
            .replace(/^# (.*)/gm, '<h1>$1</h1>')
            .replace(/^## (.*)/gm, '<h2>$1</h2>')
            .replace(/^### (.*)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
            .replace(/<\/ul><ul>/g, '')
            .split('\n\n')
            .map(para => para.startsWith('<h') || para.startsWith('<ul') ? para : `<p>${para}</p>`)
            .join('')}
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{displayTitle}</CardTitle>
          {candidateName && (
            <div className="text-sm text-muted-foreground mt-1">
              Candidate: {candidateName}
            </div>
          )}
        </div>
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
                __html: markdownContent
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
              }}
            />
          </TabsContent>
          <TabsContent value="markdown">
            <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap">
              {markdownContent}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GuideDisplay;

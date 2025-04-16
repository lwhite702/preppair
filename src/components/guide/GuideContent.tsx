
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transformContentWithPremiumLimits, markdownToHtml } from "@/utils/premiumContent";
import { PremiumLock } from "./PremiumLock";

interface GuideContentProps {
  markdownContent: string;
  isPremium: boolean;
  onUpgrade?: () => void;
}

export const GuideContent = ({ markdownContent, isPremium, onUpgrade }: GuideContentProps) => {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="mb-4">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="markdown">Markdown</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div 
          className="prose max-w-none markdown-content"
          dangerouslySetInnerHTML={{ 
            __html: transformContentWithPremiumLimits(markdownContent, isPremium, true)
          }}
        />
        {!isPremium && <PremiumLock onUpgrade={onUpgrade} />}
      </TabsContent>
      <TabsContent value="markdown">
        <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap">
          {isPremium ? markdownContent : transformContentWithPremiumLimits(markdownContent, false)}
        </pre>
      </TabsContent>
    </Tabs>
  );
};

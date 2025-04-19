
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transformContentWithPremiumLimits, markdownToHtml } from "@/utils/premiumContent";
import { PremiumLock } from "./PremiumLock";
import { Button } from "@/components/ui/button";
import { UserPlus, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface GuideContentProps {
  markdownContent: string;
  isPremium: boolean;
  isRegistered: boolean;
  onUpgrade?: () => void;
}

export const GuideContent = ({ 
  markdownContent, 
  isPremium, 
  isRegistered,
  onUpgrade 
}: GuideContentProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Determine what level of content to show based on user status
  const getTransformedContent = (content: string, forHtml = false) => {
    if (isPremium) {
      return content; // Premium users see everything
    }
    
    if (!isRegistered) {
      // Unregistered users see very limited preview
      return transformContentWithPremiumLimits(content, false, forHtml, 'preview');
    }
    
    // Registered but not premium users see standard free content
    return transformContentWithPremiumLimits(content, false, forHtml);
  };

  const handleSignUp = () => {
    navigate('/auth');
  };

  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {isRegistered && <TabsTrigger value="markdown">Markdown</TabsTrigger>}
        </TabsList>
        <TabsContent value="preview">
          <div 
            className="prose max-w-none markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: getTransformedContent(markdownContent, true)
            }}
          />
          
          {!isRegistered && (
            <div className="mt-8 p-4 border border-blue-200 bg-blue-50 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">Create an Account to Access More</h3>
              </div>
              <p className="text-sm text-blue-700 mb-4">
                Sign up for free to unlock additional interview questions, download your guide, and save it for future reference.
              </p>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleSignUp}
              >
                Create Free Account
              </Button>
            </div>
          )}
          
          {isRegistered && !isPremium && <PremiumLock onUpgrade={onUpgrade} />}
        </TabsContent>
        
        <TabsContent value="markdown">
          <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap">
            {getTransformedContent(markdownContent, false)}
          </pre>
        </TabsContent>
      </Tabs>
      
      {!isRegistered && (
        <div className="mt-4 border-t pt-4 text-sm text-muted-foreground">
          <p>Already have an account? <Button variant="link" className="p-0 h-auto" onClick={handleSignUp}>Sign in</Button></p>
        </div>
      )}
    </>
  );
};

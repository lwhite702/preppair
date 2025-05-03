
import React from 'react';
import { PremiumLock } from './PremiumLock';
import MarkdownPreview from './MarkdownPreview';

interface GuideContentProps {
  markdownContent: string;
  isPremium: boolean;
  isRegistered: boolean;
  onUpgrade: () => void;
}

export const GuideContent: React.FC<GuideContentProps> = ({ 
  markdownContent, 
  isPremium,
  isRegistered,
  onUpgrade
}) => {
  // Premium users or unregistered users see the full content
  const shouldShowFullContent = isPremium || !isRegistered;
  
  return (
    <div className="relative">
      {shouldShowFullContent ? (
        <MarkdownPreview content={markdownContent} className="prose prose-slate max-w-none" />
      ) : (
        <>
          {/* Show preview - first part of the content before premium lock */}
          <div className="mb-8">
            <MarkdownPreview 
              content={markdownContent.substring(0, Math.min(1000, markdownContent.length / 3))} 
              className="prose prose-slate max-w-none" 
            />
          </div>
          
          {/* Premium lock overlay - using improved styling */}
          <PremiumLock onUpgrade={onUpgrade} />
        </>
      )}
    </div>
  );
};

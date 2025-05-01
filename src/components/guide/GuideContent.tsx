
import React, { useState, useEffect } from 'react';
import MarkdownPreview from './MarkdownPreview'; // Renders the provided markdown content as HTML.
import { Textarea } from '@/components/ui/textarea';
import PreviewToggle from './PreviewToggle';
import { PremiumLock } from './PremiumLock';
import { useNavigate } from 'react-router-dom';

interface GuideContentProps {
  markdownContent: string;
  isPremium: boolean;
  isRegistered: boolean;
  isEditable?: boolean;
  onContentChange?: (content: string) => void;
  previewText?: string;
  editText?: string;
  onUpgrade?: () => void;
}

export const GuideContent: React.FC<GuideContentProps> = ({
  markdownContent,
  isPremium,
  isRegistered,
  isEditable = false,
  onContentChange,
  previewText = 'Viewing rendered guide',
  editText = 'Editing guide content',
  onUpgrade
}) => {
  const [isPreview, setIsPreview] = useState(true);
  const [editableContent, setEditableContent] = useState(markdownContent);
  const navigate = useNavigate();

  useEffect(() => {
    setEditableContent(markdownContent);
  }, [markdownContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
    onContentChange?.(e.target.value);
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {isEditable && (
        <div className="flex justify-between items-center mb-4">
          <PreviewToggle 
            isPreview={isPreview} 
            onToggle={() => setIsPreview(!isPreview)} 
          />
          <div className="text-sm text-muted-foreground">
            {isPreview ? previewText : editText}
          </div>
        </div>
      )}
      
      {isEditable && !isPreview ? (
        <Textarea
          value={editableContent}
          onChange={handleContentChange}
          className="min-h-[400px] font-mono text-sm"
          aria-label="Edit markdown content"
        />
      ) : (
        <>
          <MarkdownPreview 
            content={isEditable ? editableContent : markdownContent} 
            isPremium={isPremium}
            isRegistered={isRegistered}
          />
          
          {!isPremium && isRegistered && (
            <PremiumLock onUpgrade={handleUpgrade} />
          )}
        </>
      )}
    </div>
  );
};

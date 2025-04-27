import React, { useState, useEffect } from 'react';
import MarkdownPreview from './MarkdownPreview';
import { Textarea } from '@/components/ui/textarea';
import PreviewToggle from './PreviewToggle';

interface GuideContentProps {
  /**
   * The markdown content to render or edit.
   */
  markdownContent: string;

  /**
   * Indicates if the user has premium access.
   * This may control the visibility of certain content.
   */
  isPremium: boolean;

  /**
   * Indicates if the user is registered.
   * This may control access to certain features.
   */
  isRegistered: boolean;

  /**
   * Enables edit mode for the content.
   * Default: false
   */
  isEditable?: boolean;

  /**
   * Callback function triggered when the content changes.
   */
  onContentChange?: (content: string) => void;

  /**
   * Custom text for the preview mode label.
   * Default: 'Viewing rendered guide'
   */
  previewText?: string;

  /**
   * Custom text for the edit mode label.
   * Default: 'Editing guide content'
   */
  editText?: string;
}

export const GuideContent: React.FC<GuideContentProps> = ({
  markdownContent,
  isPremium,
  isRegistered,
  isEditable = false,
  onContentChange,
  previewText = 'Viewing rendered guide',
  editText = 'Editing guide content',
}) => {
  const [isPreview, setIsPreview] = useState(true);
  const [editableContent, setEditableContent] = useState(markdownContent);

  useEffect(() => {
    setEditableContent(markdownContent);
  }, [markdownContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
    onContentChange?.(e.target.value);
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
        <MarkdownPreview 
          content={isEditable ? editableContent : markdownContent} 
          isPremium={isPremium}
          isRegistered={isRegistered}
        />
      )}
    </div>
  );
};
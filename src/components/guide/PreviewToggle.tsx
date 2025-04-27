// src/components/guide/PreviewToggle.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';

interface PreviewToggleProps {
  isPreview: boolean;
  onToggle: () => void;
}

const PreviewToggle: React.FC<PreviewToggleProps> = ({ isPreview, onToggle }) => {
  return (
    <div className="bg-muted p-1 rounded-lg inline-flex">
      <Button
        variant={isPreview ? "ghost" : "secondary"}
        size="sm"
        onClick={() => !isPreview && onToggle()}
        className="flex items-center gap-1"
      >
        <FileText className="h-4 w-4" />
        <span>Source</span>
      </Button>
      <Button
        variant={!isPreview ? "ghost" : "secondary"}
        size="sm"
        onClick={() => isPreview && onToggle()}
        className="flex items-center gap-1"
      >
        <Eye className="h-4 w-4" />
        <span>Preview</span>
      </Button>
    </div>
  );
};

export default PreviewToggle;

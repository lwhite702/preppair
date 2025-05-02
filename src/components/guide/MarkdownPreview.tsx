
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, className }) => {
  return (
    <div className={cn("markdown-content prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-primary" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3 text-secondary" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
          ),
          code: ({ node, inline, ...props }) => (
            inline ? 
            <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} /> : 
            <code className="block bg-muted p-2 rounded text-sm overflow-x-auto my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;

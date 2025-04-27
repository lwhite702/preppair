// src/components/Loading.tsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex-grow flex items-center justify-center py-16">
      <div className="text-center">
        <div className="h-12 w-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

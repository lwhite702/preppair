
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  id: string;
  onFileSelected: (file: File) => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
  className?: string;
}

export function FileUploader({
  id,
  onFileSelected,
  maxSizeMB = 10,
  acceptedFileTypes,
  className,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check file type if restrictions are specified
    if (
      acceptedFileTypes &&
      acceptedFileTypes.length > 0 &&
      !acceptedFileTypes.includes(file.type)
    ) {
      alert(
        `Invalid file type. Please upload one of the following: ${acceptedFileTypes.join(
          ", "
        )}`
      );
      return;
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    onFileSelected(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-gray-300 hover:border-primary/50",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        id={id}
        ref={inputRef}
        type="file"
        className="hidden"
        accept={acceptedFileTypes?.join(",")}
        onChange={handleFileInputChange}
      />
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="text-sm font-medium">
          Click to upload or drag and drop
        </div>
        <div className="text-xs text-muted-foreground">
          {acceptedFileTypes
            ? `${acceptedFileTypes
                .map((type) => type.split("/")[1].toUpperCase())
                .join(" or ")} up to ${maxSizeMB}MB`
            : `Maximum ${maxSizeMB}MB`}
        </div>
      </div>
    </div>
  );
}

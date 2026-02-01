"use client";

import { useState, useCallback } from "react";

interface StrategyUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export function StrategyUpload({ onFileUpload, isUploading }: StrategyUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndUpload = (file: File) => {
    setUploadError(null);

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size exceeds 10MB limit");
      return;
    }

    // Validate file type
    const allowedExtensions = [".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg", ".tiff"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setUploadError("File type not supported. Allowed: PDF, Word, PNG, JPEG, TIFF");
      return;
    }

    onFileUpload(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        validateAndUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        validateAndUpload(files[0]);
      }
      e.target.value = "";
    },
    [onFileUpload]
  );

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          
          <div>
            <p className="text-lg text-gray-700 font-medium">
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  Drop your strategy document here, or{" "}
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.tiff"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                    />
                  </label>
                </>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF, Word documents, and images up to 10MB
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 mt-6">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
              What we&apos;ll extract:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Summary",
                "Mission",
                "Values",
                "Strategic Goals",
                "Success Measures",
                "Priorities",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="mt-3 text-sm text-red-600 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {uploadError}
        </div>
      )}
    </div>
  );
}

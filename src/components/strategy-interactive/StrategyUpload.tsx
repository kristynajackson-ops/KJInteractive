"use client";

import { useState, useCallback } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800", "900"] });

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

    if (file.size > 20 * 1024 * 1024) {
      setUploadError("File size exceeds 20MB limit");
      return;
    }

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
          border-2 border-dashed rounded-xl p-12 text-center transition-colors
          ${isUploading ? "border-[#1db6ac] bg-white" : isDragging ? "border-[#1db6ac] bg-teal-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
          ${isUploading ? "pointer-events-none" : "cursor-pointer"}
        `}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <img src="/coffee-animation.gif" alt="Loading" className="w-24 h-24 mb-4" />
            <p className={`text-xl font-bold text-[#1db6ac] ${montserrat.className}`}>Good ideas brewing...</p>
            <p className="text-gray-600 mt-2">This might take a while, but it will be worth it.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div>
              <p className="text-lg text-gray-700 font-medium">
                Drop your strategy document here
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to browse</p>
            </div>

            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.tiff"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-2 rounded-full font-medium transition-colors cursor-pointer bg-gradient-to-r from-blue-400 to-teal-500 text-white hover:from-blue-500 hover:to-teal-600"
            >
              Select File
            </label>

            <p className="text-xs text-gray-400 mt-4">
              Supported: PDF, Word, PNG, JPEG, TIFF (max 20MB)
            </p>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {uploadError}
        </div>
      )}
    </div>
  );
}



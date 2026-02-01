"use client";

import { useState, useCallback } from "react";
import { StrategyUpload } from "@/components/StrategyUpload";
import { StrategyAnalysisView } from "@/components/StrategyAnalysisView";

export interface StrategyAnalysis {
  id: string;
  document_id: string;
  filename: string;
  file_url?: string;
  analysis: {
    summary: string | null;
    values: string[];
    strategic_goals: string[];
    measures_of_success: string[];
    current_state: string | null;
    future_state: string | null;
    enablers: string[];
    opportunities: string[];
    what_success_looks_like: string | null;
    priorities: string[];
    confidence_scores: Record<string, number>;
    raw_text_length: number;
  };
  analyzed_at: string;
}

export interface ComparisonMatch {
  match_type: string;
  similarity: number;
  segment_1: {
    index: number;
    text: string;
  };
  segment_2: {
    index: number;
    text: string;
  };
  theme?: string;
  unique_to?: string;
  relevance?: number;
  document_1_relevance?: number;
  document_2_relevance?: number;
  document_1_examples?: string[];
  document_2_examples?: string[];
  examples?: string[];
}

export interface ComparisonResult {
  granularity: string;
  similarity_score: number;
  document_1: {
    filename: string;
    word_count: number;
  };
  document_2: {
    filename: string;
    word_count: number;
  };
  matches: ComparisonMatch[];
}

export interface Document {
  id: string;
  filename: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  word_count?: number;
  text_preview?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [analysis, setAnalysis] = useState<StrategyAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/api/strategy/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze document");
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze document. Make sure the backend is running.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-10 w-full overflow-x-hidden">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-light text-gray-900 tracking-tight">Strategy Analyzer</h2>
        <p className="mt-4 text-lg text-gray-500">
          Upload a strategy document to extract and analyze key strategic elements
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Upload Section - Show when no analysis */}
      {!analysis && !isAnalyzing && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Upload Strategy Document</h3>
          <StrategyUpload onFileUpload={handleFileUpload} isUploading={isAnalyzing} />
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-900 font-medium">Analyzing your strategy document...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !isAnalyzing && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {/* Clickable Document Icon */}
              {analysis.file_url && (
                <a
                  href={`${API_BASE}${analysis.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer group flex-shrink-0"
                  title="View original document"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                    <path d="M8 12h8v1H8zm0 2h8v1H8zm0 2h5v1H8z"/>
                  </svg>
                </a>
              )}
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                <p className="text-sm text-gray-500 truncate">
                  {analysis.file_url ? (
                    <a
                      href={`${API_BASE}${analysis.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {analysis.filename}
                    </a>
                  ) : (
                    analysis.filename
                  )}
                  {" "}• Analyzed: {new Date(analysis.analyzed_at).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              Analyze Another Document
            </button>
          </div>
          <StrategyAnalysisView analysis={analysis.analysis} />
        </>
      )}
    </div>
  );
}

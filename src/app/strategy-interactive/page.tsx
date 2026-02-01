"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800", "900"] });

import { useState, useRef, useEffect } from "react";
import { StrategyUpload } from "@/components/strategy-interactive/StrategyUpload";
import { StrategyAnalysisView } from "@/components/strategy-interactive/StrategyAnalysisView";

interface AnalysisResult {
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
    analysis_method?: "llm" | "regex";
  };
}

export default function StrategyInteractivePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysisResult && resultsRef.current) {
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    }
  }, [analysisResult]);

  const handleFileUpload = async (file: File) => {
    setIsAnalysing(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/strategy/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to analyse document");
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Banner */}
      <section className="bg-white text-blue-900 pt-16">
        <div className="relative h-[18rem] sm:h-[20rem] bg-white">
          <img src="/kj-banner-plain.jpg" alt="Strategy Interactive banner" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
              <div className="text-left text-white">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 drop-shadow-lg ${montserrat.className}`}>
                  Strategy: interactive
                </h1>
                <p className={`text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl ${montserrat.className}`}>
                  Strategy document too long, too fluffy?<br />I'll break it down to what matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-8 sm:py-10 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-left">
          {/* Feature badges */}
          <div className="flex flex-wrap justify-start gap-2 sm:gap-3 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 text-teal-700 text-xs sm:text-sm font-medium border border-teal-100">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PDF & Word
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 text-xs sm:text-sm font-medium border border-purple-100">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium border border-emerald-100">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure
            </span>
          </div>

          {/* Upload Area */}
          <div className="mb-12">
            <StrategyUpload onFileUpload={handleFileUpload} isUploading={isAnalysing} />
          </div>

          

          {/* How does it work section */}
          <div className="mb-12 text-center">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 ${montserrat.className}`}>
              How does it work?
            </h2>
            <img src="/from-to.png" alt="How the strategy analysis works" className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md" />
            
            {/* Three explanation boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1db6ac] flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-white font-bold text-sm sm:text-base">1</span>
                </div>
                <div className="bg-[#eff0f0] rounded-lg p-4 sm:p-6 flex-1 w-full">
                  <p className="text-gray-700 text-sm sm:text-base">You have a great strategy that no one really reads because <span className="font-semibold">it's too long</span>.</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1db6ac] flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-white font-bold text-sm sm:text-base">2</span>
                </div>
                <div className="bg-[#eff0f0] rounded-lg p-4 sm:p-6 flex-1 w-full">
                  <p className="text-gray-700 text-sm sm:text-base">I use my experience to identify <span className="font-semibold">what's truly essential</span> in a strategy to realise outcomes.</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1db6ac] flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-white font-bold text-sm sm:text-base">3</span>
                </div>
                <div className="bg-[#eff0f0] rounded-lg p-4 sm:p-6 flex-1 w-full">
                  <p className="text-gray-700 text-sm sm:text-base">I use LLM and LRM to analyse your strategy to create a <span className="font-semibold">completely editable single-page view</span>.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
              <button
                onClick={handleReset}
                className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div ref={resultsRef} className="mb-8">
              <StrategyAnalysisView analysis={analysisResult.analysis} filename={analysisResult.filename} />
              <div className="mt-6 text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Analyse Another Document
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}










"use client";

interface StrategyAnalysisViewProps {
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
    llm_available?: boolean;
  };
}

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  content: string | null;
  confidence?: number;
  color: string;
}

interface ListSectionCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  confidence?: number;
  color: string;
}

// Dynamic font size calculator based on content length
function getTextSizeClass(contentLength: number, isListItem: boolean = false): string {
  if (isListItem) {
    // For list items, scale based on individual item length
    if (contentLength > 300) return "text-xs leading-tight";
    if (contentLength > 200) return "text-sm leading-snug";
    return "text-base leading-relaxed";
  }
  
  // For paragraph content
  if (contentLength > 1000) return "text-xs leading-tight";
  if (contentLength > 700) return "text-sm leading-snug";
  if (contentLength > 400) return "text-sm leading-relaxed";
  return "text-base leading-relaxed";
}

// Get total content length for a list
function getListContentLength(items: string[]): number {
  return items.reduce((total, item) => total + item.length, 0);
}

// Get font size class for list based on total content and item count
function getListTextSizeClass(items: string[]): string {
  const totalLength = getListContentLength(items);
  const itemCount = items.length;
  
  // Consider both total length and number of items
  if (itemCount > 10 || totalLength > 1500) return "text-xs leading-tight";
  if (itemCount > 7 || totalLength > 1000) return "text-sm leading-snug";
  if (itemCount > 5 || totalLength > 600) return "text-sm leading-relaxed";
  return "text-base leading-relaxed";
}

function ConfidenceBadge({ score }: { score?: number }) {
  if (score === undefined) return null;
  
  const percentage = Math.round(score * 100);
  let colorClass = "bg-gray-100 text-gray-600";
  
  if (percentage >= 80) colorClass = "bg-green-100 text-green-700";
  else if (percentage >= 50) colorClass = "bg-yellow-100 text-yellow-700";
  else colorClass = "bg-orange-100 text-orange-700";
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>
      {percentage}% confidence
    </span>
  );
}

function SectionCard({ title, icon, content, confidence, color }: SectionCardProps) {
  if (!content) {
    return (
      <div className={`bg-white rounded-xl border border-gray-100 p-6 border-l-4 ${color} opacity-50 w-full min-w-0`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {icon}
            <h4 className="font-medium text-gray-900 truncate">{title}</h4>
          </div>
        </div>
        <p className="text-gray-400 italic text-sm">Not found in document</p>
      </div>
    );
  }

  const textSizeClass = getTextSizeClass(content.length);

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-6 border-l-4 ${color} shadow-sm w-full min-w-0`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <h4 className="font-medium text-gray-900 truncate">{title}</h4>
        </div>
        <ConfidenceBadge score={confidence} />
      </div>
      <p className={`text-gray-700 whitespace-pre-line break-words ${textSizeClass}`}>{content}</p>
    </div>
  );
}

function ListSectionCard({ title, icon, items, confidence, color }: ListSectionCardProps) {
  const hasItems = items && items.length > 0;
  const textSizeClass = hasItems ? getListTextSizeClass(items) : "";

  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-6 border-l-4 ${color} ${!hasItems ? "opacity-50" : "shadow-sm"} w-full min-w-0`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <h4 className="font-medium text-gray-900 truncate">{title}</h4>
          {hasItems && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0">
              {items.length}
            </span>
          )}
        </div>
        <ConfidenceBadge score={confidence} />
      </div>
      {hasItems ? (
        <ul className={`space-y-2 ${textSizeClass}`}>
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
              <span className="break-words min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic text-sm">Not found in document</p>
      )}
    </div>
  );
}

export function StrategyAnalysisView({ analysis }: StrategyAnalysisViewProps) {
  const icons = {
    summary: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    values: (
      <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    goals: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    measures: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    current: (
      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    future: (
      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    enablers: (
      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    opportunities: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    priorities: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ),
  };

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      {/* Analysis Method Badge */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {analysis.analysis_method === "llm" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Analysis
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Pattern-Based Analysis
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500">
          {(analysis.raw_text_length / 1000).toFixed(1)}k characters analyzed
        </span>
      </div>

      {/* Summary - Full Width */}
      <SectionCard
        title="Summary"
        icon={icons.summary}
        content={analysis.summary}
        confidence={analysis.confidence_scores.summary}
        color="border-blue-500"
      />

      {/* Values */}
      <ListSectionCard
        title="Values"
        icon={icons.values}
        items={analysis.values}
        confidence={analysis.confidence_scores.values}
        color="border-pink-500"
      />

      {/* Strategic Goals */}
      <ListSectionCard
        title="Strategic Goals"
        icon={icons.goals}
        items={analysis.strategic_goals}
        confidence={analysis.confidence_scores.strategic_goals}
        color="border-green-500"
      />

      {/* Current State & Future State */}
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard
          title="Current State"
          icon={icons.current}
          content={analysis.current_state}
          confidence={analysis.confidence_scores.current_state}
          color="border-orange-500"
        />
        <SectionCard
          title="Future State / Vision"
          icon={icons.future}
          content={analysis.future_state}
          confidence={analysis.confidence_scores.future_state}
          color="border-cyan-500"
        />
      </div>

      {/* Measures of Success */}
      <ListSectionCard
        title="Measures of Success"
        icon={icons.measures}
        items={analysis.measures_of_success}
        confidence={analysis.confidence_scores.measures_of_success}
        color="border-indigo-500"
      />

      {/* What Success Looks Like */}
      <SectionCard
        title="What Success Looks Like"
        icon={icons.success}
        content={analysis.what_success_looks_like}
        confidence={analysis.confidence_scores.what_success_looks_like}
        color="border-emerald-500"
      />

      {/* Enablers & Opportunities */}
      <div className="grid md:grid-cols-2 gap-6">
        <ListSectionCard
          title="Enablers"
          icon={icons.enablers}
          items={analysis.enablers}
          confidence={analysis.confidence_scores.enablers}
          color="border-teal-500"
        />
        <ListSectionCard
          title="Opportunities"
          icon={icons.opportunities}
          items={analysis.opportunities}
          confidence={analysis.confidence_scores.opportunities}
          color="border-yellow-500"
        />
      </div>

      {/* Priorities */}
      <ListSectionCard
        title="Priorities"
        icon={icons.priorities}
        items={analysis.priorities}
        confidence={analysis.confidence_scores.priorities}
        color="border-red-500"
      />

      {/* Document Stats */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>Document length: {analysis.raw_text_length.toLocaleString()} characters</span>
          <span>•</span>
          <span>
            Elements found:{" "}
            {Object.values(analysis.confidence_scores).filter((v) => v > 0).length} / 10
          </span>
        </div>
      </div>
    </div>
  );
}

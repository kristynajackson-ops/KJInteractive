"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800", "900"] });

// Font size options for body text (in pixels)
const FONT_SIZES = [9, 10, 11, 12, 13, 14] as const;
type FontSizeIndex = 0 | 1 | 2 | 3 | 4 | 5;

// Get Tailwind class for font size
function getFontSizeClass(sizeIndex: FontSizeIndex): string {
  const classes = ['text-[9px]', 'text-[10px]', 'text-[11px]', 'text-xs', 'text-[13px]', 'text-sm'];
  return classes[sizeIndex];
}

// Get Tailwind class for title (one size larger)
function getTitleFontSizeClass(sizeIndex: FontSizeIndex): string {
  const classes = ['text-[10px]', 'text-[11px]', 'text-xs', 'text-[13px]', 'text-sm', 'text-base'];
  return classes[sizeIndex];
}

type BoxTheme = "grey" | "navy" | "teal" | "white" | "midblue" | "skyblue";

const themeStyles: Record<BoxTheme, { bg: string; text: string; title: string; bullet: string }> = {
  grey: { bg: "bg-[#eff0f0]", text: "text-gray-700", title: "text-[#1e3a5f]", bullet: "text-[#1db6ac]" },
  navy: { bg: "bg-[#1e3a5f]", text: "text-white", title: "text-white", bullet: "text-[#1db6ac]" },
  teal: { bg: "bg-[#1db6ac]", text: "text-white", title: "text-white", bullet: "text-white" },
  white: { bg: "bg-white", text: "text-gray-700", title: "text-[#1e3a5f]", bullet: "text-[#1db6ac]" },
  midblue: { bg: "bg-[#00264A]", text: "text-white", title: "text-white", bullet: "text-[#1db6ac]" },
  skyblue: { bg: "bg-[#CAF0F8]", text: "text-gray-700", title: "text-[#1e3a5f]", bullet: "text-[#1db6ac]" },
};

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
    priorities: string[];
    confidence_scores: Record<string, number>;
    raw_text_length: number;
    analysis_method?: "llm" | "regex";
  };
  filename: string;
}

interface BoxData {
  id: string;
  title: string;
  type: "text" | "list";
  content: string;
  items: string[];
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  theme: BoxTheme;
}

interface EditableBoxProps {
  id: string;
  title: string;
  onTitleChange: (value: string) => void;
  content: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  theme: BoxTheme;
  onThemeChange: (theme: BoxTheme) => void;
  onConvertToList: (items: string[]) => void;
  className?: string;
  fontSizeIndex: FontSizeIndex;
}

function EditableBox({ id, title, onTitleChange, content, onChange, onRemove, theme, onThemeChange, onConvertToList, className = "", fontSizeIndex }: EditableBoxProps) {
  const styles = themeStyles[theme];
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const initializedContent = useRef(false);
  const initializedTitle = useRef(false);
  
  // Initialize content on mount
  useEffect(() => {
    if (contentRef.current && !initializedContent.current) {
      contentRef.current.innerText = content;
      initializedContent.current = true;
    }
  }, []);
  
  // Update content when it changes externally (e.g., undo/redo)
  useEffect(() => {
    if (contentRef.current && initializedContent.current && document.activeElement !== contentRef.current) {
      contentRef.current.innerText = content;
    }
  }, [content]);
  
  // Initialize title on mount
  useEffect(() => {
    if (titleRef.current && !initializedTitle.current) {
      titleRef.current.innerText = title;
      initializedTitle.current = true;
    }
  }, []);
  
  // Update title when it changes externally
  useEffect(() => {
    if (titleRef.current && initializedTitle.current && document.activeElement !== titleRef.current) {
      titleRef.current.innerText = title;
    }
  }, [title]);
  
  const handleInput = () => {
    if (!contentRef.current) return;
    const text = contentRef.current.innerText || "";
    
    // Check if text contains lines starting with - or * followed by space
    const lines = text.split('\n');
    const bulletLines = lines.filter(line => /^[-*]\s+./.test(line.trim()));
    
    // If all non-empty lines are bullet points, convert to list
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    if (nonEmptyLines.length > 0 && bulletLines.length === nonEmptyLines.length) {
      // Convert to list: strip the leading - or * and space
      const items = nonEmptyLines.map(line => line.trim().replace(/^[-*]\s+/, ''));
      onConvertToList(items);
      return;
    }
  };
  
  const syncContent = () => {
    if (contentRef.current) {
      onChange(contentRef.current.innerText || "");
    }
  };
  
  return (
    <div className={`${className ? className : styles.bg} rounded relative group/box flex-1`}>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover/box:opacity-100 transition-opacity flex items-center justify-center text-xs z-10 hover:bg-red-600"
        title="Remove box"
      >
        &times;
      </button>
      {/* Theme picker - positioned at bottom right */}
      <div className="absolute bottom-2 right-8 flex gap-1 opacity-0 group-hover/box:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onThemeChange("white")}
          className={`w-4 h-4 rounded-full bg-white border-2 ${theme === "white" ? "border-[#1db6ac]" : "border-gray-300"} hover:border-[#1db6ac]`}
          title="White theme"
        />
        <button
          onClick={() => onThemeChange("grey")}
          className={`w-4 h-4 rounded-full bg-[#eff0f0] border-2 ${theme === "grey" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Light grey theme"
        />
        <button
          onClick={() => onThemeChange("skyblue")}
          className={`w-4 h-4 rounded-full bg-[#CAF0F8] border-2 ${theme === "skyblue" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Sky blue theme"
        />
        <button
          onClick={() => onThemeChange("navy")}
          className={`w-4 h-4 rounded-full bg-[#1e3a5f] border-2 ${theme === "navy" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Navy theme"
        />
        <button
          onClick={() => onThemeChange("midblue")}
          className={`w-4 h-4 rounded-full bg-[#00264A] border-2 ${theme === "midblue" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Dark blue theme"
        />
        <button
          onClick={() => onThemeChange("teal")}
          className={`w-4 h-4 rounded-full bg-[#1db6ac] border-2 ${theme === "teal" ? "border-white" : "border-transparent"} hover:border-white`}
          title="Teal theme"
        />
      </div>
      <div className="p-3 pt-2 lg:pt-3">
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => {
            if (titleRef.current) {
              onTitleChange(titleRef.current.innerText || "");
            }
          }}
          className={`${styles.title} font-bold ${getTitleFontSizeClass(fontSizeIndex)} mb-1 bg-transparent border-none outline-none w-full ${montserrat.className} pl-7 lg:pl-0`}
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', minHeight: '1em' }}
        />
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={syncContent}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              // Insert a newline at cursor position
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const br = document.createElement('br');
                range.insertNode(br);
                // Insert another br to ensure cursor moves to new line
                const br2 = document.createElement('br');
                range.insertNode(br2);
                // Move cursor between the two brs
                range.setStartAfter(br);
                range.setEndAfter(br);
                selection.removeAllRanges();
                selection.addRange(range);
              }
            }
          }}
          className={`${styles.text} ${getFontSizeClass(fontSizeIndex)} leading-tight outline-none min-h-[1em] break-words whitespace-pre-wrap overflow-wrap-anywhere [&_br]:block [&_br]:mb-1`}
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
        />
        </div>
    </div>
  );
}

interface EditableListBoxProps {
  title: string;
  onTitleChange: (value: string) => void;
  items: string[];
  onChange: (items: string[]) => void;
  onRemove: () => void;
  theme: BoxTheme;
  onThemeChange: (theme: BoxTheme) => void;
  className?: string;
  fontSizeIndex: FontSizeIndex;
}

// Individual list item component to prevent cursor jumping
function EditableListItem({ 
  item, 
  index, 
  styles, 
  onItemChange, 
  onKeyDown,
  items,
  fontSizeIndex
}: { 
  item: string; 
  index: number; 
  styles: { bg: string; text: string; title: string; bullet: string };
  onItemChange: (index: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>, index: number, currentText: string) => void;
  items: string[];
  fontSizeIndex: FontSizeIndex;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  
  // Initialize on mount only
  useEffect(() => {
    if (itemRef.current && !initializedRef.current) {
      const displayValue = item ? item.charAt(0).toUpperCase() + item.slice(1) : '';
      itemRef.current.innerText = displayValue;
      initializedRef.current = true;
    }
  }, []);
  
  // Update when items change externally (undo/redo) but not when focused
  useEffect(() => {
    if (itemRef.current && initializedRef.current && document.activeElement !== itemRef.current) {
      const displayValue = item ? item.charAt(0).toUpperCase() + item.slice(1) : '';
      itemRef.current.innerText = displayValue;
    }
  }, [item]);
  
  return (
    <li className="flex items-start gap-2">
      <span className={`${styles.bullet} font-bold ${getFontSizeClass(fontSizeIndex)} mt-[1px]`}>&bull;</span>
      <div
        ref={itemRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={() => {
          if (itemRef.current) {
            onItemChange(index, itemRef.current.innerText || '');
          }
        }}
        onKeyDown={(e) => {
          // Handle Ctrl+A to select all bullet points in the list
          if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            e.stopPropagation();
            const selection = window.getSelection();
            const range = document.createRange();
            // Find the parent ul element and select all its contents
            const ul = itemRef.current?.closest('ul');
            if (ul) {
              range.selectNodeContents(ul);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
            return;
          }
          const currentText = itemRef.current?.innerText || '';
          onKeyDown(e, index, currentText);
        }}
        className={`flex-1 border-none outline-none ${styles.text} ${getFontSizeClass(fontSizeIndex)} bg-transparent leading-tight break-words`}
        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', minHeight: '1em' }}
      />
    </li>
  );
}

function EditableListBox({ title, onTitleChange, items, onChange, onRemove, theme, onThemeChange, className = "", fontSizeIndex }: EditableListBoxProps) {
  const styles = themeStyles[theme];
  const listRef = useRef<HTMLUListElement>(null);
  
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    newItems[index] = capitalizedValue;
    onChange(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number, currentText: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.currentTarget;
      const selection = window.getSelection();
      
      // Get text before and after cursor
      let textBefore = '';
      let textAfter = '';
      
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preRange = document.createRange();
        preRange.selectNodeContents(target);
        preRange.setEnd(range.startContainer, range.startOffset);
        textBefore = preRange.toString();
        
        const postRange = document.createRange();
        postRange.selectNodeContents(target);
        postRange.setStart(range.endContainer, range.endOffset);
        textAfter = postRange.toString();
      } else {
        textBefore = currentText;
        textAfter = '';
      }
      
      // Update current item's DOM immediately
      target.innerText = textBefore;
      
      const newItems = [...items];
      newItems[index] = textBefore;
      newItems.splice(index + 1, 0, textAfter);
      onChange(newItems);
      
      // Focus the new contentEditable after render
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (listRef.current) {
            const editables = listRef.current.querySelectorAll('[contenteditable="true"]');
            if (editables && editables[index + 1]) {
              const newElement = editables[index + 1] as HTMLElement;
              newElement.innerText = textAfter;
              newElement.focus();
              // Place cursor at the start
              const range = document.createRange();
              const sel = window.getSelection();
              if (newElement.childNodes.length > 0) {
                range.setStart(newElement.childNodes[0], 0);
                range.collapse(true);
              } else {
                range.selectNodeContents(newElement);
                range.collapse(true);
              }
              sel?.removeAllRanges();
              sel?.addRange(range);
            }
          }
        }, 10);
      });
    } else if (e.key === 'Backspace' && currentText === '' && items.length > 1) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
      // Focus the previous contentEditable
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (listRef.current) {
            const editables = listRef.current.querySelectorAll('[contenteditable="true"]');
            if (editables && editables[index - 1]) {
              const prevElement = editables[index - 1] as HTMLElement;
              prevElement.focus();
              // Place cursor at the end
              const range = document.createRange();
              const sel = window.getSelection();
              range.selectNodeContents(prevElement);
              range.collapse(false);
              sel?.removeAllRanges();
              sel?.addRange(range);
            }
          }
        }, 10);
      });
    }
  };

  // Get display items
  const displayItems = items.length > 0 ? items : [""];

  return (
    <div className={`${className ? className : styles.bg} rounded relative group/box flex-1`}>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover/box:opacity-100 transition-opacity flex items-center justify-center text-xs z-10 hover:bg-red-600"
        title="Remove box"
      >
        &times;
      </button>
      {/* Theme picker - positioned at bottom right */}
      <div className="absolute bottom-2 right-8 flex gap-1 opacity-0 group-hover/box:opacity-100 transition-opacity z-10">
        <button
          onClick={() => onThemeChange("white")}
          className={`w-4 h-4 rounded-full bg-white border-2 ${theme === "white" ? "border-[#1db6ac]" : "border-gray-300"} hover:border-[#1db6ac]`}
          title="White theme"
        />
        <button
          onClick={() => onThemeChange("grey")}
          className={`w-4 h-4 rounded-full bg-[#eff0f0] border-2 ${theme === "grey" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Light grey theme"
        />
        <button
          onClick={() => onThemeChange("skyblue")}
          className={`w-4 h-4 rounded-full bg-[#CAF0F8] border-2 ${theme === "skyblue" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Sky blue theme"
        />
        <button
          onClick={() => onThemeChange("navy")}
          className={`w-4 h-4 rounded-full bg-[#1e3a5f] border-2 ${theme === "navy" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Navy theme"
        />
        <button
          onClick={() => onThemeChange("midblue")}
          className={`w-4 h-4 rounded-full bg-[#00264A] border-2 ${theme === "midblue" ? "border-[#1db6ac]" : "border-transparent"} hover:border-[#1db6ac]`}
          title="Dark blue theme"
        />
        <button
          onClick={() => onThemeChange("teal")}
          className={`w-4 h-4 rounded-full bg-[#1db6ac] border-2 ${theme === "teal" ? "border-white" : "border-transparent"} hover:border-white`}
          title="Teal theme"
        />
      </div>
      <div className="p-3 pt-2 lg:pt-3">
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onTitleChange(e.currentTarget.innerText || "")}
          className={`${styles.title} font-bold ${getTitleFontSizeClass(fontSizeIndex)} mb-1 bg-transparent border-none outline-none w-full ${montserrat.className} pl-7 lg:pl-0`}
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', minHeight: '1em' }}
        >
          {title}
        </div>
        <ul ref={listRef} className="space-y-1">
          {displayItems.map((item, index) => (
            <EditableListItem
              key={`${index}-${displayItems.length}`}
              item={item}
              index={index}
              styles={styles}
              onItemChange={handleItemChange}
              onKeyDown={handleKeyDown}
              items={items}
              fontSizeIndex={fontSizeIndex}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StrategyAnalysisView({ analysis, filename }: StrategyAnalysisViewProps) {
  // Derive initial strategy name from filename
  const initialStrategyName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  
  // Editable heading state
  const [strategyName, setStrategyName] = useState(initialStrategyName);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Font size state (index into FONT_SIZES array, default to index 3 which is 12px/text-xs)
  const [fontSizeIndex, setFontSizeIndex] = useState<FontSizeIndex>(3);

  // Font size controls
  const increaseFontSize = useCallback(() => {
    setFontSizeIndex(prev => Math.min(5, prev + 1) as FontSizeIndex);
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeIndex(prev => Math.max(0, prev - 1) as FontSizeIndex);
  }, []);

  // Transform themes when dark mode toggles
  const transformThemeForDarkMode = useCallback((theme: BoxTheme, toDark: boolean): BoxTheme => {
    if (toDark) {
      // Light to Dark: white→navy, navy→white, grey→midblue
      if (theme === "white") return "navy";
      if (theme === "navy") return "white";
      if (theme === "grey") return "midblue";
    } else {
      // Dark to Light: navy→white (if was white), white→navy (if was navy), midblue→grey
      if (theme === "navy") return "white";
      if (theme === "white") return "navy";
      if (theme === "midblue") return "grey";
    }
    return theme; // teal stays teal
  }, []);

  // Handle dark mode toggle with theme transformation
  const handleDarkModeToggle = useCallback(() => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    setBoxes(prev => prev.map(box => ({
      ...box,
      theme: transformThemeForDarkMode(box.theme, newDarkMode)
    })));
  }, [isDarkMode, transformThemeForDarkMode]);

  // Initial box configuration - dynamically layout based on which fields have content
  const getInitialBoxes = useCallback((): BoxData[] => {
    // Executive summary always at top
    const boxes: BoxData[] = [
      { id: "summary", title: "Executive summary", type: "text", content: analysis.summary || "", items: [], visible: true, x: 0, y: 0, width: 100, height: 15, theme: "white" },
    ];

    // Define all possible boxes with their data
    const potentialBoxes: { id: string; title: string; type: "text" | "list"; hasContent: boolean; content: string; items: string[]; theme: BoxTheme }[] = [
      { id: "values", title: "Our values", type: "list", hasContent: analysis.values.length > 0, content: "", items: analysis.values, theme: "navy" },
      { id: "current", title: "Where we are now", type: "text", hasContent: !!analysis.current_state, content: analysis.current_state || "", items: [], theme: "skyblue" },
      { id: "priorities", title: "Key priorities", type: "list", hasContent: analysis.priorities.length > 0, content: "", items: analysis.priorities, theme: "grey" },
      { id: "vision", title: "Our vision", type: "text", hasContent: !!analysis.future_state, content: analysis.future_state || "", items: [], theme: "navy" },
      { id: "measures", title: "Measures of success", type: "list", hasContent: analysis.measures_of_success.length > 0, content: "", items: analysis.measures_of_success, theme: "teal" },
      { id: "enablers", title: "Enablers", type: "list", hasContent: analysis.enablers.length > 0, content: "", items: analysis.enablers, theme: "grey" },
      { id: "goals", title: "Strategic goals", type: "list", hasContent: analysis.strategic_goals.length > 0, content: "", items: analysis.strategic_goals, theme: "grey" },
    ];

    // Filter to only boxes with content
    const activeBoxes = potentialBoxes.filter(b => b.hasContent);
    
    if (activeBoxes.length === 0) {
      // No content found - return just the executive summary
      return boxes;
    }

    // Calculate dynamic layout: fill available space below executive summary (y: 17-99)
    const availableHeight = 82; // 99 - 17
    const startY = 17;
    const gap = 2; // Gap between rows/columns
    
    // Determine grid layout based on number of active boxes
    const count = activeBoxes.length;
    let cols: number, rows: number;
    
    if (count <= 2) {
      cols = count;
      rows = 1;
    } else if (count <= 4) {
      cols = 2;
      rows = Math.ceil(count / 2);
    } else if (count <= 6) {
      cols = 3;
      rows = Math.ceil(count / 3);
    } else {
      cols = 4;
      rows = Math.ceil(count / 4);
    }

    const boxWidth = (100 - (cols + 1) * gap) / cols;
    const boxHeight = (availableHeight - (rows + 1) * gap) / rows;

    activeBoxes.forEach((box, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = gap + col * (boxWidth + gap);
      const y = startY + gap + row * (boxHeight + gap);
      
      boxes.push({
        id: box.id,
        title: box.title,
        type: box.type,
        content: box.content,
        items: box.items.length > 0 ? box.items : [""],
        visible: true,
        x,
        y,
        width: boxWidth,
        height: boxHeight,
        theme: box.theme,
      });
    });

    return boxes;
  }, [analysis]);

  // Box visibility and data state - including Executive Summary with positions (percentages)
  const [boxes, setBoxes] = useState<BoxData[]>(getInitialBoxes);

  // Undo/Redo history
  const [history, setHistory] = useState<{ boxes: BoxData[]; strategyName: string }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedo = useRef(false);

  // Save state to history (debounced to avoid too many snapshots)
  const saveToHistory = useCallback(() => {
    if (isUndoRedo.current) {
      isUndoRedo.current = false;
      return;
    }
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ boxes: JSON.parse(JSON.stringify(boxes)), strategyName });
      // Keep max 50 history entries
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [boxes, strategyName, historyIndex]);

  // Debounce history saving
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(saveToHistory, 500);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [boxes, strategyName, saveToHistory]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedo.current = true;
      const prevState = history[historyIndex - 1];
      setBoxes(JSON.parse(JSON.stringify(prevState.boxes)));
      setStrategyName(prevState.strategyName);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedo.current = true;
      const nextState = history[historyIndex + 1];
      setBoxes(JSON.parse(JSON.stringify(nextState.boxes)));
      setStrategyName(nextState.strategyName);
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  // Reset to default
  const resetToDefault = useCallback(() => {
    setBoxes(getInitialBoxes());
    setStrategyName(initialStrategyName);
    // Clear history and start fresh
    setHistory([]);
    setHistoryIndex(-1);
  }, [getInitialBoxes, initialStrategyName]);

  // Reference to A3 container for PDF export
  const a3ContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  
  // Track container width for scaling content on mobile
  const [canvasScale, setCanvasScale] = useState(1);
  const DESIGN_WIDTH = 900; // Reference width for design (px) - content designed at this width
  
  // Update scale when container resizes
  useEffect(() => {
    const updateScale = () => {
      if (a3ContainerRef.current) {
        const containerWidth = a3ContainerRef.current.offsetWidth;
        // Only scale down on smaller screens (below design width)
        if (containerWidth < DESIGN_WIDTH) {
          setCanvasScale(containerWidth / DESIGN_WIDTH);
        } else {
          setCanvasScale(1);
        }
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleExport = useCallback(async () => {
    if (!a3ContainerRef.current) return;
    
    // Check if mobile/tablet (using screen width - lg breakpoint is 1024px)
    const isMobileOrTablet = window.innerWidth < 1024;
    
    // Clear selection to hide resize handles
    setSelectedBoxId(null);
    
    // Dynamically import html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    const container = a3ContainerRef.current;
    
    // Clone the container for capture - this avoids modifying the original
    const clone = container.cloneNode(true) as HTMLElement;
    
    // Style the clone for capture at design width
    clone.style.width = `${DESIGN_WIDTH}px`;
    clone.style.maxWidth = 'none';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.overflow = 'visible';
    clone.style.zIndex = '-1';
    clone.style.aspectRatio = 'auto'; // Remove aspect ratio constraint
    clone.style.height = 'auto'; // Let content determine height
    clone.classList.add('pdf-export');
    
    // Remove zoom from the content wrapper in the clone
    const cloneContentWrapper = clone.querySelector('div') as HTMLElement;
    if (cloneContentWrapper) {
      cloneContentWrapper.style.zoom = '1';
    }
    
    // Hide all buttons in the clone
    const cloneButtons = clone.querySelectorAll('button');
    cloneButtons.forEach(btn => (btn as HTMLElement).style.display = 'none');
    
    // Fix footer - remove negative margins so it's fully captured
    const allDivs = clone.querySelectorAll('div');
    allDivs.forEach(div => {
      const el = div as HTMLElement;
      // Check for negative margins and remove them
      const style = window.getComputedStyle(el);
      if (parseFloat(style.marginBottom) < 0) {
        el.style.marginBottom = '0';
      }
      if (parseFloat(style.marginLeft) < 0) {
        el.style.marginLeft = '0';
      }
      if (parseFloat(style.marginRight) < 0) {
        el.style.marginRight = '0';
      }
    });
    
    // Append clone to body for capture
    document.body.appendChild(clone);
    
    // Small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capture the clone
    const canvas = await html2canvas(clone, {
      scale: 3, // High resolution for quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });
    
    // Remove the clone
    document.body.removeChild(clone);
    
    const filename = strategyName.replace(/\s+/g, '-').toLowerCase();
    
    if (isMobileOrTablet) {
      // Mobile/tablet: export as JPG for simplicity
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `${filename}-strategy.jpg`;
      link.href = imgData;
      link.click();
    } else {
      // Desktop: export as PDF
      const jsPDF = (await import('jspdf')).default;
      
      // A3 landscape dimensions in mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit the canvas proportionally into A3
      const canvasAspect = canvas.width / canvas.height;
      const pdfAspect = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfHeight;
      let offsetX = 0;
      let offsetY = 0;
      
      if (canvasAspect > pdfAspect) {
        // Canvas is wider - fit to width
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / canvasAspect;
        offsetY = (pdfHeight - finalHeight) / 2;
      } else {
        // Canvas is taller - fit to height
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * canvasAspect;
        offsetX = (pdfWidth - finalWidth) / 2;
      }
      
      pdf.addImage(imgData, 'PNG', offsetX, offsetY, finalWidth, finalHeight);
      pdf.save(`${filename}-strategy.pdf`);
    }
  }, [strategyName]);

  const updateBox = useCallback((id: string, updates: Partial<BoxData>) => {
    setBoxes(prev => prev.map(box => box.id === id ? { ...box, ...updates } : box));
  }, []);

  const removeBox = useCallback((id: string) => {
    setBoxes(prev => prev.map(box => box.id === id ? { ...box, visible: false } : box));
  }, []);

  const restoreBox = useCallback((id: string) => {
    setBoxes(prev => prev.map(box => box.id === id ? { ...box, visible: true } : box));
  }, []);

  const addBox = useCallback(() => {
    const newId = `custom-${Date.now()}`;
    const newBox: BoxData = {
      id: newId,
      title: "New box",
      type: "text",
      content: "",
      items: [],
      visible: true,
      x: 5,
      y: 5,
      width: 25,
      height: 20,
      theme: "grey",
    };
    setBoxes(prev => [...prev, newBox]);
  }, []);

  // Free-form drag state
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; boxX: number; boxY: number } | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  // Resize state - track which corner or edge is being dragged
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [resizeCorner, setResizeCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l' | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number; boxX: number; boxY: number } | null>(null);

  // Selected box for mobile (shows resize handles only on selected box)
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  // Refs to track current state for touch/mouse handlers (avoids stale closure issues)
  const draggedIdRef = useRef<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; boxX: number; boxY: number } | null>(null);
  const resizingIdRef = useRef<string | null>(null);
  const resizeCornerRef = useRef<'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l' | null>(null);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number; boxX: number; boxY: number } | null>(null);
  const containerRefRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef(boxes);

  // Keep refs in sync with state
  useEffect(() => { draggedIdRef.current = draggedId; }, [draggedId]);
  useEffect(() => { dragStartRef.current = dragStart; }, [dragStart]);
  useEffect(() => { resizingIdRef.current = resizingId; }, [resizingId]);
  useEffect(() => { resizeCornerRef.current = resizeCorner; }, [resizeCorner]);
  useEffect(() => { resizeStartRef.current = resizeStart; }, [resizeStart]);
  useEffect(() => { containerRefRef.current = containerRef; }, [containerRef]);
  useEffect(() => { boxesRef.current = boxes; }, [boxes]);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string, boxX: number, boxY: number) => {
    // Don't start drag if clicking on editable elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.contentEditable === 'true' || target.closest('input') || target.closest('[contenteditable="true"]')) {
      return;
    }
    // Only start drag from the drag-handle area
    const rect = target.closest('.drag-handle');
    if (!rect) return;
    e.preventDefault();
    setDraggedId(id);
    setDragStart({ x: e.clientX, y: e.clientY, boxX, boxY });
  }, []);

  // Touch handlers for mobile drag - touch, hold, drag to move boxes
  const handleTouchStart = useCallback((e: React.TouchEvent, id: string, boxX: number, boxY: number) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.contentEditable === 'true' || target.closest('input') || target.closest('[contenteditable="true"]')) {
      return;
    }
    const rect = target.closest('.drag-handle');
    if (!rect) return;
    
    // Prevent scrolling while dragging
    e.preventDefault();
    
    const touch = e.touches[0];
    setDraggedId(id);
    setDragStart({ x: touch.clientX, y: touch.clientY, boxX, boxY });
    // Also select the box for visual feedback
    setSelectedBoxId(id);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, id: string, width: number, height: number, boxX: number, boxY: number, corner: 'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l') => {
    e.preventDefault();
    e.stopPropagation();
    setResizingId(id);
    setResizeCorner(corner);
    setResizeStart({ x: e.clientX, y: e.clientY, width, height, boxX, boxY });
  }, []);

  // Touch handler for mobile resize
  const handleResizeTouchStart = useCallback((e: React.TouchEvent, id: string, width: number, height: number, boxX: number, boxY: number, corner: 'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l') => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    setResizingId(id);
    setResizeCorner(corner);
    setResizeStart({ x: touch.clientX, y: touch.clientY, width, height, boxX, boxY });
  }, []);

  // Use document-level events for smoother dragging (prevents glitches when mouse/touch moves fast)
  // This effect runs once and uses refs to access current state values
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      const container = containerRefRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const SNAP_THRESHOLD = 0.5;
      const currentBoxes = boxesRef.current;

      // Handle drag
      if (draggedIdRef.current && dragStartRef.current) {
        const dragStart = dragStartRef.current;
        const draggedId = draggedIdRef.current;
        
        const deltaX = ((clientX - dragStart.x) / containerRect.width) * 100;
        const deltaY = ((clientY - dragStart.y) / containerRect.height) * 100;
        const currentBox = currentBoxes.find(b => b.id === draggedId);
        const boxWidth = currentBox?.width || 30;
        const boxHeight = currentBox?.height || 20;
        let newX = Math.max(0, Math.min(100 - boxWidth, dragStart.boxX + deltaX));
        let newY = Math.max(0, Math.min(100 - boxHeight, dragStart.boxY + deltaY));
        
        const otherBoxes = currentBoxes.filter(b => b.id !== draggedId && b.visible);
        for (const other of otherBoxes) {
          if (Math.abs(newX - other.x) < SNAP_THRESHOLD) newX = other.x;
          if (Math.abs((newX + boxWidth) - (other.x + other.width)) < SNAP_THRESHOLD) newX = other.x + other.width - boxWidth;
          if (Math.abs(newX - (other.x + other.width)) < SNAP_THRESHOLD) newX = other.x + other.width;
          if (Math.abs((newX + boxWidth) - other.x) < SNAP_THRESHOLD) newX = other.x - boxWidth;
          if (Math.abs(newY - other.y) < SNAP_THRESHOLD) newY = other.y;
          if (Math.abs((newY + boxHeight) - (other.y + other.height)) < SNAP_THRESHOLD) newY = other.y + other.height - boxHeight;
          if (Math.abs(newY - (other.y + other.height)) < SNAP_THRESHOLD) newY = other.y + other.height;
          if (Math.abs((newY + boxHeight) - other.y) < SNAP_THRESHOLD) newY = other.y - boxHeight;
        }
        
        setBoxes(prev => prev.map(box => 
          box.id === draggedId ? { ...box, x: newX, y: newY } : box
        ));
        return true; // Indicate we handled a drag
      }

      // Handle resize
      if (resizingIdRef.current && resizeStartRef.current && resizeCornerRef.current) {
        const resizeStart = resizeStartRef.current;
        const resizingId = resizingIdRef.current;
        const resizeCorner = resizeCornerRef.current;
        
        const deltaX = ((clientX - resizeStart.x) / containerRect.width) * 100;
        const deltaY = ((clientY - resizeStart.y) / containerRect.height) * 100;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.boxX;
        let newY = resizeStart.boxY;
        
        if (resizeCorner === 'br') {
          newWidth = Math.max(15, Math.min(100 - newX, resizeStart.width + deltaX));
          newHeight = Math.max(10, Math.min(100 - newY, resizeStart.height + deltaY));
        } else if (resizeCorner === 'bl') {
          const widthDelta = -deltaX;
          newWidth = Math.max(15, resizeStart.width + widthDelta);
          newX = Math.max(0, Math.min(resizeStart.boxX + resizeStart.width - 15, resizeStart.boxX + deltaX));
          newHeight = Math.max(10, Math.min(100 - newY, resizeStart.height + deltaY));
        } else if (resizeCorner === 'tr') {
          newWidth = Math.max(15, Math.min(100 - newX, resizeStart.width + deltaX));
          const heightDelta = -deltaY;
          newHeight = Math.max(10, resizeStart.height + heightDelta);
          newY = Math.max(0, Math.min(resizeStart.boxY + resizeStart.height - 10, resizeStart.boxY + deltaY));
        } else if (resizeCorner === 'tl') {
          const widthDelta = -deltaX;
          const heightDelta = -deltaY;
          newWidth = Math.max(15, resizeStart.width + widthDelta);
          newHeight = Math.max(10, resizeStart.height + heightDelta);
          newX = Math.max(0, Math.min(resizeStart.boxX + resizeStart.width - 15, resizeStart.boxX + deltaX));
          newY = Math.max(0, Math.min(resizeStart.boxY + resizeStart.height - 10, resizeStart.boxY + deltaY));
        } else if (resizeCorner === 't') {
          const heightDelta = -deltaY;
          newHeight = Math.max(10, resizeStart.height + heightDelta);
          newY = Math.max(0, Math.min(resizeStart.boxY + resizeStart.height - 10, resizeStart.boxY + deltaY));
        } else if (resizeCorner === 'r') {
          newWidth = Math.max(15, Math.min(100 - newX, resizeStart.width + deltaX));
        } else if (resizeCorner === 'b') {
          newHeight = Math.max(10, Math.min(100 - newY, resizeStart.height + deltaY));
        } else if (resizeCorner === 'l') {
          const widthDelta = -deltaX;
          newWidth = Math.max(15, resizeStart.width + widthDelta);
          newX = Math.max(0, Math.min(resizeStart.boxX + resizeStart.width - 15, resizeStart.boxX + deltaX));
        }
        
        setBoxes(prev => prev.map(box => 
          box.id === resizingId ? { ...box, x: newX, y: newY, width: newWidth, height: newHeight } : box
        ));
        return true; // Indicate we handled a resize
      }
      
      return false;
    };

    const handleEnd = () => {
      setDraggedId(null);
      setDragStart(null);
      setResizingId(null);
      setResizeCorner(null);
      setResizeStart(null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (draggedIdRef.current || resizingIdRef.current) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (draggedIdRef.current || resizingIdRef.current) {
        const touch = e.touches[0];
        if (touch) {
          e.preventDefault(); // Prevent scrolling while dragging/resizing
          handleMove(touch.clientX, touch.clientY);
        }
      }
    };

    const handleMouseUp = () => {
      if (draggedIdRef.current || resizingIdRef.current) {
        handleEnd();
      }
    };

    const handleTouchEnd = () => {
      if (draggedIdRef.current || resizingIdRef.current) {
        handleEnd();
      }
    };

    // Always attach listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []); // Empty dependency array - runs once, uses refs for current values

  const visibleBoxes = boxes.filter(box => box.visible);
  const hiddenBoxes = boxes.filter(box => !box.visible);

  return (
    <div className="strategy-canvas w-full">
      {/* Print Controls */}
      <div className="print:hidden mb-4">
        {/* Mobile: Analysis info on top */}
        <div className="flex items-center gap-3 mb-3 md:mb-0 md:hidden">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#eff0f0] text-[#1db6ac] text-xs font-medium">
            {analysis.analysis_method === "llm" ? "AI Analysis" : "Pattern Analysis"}
          </span>
          <span className="text-xs text-gray-500">
            {(analysis.raw_text_length / 1000).toFixed(1)}k chars
          </span>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff0f0] text-[#1db6ac] text-sm font-medium">
              {analysis.analysis_method === "llm" ? "AI-Powered Analysis" : "Pattern-Based Analysis"}
            </span>
            <span className="text-sm text-gray-500">
              {(analysis.raw_text_length / 1000).toFixed(1)}k characters analysed
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hiddenBoxes.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    restoreBox(e.target.value);
                  }
                  e.target.value = "";
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                defaultValue=""
              >
                <option value="" disabled>Restore removed box...</option>
                {hiddenBoxes.map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            )}
            <button
              onClick={resetToDefault}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
              title="Reset to default"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Undo
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
              Redo
            </button>
            <button
              onClick={addBox}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add box
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1db6ac] text-white rounded-lg hover:bg-[#19a89f] transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to PDF
            </button>
            {/* Font size controls */}
            <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decreaseFontSize}
                disabled={fontSizeIndex === 0}
                className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                title="Decrease font size"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-3 py-2 bg-white text-gray-700 text-sm font-medium min-w-[60px] text-center">
                {FONT_SIZES[fontSizeIndex]}px
              </span>
              <button
                onClick={increaseFontSize}
                disabled={fontSizeIndex === 5}
                className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-300"
                title="Increase font size"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${isDarkMode ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        {/* Mobile toolbar - horizontally scrollable */}
        <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex items-center gap-2 min-w-max">
            {hiddenBoxes.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    restoreBox(e.target.value);
                  }
                  e.target.value = "";
                }}
                className="px-2 py-1.5 border border-gray-300 rounded-lg text-xs bg-white flex-shrink-0"
                defaultValue=""
              >
                <option value="" disabled>Restore...</option>
                {hiddenBoxes.map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            )}
            <button
              onClick={resetToDefault}
              className="inline-flex items-center gap-1 px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg active:bg-gray-300 transition-colors font-medium text-xs flex-shrink-0"
              title="Reset"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="inline-flex items-center gap-1 px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg active:bg-gray-300 transition-colors font-medium text-xs disabled:opacity-50 flex-shrink-0"
              title="Undo"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="inline-flex items-center gap-1 px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg active:bg-gray-300 transition-colors font-medium text-xs disabled:opacity-50 flex-shrink-0"
              title="Redo"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
            <button
              onClick={addBox}
              className="inline-flex items-center gap-1 px-2 py-1.5 bg-[#1e3a5f] text-white rounded-lg active:bg-[#162d4a] transition-colors font-medium text-xs flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1 px-2 py-1.5 bg-[#1db6ac] text-white rounded-lg active:bg-[#19a89f] transition-colors font-medium text-xs flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            {/* Font size controls - compact */}
            <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
              <button
                onClick={decreaseFontSize}
                disabled={fontSizeIndex === 0}
                className="px-2 py-1.5 bg-white text-gray-700 active:bg-gray-100 transition-colors disabled:opacity-50 border-r border-gray-300"
                title="Decrease"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-2 py-1.5 bg-white text-gray-700 text-xs font-medium">
                {FONT_SIZES[fontSizeIndex]}
              </span>
              <button
                onClick={increaseFontSize}
                disabled={fontSizeIndex === 5}
                className="px-2 py-1.5 bg-white text-gray-700 active:bg-gray-100 transition-colors disabled:opacity-50 border-l border-gray-300"
                title="Increase"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors font-medium text-xs flex-shrink-0 ${isDarkMode ? 'bg-gray-200 text-gray-800 active:bg-gray-300' : 'bg-gray-800 text-white active:bg-gray-700'}`}
            >
              {isDarkMode ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>

      {/* A3 Landscape Canvas - scales to fit viewport on mobile */}
      <div 
        ref={a3ContainerRef}
        className={`mx-auto shadow-2xl rounded-sm w-full overflow-hidden ${isDarkMode ? 'bg-[#1e3a5f]' : 'bg-white'} print:shadow-none transition-colors duration-300`}
        style={{ 
          maxWidth: '100%',
          aspectRatio: '1.414 / 1',
        }}
      >
        {/* Content wrapper - uses zoom for proportional scaling (works with html2canvas) */}
        <div 
          ref={contentWrapperRef}
          className="h-full flex flex-col p-[2%]"
          style={{
            // Use zoom instead of transform for scaling - html2canvas handles zoom correctly
            zoom: canvasScale < 1 ? canvasScale : 1,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-shrink-0 mb-4">
            <div>
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setStrategyName(e.currentTarget.innerText || initialStrategyName)}
                className={`text-xl font-black capitalize leading-tight outline-none border-b-2 border-transparent hover:border-[#1db6ac] focus:border-[#1db6ac] transition-colors ${isDarkMode ? 'text-white' : 'text-[#1e3a5f]'} ${montserrat.className}`}
              >
                {strategyName}
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ${montserrat.className}`}>KJ&apos;s strategy on a page</p>
            </div>
            <div className="text-right">
              <img src={isDarkMode ? "/kj-logo-white.png" : "/kj-logo-black.png"} alt="KJ Interactive" className="h-10" />
            </div>
          </div>

          {/* Free-form Boxes Container */}
          <div 
            ref={setContainerRef}
            className="flex-1 relative"
            style={{ 
              overflow: 'visible',
              minHeight: 0, // Allow flexbox to calculate proper height
            }}
            onClick={() => setSelectedBoxId(null)} // Deselect when tapping empty area
          >
            {visibleBoxes.map(box => (
              <div
                key={box.id}
                className={`absolute transition-shadow duration-150 group/wrapper flex flex-col ${
                  draggedId === box.id || resizingId === box.id ? 'shadow-lg z-50' : selectedBoxId === box.id ? 'z-40' : 'z-10'
                }`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  minHeight: `${box.height}%`,
                }}
                onClick={(e) => {
                  // Select box on tap/click (mobile)
                  e.stopPropagation();
                  setSelectedBoxId(box.id);
                }}
              >
                {/* Box content wrapper */}
                <div className="flex-1 flex flex-col relative">
                  {/* Drag handle - inside box, top-left corner, mobile/tablet only */}
                  <div
                    className={`drag-handle lg:hidden absolute top-1 left-1 z-20 cursor-grab active:cursor-grabbing p-1.5 rounded ${
                      box.theme === 'teal' || box.theme === 'navy' || box.theme === 'midblue' 
                        ? 'bg-white/20 active:bg-white/30' 
                        : 'bg-black/10 active:bg-black/15'
                    } transition-colors`}
                    onMouseDown={(e) => handleMouseDown(e, box.id, box.x, box.y)}
                    onTouchStart={(e) => handleTouchStart(e, box.id, box.x, box.y)}
                  >
                    <svg className={`w-4 h-4 ${box.theme === 'teal' || box.theme === 'navy' || box.theme === 'midblue' ? 'text-white/70' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    </svg>
                  </div>
                  {box.type === "text" ? (
                    <EditableBox
                      id={box.id}
                      title={box.title}
                      onTitleChange={(title) => updateBox(box.id, { title })}
                      content={box.content}
                      onChange={(content) => updateBox(box.id, { content })}
                      onRemove={() => removeBox(box.id)}
                      theme={box.theme}
                      onThemeChange={(theme) => updateBox(box.id, { theme })}
                      onConvertToList={(items) => updateBox(box.id, { type: "list", items, content: "" })}
                      fontSizeIndex={fontSizeIndex}
                    />
                  ) : (
                    <EditableListBox
                      title={box.title}
                      onTitleChange={(title) => updateBox(box.id, { title })}
                      items={box.items}
                      onChange={(items) => updateBox(box.id, { items })}
                      onRemove={() => removeBox(box.id)}
                      theme={box.theme}
                      onThemeChange={(theme) => updateBox(box.id, { theme })}
                      fontSizeIndex={fontSizeIndex}
                    />
                  )}
                </div>
                {/* Resize handles - visible when selected on mobile/tablet, or on hover on desktop (lg+) - more subtle styling */}
                <div
                  className={`resize-handle absolute top-0 left-0 w-5 h-5 lg:w-2 lg:h-2 cursor-nw-resize transition-opacity rounded-br ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'tl')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'tl')}
                />
                <div
                  className={`resize-handle absolute top-0 right-0 w-5 h-5 lg:w-2 lg:h-2 cursor-ne-resize transition-opacity rounded-bl ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'tr')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'tr')}
                />
                <div
                  className={`resize-handle absolute bottom-0 left-0 w-5 h-5 lg:w-2 lg:h-2 cursor-sw-resize transition-opacity rounded-tr ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'bl')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'bl')}
                />
                <div
                  className={`resize-handle absolute bottom-0 right-0 w-5 h-5 lg:w-2 lg:h-2 cursor-se-resize transition-opacity rounded-tl ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'br')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'br')}
                />
                {/* Resize handles - edges (hidden by default, show on selection for mobile/tablet, hover for desktop) */}
                <div
                  className={`resize-handle absolute top-0 left-5 right-5 lg:left-2 lg:right-2 h-2 lg:h-0.5 cursor-n-resize transition-opacity ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 't')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 't')}
                />
                <div
                  className={`resize-handle absolute right-0 top-5 bottom-5 lg:top-2 lg:bottom-2 w-2 lg:w-0.5 cursor-e-resize transition-opacity ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'r')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'r')}
                />
                <div
                  className={`resize-handle absolute bottom-0 left-5 right-5 lg:left-2 lg:right-2 h-2 lg:h-0.5 cursor-s-resize transition-opacity ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'b')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'b')}
                />
                <div
                  className={`resize-handle absolute left-0 top-5 bottom-5 lg:top-2 lg:bottom-2 w-2 lg:w-0.5 cursor-w-resize transition-opacity ${box.theme === 'teal' ? 'bg-[#1e3a5f]/70' : 'bg-[#1db6ac]/70'} ${selectedBoxId === box.id ? 'opacity-80' : 'opacity-0'} lg:opacity-0 lg:group-hover/wrapper:opacity-60`}
                  onMouseDown={(e) => handleResizeStart(e, box.id, box.width, box.height, box.x, box.y, 'l')}
                  onTouchStart={(e) => handleResizeTouchStart(e, box.id, box.width, box.height, box.x, box.y, 'l')}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`${isDarkMode ? 'bg-[#1db6ac]' : 'bg-gradient-to-r from-[#5f5e5c] to-[#6a6665]'} px-4 py-2 flex items-center justify-between text-xs text-white flex-shrink-0 mt-4 -mx-6 -mb-6`}>
            <span>Generated with Strategy Interactive &middot; kjinteractive.com</span>
            <span className="flex items-center gap-1">
              <span>&copy;</span>
              <img src="/kj-logo-white.png" alt="" className="h-4 inline-block" />
              <span>Kristyn Jackson {new Date().getFullYear()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        /* PDF Export - hide UI elements during capture */
        .pdf-export .drag-handle {
          display: none !important;
        }
        .pdf-export .resize-handle {
          display: none !important;
        }
        
        @media print {
          @page {
            size: A3 landscape;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .strategy-canvas {
            width: 100%;
          }
          .strategy-canvas > div:first-of-type {
            display: none !important;
          }
          .strategy-canvas > div:last-of-type {
            max-height: none !important;
            height: auto !important;
          }
          button {
            display: none !important;
          }
          nav, footer, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DocumentFile {
  name: string;
  type: string;
  content: string;
  size: number;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // Extract text from PDF using server-side API
  const extractPdfText = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to extract PDF');
      }
      
      const data = await response.json();
      return data.text || '[No text content found in PDF]';
    } catch (error) {
      console.error('PDF extraction error:', error);
      return `[Failed to extract PDF content: ${error instanceof Error ? error.message : 'Unknown error'}. Please paste the text manually.]`;
    }
  };

  // Process files from either input or drag/drop
  const processFiles = async (files: FileList | File[]) => {
    console.log('processFiles called with', files.length, 'files');
    setIsProcessingFile(true);
    const newDocuments: DocumentFile[] = [];

    try {
      for (const file of Array.from(files)) {
        console.log('Processing file:', file.name, 'type:', file.type, 'size:', file.size);
        // Handle text-based files
        if (
          file.type === 'text/plain' ||
          file.type === 'text/markdown' ||
          file.type === 'application/json' ||
          file.type === 'text/csv' ||
          file.type === 'text/html' ||
          file.type === 'application/xml' ||
          file.type === 'text/xml' ||
          file.name.endsWith('.md') ||
          file.name.endsWith('.txt') ||
          file.name.endsWith('.json') ||
          file.name.endsWith('.csv') ||
          file.name.endsWith('.html') ||
          file.name.endsWith('.xml') ||
          file.name.endsWith('.js') ||
          file.name.endsWith('.ts') ||
          file.name.endsWith('.tsx') ||
          file.name.endsWith('.jsx') ||
          file.name.endsWith('.py') ||
          file.name.endsWith('.java') ||
          file.name.endsWith('.css') ||
          file.name.endsWith('.scss')
        ) {
          const content = await file.text();
          newDocuments.push({
            name: file.name,
            type: file.type || 'text/plain',
            content,
            size: file.size,
          });
        } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          // Extract text from PDF
          const content = await extractPdfText(file);
          newDocuments.push({
            name: file.name,
            type: 'application/pdf',
            content,
            size: file.size,
          });
        } else {
          alert(`File type not supported: ${file.name}. Supported types: TXT, MD, JSON, CSV, HTML, XML, PDF, code files`);
        }
      }

      console.log('New documents to add:', newDocuments.length);
      if (newDocuments.length > 0) {
        setDocuments(prev => {
          console.log('Setting documents, prev:', prev.length, 'new:', newDocuments.length);
          return [...prev, ...newDocuments];
        });
      }
    } catch (err) {
      console.error('Error in processFiles:', err);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('File input changed, files:', files);
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }
    console.log('Processing files:', Array.from(files).map(f => f.name));
    await processFiles(files);
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragging to false if we're leaving the dropzone entirely
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if (!input.trim() && documents.length === 0) return;
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          documents: documents.map(d => ({
            name: d.name,
            type: d.type,
            content: d.content,
          })),
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                // Stream complete
                const assistantMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  role: 'assistant',
                  content: fullContent,
                  timestamp: new Date(),
                };
                setMessages(prev => [...prev, assistantMessage]);
                setStreamingContent('');
              } else {
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) {
                    fullContent += parsed.text;
                    setStreamingContent(fullContent);
                  }
                } catch {
                  // Ignore parsing errors for partial data
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to communicate with the AI'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setDocuments([]);
    setStreamingContent('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const exportToPDF = async () => {
    if (messages.length === 0) {
      alert('No messages to export');
      return;
    }

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Brand colors
    const brandTeal = [29, 182, 172]; // #1db6ac
    const darkGray = [55, 65, 81]; // text-gray-700
    const lightGray = [156, 163, 175]; // text-gray-400

    // Clean white header
    const headerHeight = 38;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Add subtle bottom border to header
    pdf.setDrawColor(229, 231, 235); // gray-200
    pdf.setLineWidth(0.5);
    pdf.line(0, headerHeight, pageWidth, headerHeight);

    // Load and add logo (kj-logo-black)
    try {
      const logoResponse = await fetch('/kj-logo-black.png');
      const logoBlob = await logoResponse.blob();
      const logoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(logoBlob);
      });
      // Smaller logo with correct aspect ratio (200:149)
      pdf.addImage(logoBase64, 'PNG', margin, 14, 12, 9);
    } catch (e) {
      console.error('Failed to load logo:', e);
    }
    
    // "Interactive" text in black, heading font style
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Interactive', margin + 16, 22);
    
    // "Claude Chat Export" subtitle in gray
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Claude Chat Export', margin + 16, 29);
    
    // Date on header right
    pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.setFontSize(9);
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.text(dateStr, pageWidth - margin - pdf.getTextWidth(dateStr), 22);

    yPosition = 50;

    // Messages
    messages.forEach((message) => {
      const isUser = message.role === 'user';
      const roleLabel = isUser ? 'You' : 'Claude';
      const timeStr = message.timestamp.toLocaleTimeString();
      
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      // Role label and timestamp
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      if (isUser) {
        pdf.setTextColor(brandTeal[0], brandTeal[1], brandTeal[2]);
      } else {
        pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      }
      pdf.text(roleLabel, margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.setFontSize(8);
      pdf.text(timeStr, margin + pdf.getTextWidth(roleLabel + '  '), yPosition);
      
      yPosition += 6;

      // Message content
      pdf.setFontSize(10);
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(message.content, contentWidth);
      
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });

      yPosition += 8; // Space between messages
    });

    // Footer on last page
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2 - 15,
        pageHeight - 10
      );
      pdf.text(
        'kjinteractive.com',
        pageWidth - margin - pdf.getTextWidth('kjinteractive.com'),
        pageHeight - 10
      );
    }

    // Save the PDF
    const filename = `claude-chat-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
  };

  return (
    <div 
      ref={dropZoneRef}
      className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-[#1db6ac]/10 border-2 border-dashed border-[#1db6ac] rounded-lg z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <svg className="w-12 h-12 mx-auto mb-2 text-[#1db6ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium text-gray-700">Drop files here</p>
            <p className="text-sm text-gray-500">TXT, MD, JSON, CSV, HTML, XML, code files</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Claude Chat</h1>
          <p className="text-sm text-gray-500">Powered by AWS Bedrock - Claude Sonnet 4</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportToPDF}
            disabled={messages.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
          <button
            type="button"
            onClick={clearChat}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Documents Panel */}
      {(documents.length > 0 || isProcessingFile) && (
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {isProcessingFile ? 'Processing file...' : `Attached Documents (${documents.length})`}
            </span>
            {isProcessingFile && (
              <div className="w-4 h-4 border-2 border-[#1db6ac] border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm"
              >
                <span className="text-gray-700 truncate max-w-[200px]">{doc.name}</span>
                <span className="text-gray-400 text-xs">({formatFileSize(doc.size)})</span>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !streamingContent && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Start a conversation</h2>
            <p className="text-gray-500 max-w-md">
              Chat with Claude Sonnet 4. You can also upload documents to discuss their contents.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#1db6ac] text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">{message.content}</div>
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming message */}
        {streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-800">
              <div className="whitespace-pre-wrap break-words">{streamingContent}</div>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-[#1db6ac] rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator when no streaming content yet */}
        {isLoading && !streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#1db6ac] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#1db6ac] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#1db6ac] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-500">Claude is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end gap-3">
          {/* File upload button */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".txt,.md,.json,.csv,.html,.xml,.js,.ts,.tsx,.jsx,.py,.java,.css,.scss,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => {
              console.log('Triggering file input click');
              fileInputRef.current?.click();
            }}
            className="flex-shrink-0 p-2.5 text-gray-500 hover:text-[#1db6ac] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Attach documents (or drag & drop)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Claude... (drag & drop files here)"
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1db6ac] focus:border-transparent"
              style={{ maxHeight: '150px', minHeight: '48px' }}
            />
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={sendMessage}
            disabled={isLoading || (!input.trim() && documents.length === 0)}
            className="flex-shrink-0 p-2.5 bg-gradient-to-r from-blue-400 to-teal-500 text-white rounded-lg hover:from-blue-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line | Drag & drop files anywhere
        </p>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

// Sanitize text to remove problematic characters for JSON
function sanitizeText(text: string): string {
  return text
    // Remove null bytes and other control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Replace multiple spaces with single space
    .replace(/  +/g, ' ')
    // Replace multiple newlines with double newline
    .replace(/\n{3,}/g, '\n\n')
    // Trim each line
    .split('\n')
    .map(line => line.trim())
    .join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('Processing PDF:', file.name, 'size:', file.size);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Use pdf-parse v2 API
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    
    console.log('PDF has', result.pages?.length || 0, 'pages');
    
    // Sanitize the extracted text
    const sanitizedText = sanitizeText(result.text || '');
    
    // Limit text length to prevent issues with very large documents
    const maxLength = 500000; // ~500KB of text
    const truncatedText = sanitizedText.length > maxLength 
      ? sanitizedText.substring(0, maxLength) + '\n\n[Document truncated due to size...]'
      : sanitizedText;
    
    console.log('Extracted text length:', truncatedText.length);
    
    return NextResponse.json({
      text: truncatedText,
      numPages: result.pages?.length || 0,
      info: {},
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to extract PDF text' },
      { status: 500 }
    );
  }
}

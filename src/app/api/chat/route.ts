import { BedrockRuntimeClient, ConverseCommand, ConverseStreamCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Claude model ID on Bedrock (Claude 3.5 Sonnet v2)
// For ap-southeast-1, use the standard model ID without region prefix
const MODEL_ID = 'anthropic.claude-3-5-sonnet-20241022-v2:0';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DocumentContent {
  name: string;
  type: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, documents, stream = false }: { 
      messages: Message[]; 
      documents?: DocumentContent[];
      stream?: boolean;
    } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Build the conversation messages for Bedrock
    const bedrockMessages = messages.map((msg) => {
      // If this is a user message and we have documents, prepend document content
      if (msg.role === 'user' && documents && documents.length > 0) {
        const documentContext = documents.map(doc => 
          `[Document: ${doc.name}]\n${doc.content}\n[End Document]`
        ).join('\n\n');
        
        return {
          role: msg.role as 'user' | 'assistant',
          content: [{ text: `${documentContext}\n\n${msg.content}` }],
        };
      }
      
      return {
        role: msg.role as 'user' | 'assistant',
        content: [{ text: msg.content }],
      };
    });

    if (stream) {
      // Streaming response
      const command = new ConverseStreamCommand({
        modelId: MODEL_ID,
        messages: bedrockMessages,
        system: [{ text: 'You are a helpful AI assistant. When documents are provided, analyze them thoughtfully and reference specific parts when answering questions about them.' }],
        inferenceConfig: {
          maxTokens: 4096,
          temperature: 0.7,
        },
      });

      const response = await bedrockClient.send(command);
      
      // Create a readable stream for the response
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            if (response.stream) {
              for await (const event of response.stream) {
                if (event.contentBlockDelta?.delta?.text) {
                  const chunk = event.contentBlockDelta.delta.text;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
                }
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const command = new ConverseCommand({
        modelId: MODEL_ID,
        messages: bedrockMessages,
        system: [{ text: 'You are a helpful AI assistant. When documents are provided, analyze them thoughtfully and reference specific parts when answering questions about them.' }],
        inferenceConfig: {
          maxTokens: 4096,
          temperature: 0.7,
        },
      });

      const response = await bedrockClient.send(command);
      
      const assistantMessage = response.output?.message?.content?.[0];
      const responseText = assistantMessage && 'text' in assistantMessage ? assistantMessage.text : '';

      return NextResponse.json({
        message: responseText,
        usage: response.usage,
      });
    }
  } catch (error) {
    console.error('Bedrock API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to communicate with Bedrock' },
      { status: 500 }
    );
  }
}

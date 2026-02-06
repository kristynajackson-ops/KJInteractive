import ChatInterface from '@/components/chat/ChatInterface';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800", "900"] });

export const metadata = {
  title: 'Claude Chat | KJ Interactive',
  description: 'Chat with Claude AI powered by AWS Bedrock',
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Banner */}
      <section className="bg-white text-blue-900 pt-16">
        <div className="relative h-[18rem] sm:h-[20rem] bg-white">
          <img src="/kj-banner-plain.jpg" alt="Secure AI Chat banner" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
              <div className="text-left text-white">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 drop-shadow-lg ${montserrat.className}`}>
                  Chat with Claude securely
                </h1>
                <p className={`text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-md max-w-2xl ${montserrat.className}`}>
                  I&apos;ve used AWS Bedrock to run Claude Sonnet 4,<br />which provides additional security and keeps our data onshore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="relative py-8 sm:py-10 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg p-4 bg-gray-50 text-center">
              <svg className="w-8 h-8 mb-3 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#grad1)"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
                <defs>
                  <linearGradient id="grad1" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#1db6ac"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="font-bold text-sm mb-2">Hosted in Sydney</h3>
              <p className="text-gray-600 text-sm">Data remains within Australian borders on AWS ap-southeast-2.</p>
            </div>
            
            <div className="rounded-lg p-4 bg-gray-50 text-center">
              <svg className="w-8 h-8 mb-3 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="url(#grad2)"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="grad2" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#1db6ac"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="font-bold text-sm mb-2">No training on your data</h3>
              <p className="text-gray-600 text-sm">AWS Bedrock never uses your inputs or outputs to train models.</p>
            </div>
            
            <div className="rounded-lg p-4 bg-gray-50 text-center">
              <svg className="w-8 h-8 mb-3 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" fill="url(#grad3)"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="url(#grad3stroke)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1.5" fill="white"/>
                <defs>
                  <linearGradient id="grad3" x1="3" y1="11" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#1db6ac"/>
                  </linearGradient>
                  <linearGradient id="grad3stroke" x1="7" y1="4" x2="17" y2="11" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#1db6ac"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="font-bold text-sm mb-2">No data retention</h3>
              <p className="text-gray-600 text-sm">Conversations are not stored after your session ends.</p>
            </div>
            
            <div className="rounded-lg p-4 bg-gray-50 text-center">
              <svg className="w-8 h-8 mb-3 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="url(#grad4)"/>
                <rect x="9" y="10" width="6" height="5" rx="1" fill="white"/>
                <path d="M10 10V8.5a2 2 0 014 0V10" stroke="white" strokeWidth="1.5"/>
                <defs>
                  <linearGradient id="grad4" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa"/>
                    <stop offset="1" stopColor="#1db6ac"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="font-bold text-sm mb-2">Enterprise security</h3>
              <p className="text-gray-600 text-sm">Private endpoints with encryption at rest and in transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ChatInterface />
      </section>
    </main>
  );
}

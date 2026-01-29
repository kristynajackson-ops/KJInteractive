'use client';

import { useEffect, useState } from 'react';

export default function InteractiveStrategyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-white min-h-screen pt-24 pb-0">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-12">
          <a href="/#ideas" className="font-semibold mb-6 inline-block hover:text-[#1db6ac]">
            &larr; Back to Ideas
          </a>
          <h1 className="text-4xl font-extrabold mb-2">Interactive Strategy</h1>
        </div>

        <div className="bg-white/80 border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <p className="text-lg text-gray-600">Interactive strategy adopts an enterprise or program-level focus to build relevant, living, and resonant strategy. It leverages principles of service design, systems thinking, enterprise architecture and change management.</p>
          <p className="text-lg text-gray-600 mt-4">Its aims to ensure strategic priorities and designs are understood, accurate, relevant and inform delivery.</p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Service Design</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Systems Thinking</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Enterprise Architecture</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Change Management</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-black mb-6">
            'Interactive strategy' is the unique work I do to support my clients in their transformation journey.
          </h1>
          <p className="text-black text-lg leading-relaxed mt-6 mb-6">
            Interactive strategy is an ongoing and living process - ensuring that strategy is informing, while being informed by delivery, and changes in the environment. And, as the rapid pace of change accelerates - thanks, AI - I believe that it is more important than ever that strategy is interactive: it cannot be static, we cannot hold ourselves to 3-year timelines when the pace of change is so rapid.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Headings above the boxes */}
          <div className="col-span-1 md:col-span-2 flex flex-row items-end mb-2">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-2 text-black text-center">Current State</h2>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-2 text-black text-center">Future State</h2>
            </div>
          </div>
          {/* Linked first pair: left side in darker grey box with chevron matching box height, right box with less curve, dot points mid-line centered, icons slightly larger, increased spacing, no outline on right box */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-0 mb-4">
            <div className="flex-1 flex items-center gap-6 relative" style={{ backgroundColor: '#eff0f0', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-red-500" fill="currentColor" />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="self-center"><span className="font-semibold">Program level strategic artefacts and planning is static</span>, and undertaken during initial program discovery. As these artefacts are not kept up to date, they lose relevance as transformation programs progress to delivery and implementation stages.</span>
              <span className="hidden md:block absolute right-[-24px] top-0 h-full z-0" style={{height: '100%', marginRight: '12px'}}>
                <svg width="48" height="100%" viewBox="0 0 48 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height: '100%'}}>
                  <polygon points="0,0 48,60 0,120" fill="#eff0f0" />
                </svg>
              </span>
            </div>
            <div className="flex-1 flex items-center gap-6 rounded-md bg-white p-6 shadow-sm min-h-[120px]">
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-green-500" fill="currentColor" />
                  <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              <span className="self-center"><span className="font-semibold">Program level strategic artefacts and planning are living</span>, continually evolving based on lessons-learned and new opportunities. They are up-to-date and relevant to delivery.</span>
            </div>
          </div>
          {/* Second pair: update with new text */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-0 mb-4">
            <div className="flex-1 flex items-center gap-6 relative" style={{ backgroundColor: '#eff0f0', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-red-500" fill="currentColor" />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="self-center">Delivery, business and sustainment teams <span className="font-semibold">do not always reference or understand program level strategic artefacts</span>. Subsequently, they may duplicate work and deliver outcomes that do not reflect strategic goals.</span>
              <span className="hidden md:block absolute right-[-24px] top-0 h-full z-0" style={{height: '100%', marginRight: '12px'}}>
                <svg width="48" height="100%" viewBox="0 0 48 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height: '100%'}}>
                  <polygon points="0,0 48,60 0,120" fill="#eff0f0" />
                </svg>
              </span>
            </div>
            <div className="flex-1 flex items-center gap-6 rounded-md bg-white p-6 shadow-sm min-h-[120px]">
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-green-500" fill="currentColor" />
                  <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              <span className="self-center">Delivery, business and sustainment teams <span className="font-semibold">have been involved at every stage and have co-designed program artefacts and informed decision making</span>. This fosters buy-in and understanding of transformation goals.</span>
            </div>
          </div>
          {/* Third pair: update with new text */}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-0 mb-4">
            <div className="flex-1 flex items-center gap-6 relative" style={{ backgroundColor: '#eff0f0', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-red-500" fill="currentColor" />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="self-center">Handover from program strategy to delivery is limited and/or complex, leading to misunderstanding of intent and focus.</span>
              <span className="hidden md:block absolute right-[-24px] top-0 h-full z-0" style={{height: '100%', marginRight: '12px'}}>
                <svg width="48" height="100%" viewBox="0 0 48 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height: '100%'}}>
                  <polygon points="0,0 48,60 0,120" fill="#eff0f0" />
                </svg>
              </span>
            </div>
            <div className="flex-1 flex items-center gap-6 rounded-md bg-white p-6 shadow-sm min-h-[120px]">
              <span className="mt-1 inline-flex self-center">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" className="text-green-500" fill="currentColor" />
                  <path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              <span className="self-center">As designs are maintained and informed by delivery, they are useful to and leveraged by delivery teams; handover is not required as these functions are linked.</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: '#eff0f0', borderRadius: '0', width: '100%' }}>
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-0 pt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-8">Service catalogue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-4 text-black">Establish</h3>
              <ul className="space-y-3 text-black">
                <li>Service blueprints</li>
                <li>Concept models (current, future)</li>
                <li>Delivery models</li>
                <li>Discovery and user research</li>
                <li>Customer journeys</li>
                <li>HCD frameworks, standards and templates</li>
              </ul>
            </div>
            <div className="rounded-lg p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-4 text-black">Enable</h3>
              <ul className="space-y-3 text-black">
                <li>Prioritisation frameworks</li>
                <li>Strategic roadmaps</li>
                <li>Enterprise models</li>
                <li>Governance models</li>
                <li>Capability maps and analysis</li>
              </ul>
            </div>
            <div className="rounded-lg p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-4 text-black">Embed</h3>
              <ul className="space-y-3 text-black">
                <li>Change management plans</li>
                <li>Benefits management</li>
                <li>Continuous improvement frameworks</li>
                <li>Performance measurement</li>
                <li>Knowledge transfer</li>
                <li>Training and capability uplift</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-400 to-teal-500 text-white p-3 rounded-full shadow-lg hover:from-blue-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M12 4a.75.75 0 01.53.22l5.25 5.25a.75.75 0 11-1.06 1.06L12.75 6.59V20a.75.75 0 01-1.5 0V6.59L7.28 10.53a.75.75 0 11-1.06-1.06L11.47 4.22A.75.75 0 0112 4z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      {/* Add eff0f0 background only at the very bottom */}
      <div style={{ background: '#eff0f0', width: '100%', height: '64px' }}></div>
    </main>
  );
}

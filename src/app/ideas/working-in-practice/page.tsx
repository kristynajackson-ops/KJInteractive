
"use client";
import { useEffect, useState } from "react";


export default function LinkingSociologyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-white min-h-screen pt-24 pb-24">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-12">
          <a href="/#ideas" className="font-semibold mb-6 inline-block hover:text-[#1db6ac]">
            &larr; Back to Ideas
          </a>
          <h1 className="text-4xl font-extrabold mb-4">Working in practice</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-white/80 border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <p className="text-lg text-gray-600">Practice theory provides a powerful lens for understanding how strategy and delivery interact in real-world transformation. It helps us see how structures and agency shape outcomes, and why grounding strategy in practice is essential for meaningful change.</p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Sociology</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Systems Thinking</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Strategy</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Structure</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">Agency</span>
          </div>
        </div>
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-black mb-6">
            Interactive strategy is grounded in practice theory. It's not new, it just hasn't been applied to digital transformation.
          </h2>
          <div className="w-full md:w-2/5 float-right ml-0 md:ml-12 mb-8">
              <img src="/structure-agency.png" alt="Structure and Agency Diagram" width={400} height={192} className="w-full mb-2" />
            <div className="text-xs text-gray-500 text-center">
              (Adapted from Staines et al. <a href="https://uq.pressbooks.pub/introduction-social-sciences/chapter/the-sociological-imagination-thinking-sociologically/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">2023</a>, chapter 2 (referencing Giddens' Structuration Theory))
            </div>
          </div>
          <p className="text-black text-lg leading-relaxed mb-6">
            This concept isn&apos;t new-it&apos;s rooted in decades of social theory. However, it hasn&apos;t been effectively applied to digital transformation programs.
          </p>
          <p className="text-black text-lg leading-relaxed mb-6">
            In practice theory a central debate revolves around how we rationalise the necessarily intertwined nature of agency and structure. <span className="font-semibold text-black">Giddens rationalises that both structure and agency should be taken into account at the same time, informing and being informed by the other.</span>
          </p>
          <p className="text-black text-lg leading-relaxed mb-6">
            How does this apply to strategy and delivery?
          </p>
          <p className="text-black text-lg leading-relaxed mb-6">
            Take the idea of structure-macro, enduring, institutional constructs like our values, political systems, educational systems, and economy. I see similarities between &apos;structure&apos; and &apos;strategy&apos;: both are long-term and slower-moving, setting out a course over years.
          </p>
          <p className="text-black text-lg leading-relaxed mb-6">
            I then rationalise a similarity between &apos;agency&apos; and the operational environment; this might be, in a traditional digital program, delivery teams, or in an holistic sense it may be business operations. Either way, <span className="font-semibold text-black">&apos;agency&apos; is understood by Bourdieu as how we perform practice - how we make deliberate action.</span>
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-black text-lg leading-relaxed">
              <span className="font-semibold text-black">Interactive strategy is informed by practice theory. It is the process of ensuring that strategy and action (delivery, operations) work together, continually informing the other.</span>
            </p>
          </div>
          <p className="text-black text-lg leading-relaxed mb-12">
            Traditional strategic documents - discovery reports, digital transformation strategies, concepts of operations, even 2PBCs - are static artefacts. As they aren&apos;t kept up to date, well… they&apos;re as good as the day they&apos;re delivered, and obsolete the next. Especially as our pace of change increases, they lose relevance increasingly quickly - and I ask, then, why is strategy still being projected out years ahead?
          </p>
        </div>

      </section>
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
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";


export default function AgenticAIPage() {
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
          <h1 className="text-4xl font-extrabold mb-2">AI and transformation</h1>
        </div>

        <div className="bg-white/80 border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <p className="text-lg text-gray-600">Agentic AI is not another digital tool. Thanks to advancements in Large Language Models (LLM) and Generative AI (GenAI), we are entering a paradigm shift in the way humans interact with and create value through technology. What an exciting time to be part of digital transformation!</p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">AI</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">Readiness</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Paradigm shift</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Systems thinking</span>
            
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-black mb-6">
            I've been experimenting with and enhancing my work using AgenticAI
          </h1>
          <div className="mt-8 mb-10 space-y-6">
            <p className="text-black text-lg leading-relaxed">
              <strong>This website was built using Generative AI and Agentic AI in just 8 hours.</strong>
            </p>
            <p className="text-black text-lg leading-relaxed">
              For the first time, front-end development is accessible to me. This is the true power of AI: it enhances, accelerates, and removes barriers. Tasks that were once difficult or out of reach are now easier and more streamlined.
            </p>
            <p className="text-black text-lg leading-relaxed">
              I wanted to see if I could build a website using only AI tools. I started with OpenAI's ChatGPT and asked, "I want to build a website, what should I do?" The response guided me through the process, helping me choose the right type of website and next steps.
            </p>
            <p className="text-black text-lg leading-relaxed">
              I am not a coder. I am a service designer, sociologist, and communicator by trade. As a UX designer, I design wireframes in tools like XD and Figma, but I always relied on developers to bring my ideas to life. This handover often took months, and the final product rarely matched my vision.
            </p>
            <p className="text-black text-lg leading-relaxed">
              Thanks to the no-code Copilot AgenticAI engine in Visual Studio Code, anyone can now build a website and write code. We don't need to know the code; we just need the vision (and heck, GenAI can even help us with that).
            </p>
          </div>
        </div>


        {/* Subheading under the body text */}

        {/* Light grey banner section directly under the main body text, truly full width */}
        <div style={{ background: '#eff0f0', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
          <div className="text-center py-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="flex flex-col items-center w-full max-w-md mb-8 md:mb-0">
                <img src="/ai-nesting.svg" alt="AI, Agentic AI, Generative AI, Large Language Model diagram" width={400} height={300} className="w-full rounded-xl" />
                <span className="block text-sm text-gray-600 mt-2 text-center">
                  AI nesting model (adapted from Ranjan et al. <a href="https://doi.org/10.1007/979-8-8688-1542-3_1" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2025</a>).
                </span>
              </div>
              <div className="flex flex-col items-start md:items-start w-full md:max-w-xl">
                <h2 className="text-3xl font-bold text-black mb-8 md:mb-10">What is Agentic AI?</h2>
                <p className="text-lg text-gray-700 text-left">
                  Agentic AI is made possible by the advent of Large Language Models (LLMs) and Generative AI (GenAI). According to Ranjan et al. (<a href="https://doi.org/10.1007/979-8-8688-1542-3_1" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2025</a>), Gen AI represented a shift from static, or processual (inflexible, rigid and so finnicky) automation - exemplified in Robotic Process Automation (RPA) - to a fluid and dynamic approach, enabled by LLM. Agentic AI takes it one step further: by leveraging GenAI, Agentic AI can plan, make decisions, and execute automatically without human intervention.<br /><br />
                  If you're new to AI, I find the nest diagram to the left useful - it shows how LLM informs GenAI, which informs Agentic AI, and that this all is built together to describe AI as a capability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: GenAI vs Agentic AI */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">GenAI vs Agentic AI - what are the differences?</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="w-1/6"></th>
                  <th className="w-5/12 text-xl font-bold text-black p-4">GenAI</th>
                  <th className="w-5/12 text-xl font-bold text-black p-4">Agentic AI</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="bg-transparent text-gray-700 font-semibold p-4">Core Function</td>
                  <td className="bg-[#eff0f0] rounded-l-xl p-4">Generates content (text, images, code, etc.) based on prompts</td>
                  <td className="bg-white rounded-r-xl p-4 border border-gray-200">Acts autonomously to achieve goals</td>
                </tr>
                <tr>
                  <td className="bg-transparent text-gray-700 font-semibold p-4">Technology</td>
                  <td className="bg-[#eff0f0] p-4">Relies on large language models (LLMs) and training data</td>
                  <td className="bg-white p-4 border border-gray-200">Can use GenAI and other tools as part of its workflow</td>
                </tr>
                <tr>
                  <td className="bg-transparent text-gray-700 font-semibold p-4">Autonomy</td>
                  <td className="bg-[#eff0f0] p-4">Does not have goals or autonomy</td>
                  <td className="bg-white p-4 border border-gray-200">Plans, makes decisions, and executes tasks</td>
                </tr>
                <tr>
                  <td className="bg-transparent text-gray-700 font-semibold p-4">Role</td>
                  <td className="bg-[#eff0f0] p-4">Acts as a tool for human creativity and productivity</td>
                  <td className="bg-white p-4 border border-gray-200">Reduces need for human intervention</td>
                </tr>
                <tr>
                  <td className="bg-transparent text-gray-700 font-semibold p-4">Task Handling</td>
                  <td className="bg-[#eff0f0] rounded-bl-xl p-4">Requires human direction for each task</td>
                  <td className="bg-white rounded-br-xl p-4 border border-gray-200">Capable of multi-step reasoning and adaptation</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </section>

        {/* New Section: Add your content below the last grey banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Digital transformation with intelligent automation</h2>
          <p className="text-lg text-gray-700 mb-4">
            Intelligent automation - that transforms how we leverage AI, RPA (taking a generative and a narrow view in how we use AI) - represents a strategic and paradigm shift in how enterprises and people will work and perform action. These advances are <span className="font-semibold">"enabling hyper-personalised services, autonomous decision-making systems and hyperautomation"</span> (Qiu, <a href="https://www.emerald.com/dts/article/4/2/109/1246342/Editorial-Revolutionizing-digital-transformation" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2025</a>).
          </p>
          <h2 className="text-2xl font-semibold text-black mt-8 mb-8">Key considerations</h2>
          <p className="text-lg text-gray-700 mb-4">These are exciting, revolutionary technologies with immense potential; they are new and rapidly evolving. It's tempting to dive in quickly and embrace them wholeheartedly. And while I strongly advocate adoption - it is a strategic imperative for digital transformation -, there are important things to consider as you start this journey.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-10">
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Put people first</h3>
              <p className="text-gray-700">Your people - internal and external stakeholders, and the users of your services - should be core to everything you do. Transformation is successful when it meets the needs of the humans it serves.</p>
              <div className="text-sm text-gray-500 mt-2">
                (Saldhanha <a href="https://learning.oreilly.com/library/view/why-digital-transformations/9781523085361/" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2019</a>; Hardy <a href="https://learning.oreilly.com/library/view/intelligent-automation-in/9798868814259/" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2025</a>)
              </div>
            </div>
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Assess Readiness</h3>
              <p className="text-gray-700">Ensure your organisation is ready to adopt intelligent automation (it might be better off starting small). AI is only as powerful as the data (and APIs) that feed it, and it's no good if people aren't ready to adopt or use these capabilities in practice.</p>
            </div>
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Understand what you want to achieve</h3>
              <p className="text-gray-700">Design systems and processes to support the outcomes you want to achieve - intelligent automation is not an outcome, but a means of getting there. Don't automate for the sake of it.</p>
            </div>
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Manage Change</h3>
              <p className="text-gray-700">Clearly understand how intelligent automation will change how your people work. AI is a powerful collaborator and enhancer, however it will cause displacement and change the very nature of how things are done.</p>
            </div>
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Clear rules and transparency</h3>
              <p className="text-gray-700">Build systems that are fair, transparent, and make it clear who is responsible for decisions. Use tools like explainable AI and clear business rules to help everyone understand how and why decisions are made.</p>
              <div className="text-sm text-gray-500 mt-2">(see Al-Bashrawi et al. <a href="https://wwwproxy1.library.unsw.edu.au/login?url=https://www.proquest.com/scholarly-journals/agentic-ai-systems-future-entrepreneurship/docview/3292745695/se-2?accountid=12763" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2026</a>)</div>
            </div>
            <div className="bg-[#eff0f0] border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-black">Build and maintain trust</h3>
              <p className="text-gray-700">We must be cognisant of how Australians trust and understand how and why their data is used, and is securely stored. While Australians are more trusting than the OECD global average (OECD, <a href="https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/03/drivers-of-trust-in-public-institutions-in-australia_122472c8/28a876c2-en.pdf" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">2025</a>), we must continually invest in systems to maintain data security and public trust. Complacency kills.</p>
            </div>
          </div>
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-black mb-6">References</h2>
            <div className="text-gray-700">
              <div className="mb-2">Al-Bashrawi, M., et al. (2026). <a href="https://wwwproxy1.library.unsw.edu.au/login?url=https://www.proquest.com/scholarly-journals/agentic-ai-systems-future-entrepreneurship/docview/3292745695/se-2?accountid=12763" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Agentic AI Systems: The Future of Entrepreneurship</a>. ProQuest.</div>
              <div className="mb-2">Bornet, P., Barkin, I., & Wirtz, J. (2025). <a href="https://www.goodreads.com/book/show/229111787-agentic-artificial-intelligence" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Agentic Artificial Intelligence</a>. Goodreads.</div>
              <div className="mb-2">Hardy, B. (2025). <a href="https://learning.oreilly.com/library/view/intelligent-automation-in/9798868814259/" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Intelligent Automation in Government</a>. O'Reilly Media.</div>
              <div className="mb-2">OECD (2025). <a href="https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/03/drivers-of-trust-in-public-institutions-in-australia_122472c8/28a876c2-en.pdf" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Drivers of Trust in Public Institutions in Australia</a>. OECD Publishing.</div>
              <div className="mb-2">Qiu, M. (2025). <a href="https://www.emerald.com/dts/article/4/2/109/1246342/Editorial-Revolutionizing-digital-transformation" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Editorial: Revolutionizing digital transformation</a>. Emerald.</div>
              <div className="mb-2">Ranjan, J., et al. (2025). <a href="https://doi.org/10.1007/979-8-8688-1542-3_1" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Agentic AI Systems: The Future of Entrepreneurship</a>. Springer.</div>
              <div className="mb-2">Saldhanha, J. (2019). <a href="https://learning.oreilly.com/library/view/why-digital-transformations/9781523085361/" className="underline hover:text-[#1db6ac] focus:text-[#1db6ac]" target="_blank" rel="noopener noreferrer">Why Digital Transformations Fail: The Surprising Disciplines of How to Take Off and Stay Ahead</a>. O'Reilly Media.</div>
            </div>
          </section>
        </section>
      </section>
      {/* Add additional sections or service catalogue as needed, following the Interactive Strategy page structure */}
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

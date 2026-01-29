'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'



export default function Home() {
  const imageRef = useRef(null);
  const [scale, setScale] = useState(1.2);
  const [hovered, setHovered] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [aboutImageVisible, setAboutImageVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutImageVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentAboutImageRef = aboutImageRef.current;
    if (currentAboutImageRef) {
      observer.observe(currentAboutImageRef);
    }

    return () => {
      if (currentAboutImageRef) {
        observer.unobserve(currentAboutImageRef);
      }
    };
  }, []);

  const handleImageClick = () => {
    setScale(scale <= 1.2 ? 1.8 : 1.2);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .pre-animate {
            opacity: 0;
          }
          .hero-animate {
          animation: slideInRight 1s ease-out forwards;
        }
      `}</style>
      {/* Navigation is now provided globally via layout */}

      {/* Hero Section */}
      <section className="bg-white text-blue-900 pt-16">
        <div className="relative h-[30rem] sm:h-[36rem] bg-white">
          <img src="/kj-banner-2.jpg" alt="Kristyn Jackson banner" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>
          <div className="relative h-full">
            <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
              <div ref={heroRef} className={`text-left text-white ${heroVisible ? 'hero-animate' : 'opacity-0'}`}>
                <img src="/kj-logo-white.png" alt="KJ Design" className="mb-4 drop-shadow-lg -ml-8" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
                <p className="text-2xl md:text-4xl font-semibold mb-8 text-white font-montserrat"><span className="font-extrabold">Interactive strategist</span><br /><span className="font-semibold"> &amp; creative thinker.</span></p>
                <div className="mt-8 flex justify-start space-x-4">
                  <a href="#about" className="btn-primary no-underline transform transition-transform duration-200 hover:scale-105">
                    About
                  </a>
                  <a href="#ideas" className="btn-primary no-underline transform transition-transform duration-200 hover:scale-105">
                    Ideas
                  </a>
                </div>
              </div>
                {/* Email removed from header banner as requested */}
            </div>
            {/* Arrow to About */}
            <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-80 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 drop-shadow">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v12.19l4.47-4.47a.75.75 0 111.06 1.06l-5.75 5.75a.75.75 0 01-1.06 0l-5.75-5.75a.75.75 0 111.06-1.06l4.47 4.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-36 bg-white">
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .pre-animate {
            opacity: 0;
          }
          .hero-animate {
            animation: slideInRight 1s ease-out forwards;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center">
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div ref={aboutImageRef}>
              <img 
                ref={imageRef}
                src="/iso-1.png" 
                alt="Kristyn Jackson" 
                width={600} height={600}
                className={`max-w-none w-[120%] h-auto object-contain -ml-[10vw] md:-ml-[15vw] lg:-ml-[18vw] cursor-pointer transition-transform duration-300 hover:scale-110${aboutImageVisible ? ' hero-animate' : ' pre-animate'}`}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: `scale(${scale}) translateX(${hovered ? '10px' : '0px'})`
                }}
                onClick={handleImageClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </div>
            <div className="p-6 md:p-8 md:pl-10 lg:pl-16">
              <p className="text-black text-lg leading-relaxed">
                I&apos;m Kristyn Jackson, better known as KJ. <span className="font-semibold text-black">I&apos;m an interactive strategist.</span>
              </p>
              <p className="text-black text-lg leading-relaxed mt-4">
                What exactly does that mean? It means <span className="font-semibold">I make strategy work - ensuring it really resonates with people.</span> Strategy that remains relevant, is understood, adopted and drives real transformation at every stage.
              </p>
              <div className="mt-12">
                <a href="/about" className="btn-primary no-underline transform transition-transform duration-200 hover:scale-105">
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="client-work" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Client work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/AMSA logo.png" alt="AMSA" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/daff logo.png" alt="DAFF" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/AEC.jpg" alt="AEC" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/smartraveller.png" alt="Smartraveller" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/services-australia.jpg" alt="Services Australia" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/USI logo.png" alt="USI" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
                <img loading="lazy" src="/finance logo.png" alt="Finance" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
              <img loading="lazy" src="/ethan.png" alt="ETHAN" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
            <div className="bg-white p-3 flex items-center justify-center">
                <img loading="lazy" src="/dva.png" alt="DVA" className="object-contain" style={{ maxWidth: '160px', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Section */}
      <section id="ideas" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Ideas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="/ideas/interactive-strategy" className="block bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300 no-underline">
              <img loading="lazy" src="/interactive-strategy-pic.jpg" alt="Idea 1" width={400} height={192} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2 transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">Interactive Strategy</h3>
                <p className="text-black mb-4">Ensuring strategy remains up-to-date and resonates with people throughout the transformation journey</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Service Design</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Systems Thinking</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Enterprise Architecture</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Change Management</span>
                </div>
                <span className="text-black font-medium transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">Explore Idea &rarr;</span>
              </div>
            </a>
            <a href="/ideas/intelligent-automation" className="block bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300 no-underline">
              <img loading="lazy" src="/Agentic-AI.jpg" alt="Agentic AI" width={400} height={192} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2 transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">AI and transformation</h3>
                <p className="text-black mb-4">Exploring intelligent automation (Agentic AI and GenAI) and what this means for (digital) transformation</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">AI</span>
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-sm">Readiness</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Paradigm shift</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Systems thinking</span>
                </div>
                <span className="text-black font-medium transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">Explore Idea &rarr;</span>
              </div>
            </a>
            <a href="/ideas/working-in-practice" className="block bg-gray-50 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300 no-underline">
              <img loading="lazy" src="/structure-agency.png" alt="Working in practice" width={400} height={192} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2 transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">Working in practice</h3>
                        <p className="text-black mb-4">Interactive strategy is grounded in practice theory. It'not new, it just hasn'been applied to digital transformation</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Sociology</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Systems Thinking</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Strategy</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Structure</span>
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-sm">Agency</span>
                </div>
                <span className="text-black font-medium transition-transform duration-200 hover:scale-105 hover:text-[#1db6ac]">Explore Idea &rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-8 pb-8 bg-gradient-to-r from-[#5f5e5c] to-[#6a6665] text-white mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-white">Reach me</h2>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="space-y-4">
              <p className="flex items-center">
                <img src="/location.svg" alt="Location" width={24} height={24} className="mr-3 h-6 w-6" />
                Canberra, Melbourne, AUS
              </p>
              <p className="flex items-center mt-2">
                <a href="mailto:kj@kjinteactive.com" className="mr-3 h-6 w-6 flex items-center justify-center group" aria-label="Email KJ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-white group-hover:text-[#90f4ea] group-focus:text-[#90f4ea] transition-colors duration-200 transition-transform duration-200 group-hover:scale-110 group-focus:scale-110">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75" />
                  </svg>
                </a>
                <a href="mailto:kj@kjinteactive.com" className="tracking-wider text-white hover:text-[#90f4ea] focus:text-[#90f4ea] no-underline transition-transform duration-200 hover:scale-105">kj@kjinteactive.com</a>
              </p>
              <a href="https://www.linkedin.com/in/kristyn-jackson-42240b9a/" target="_blank" rel="noopener noreferrer" className="flex items-center mt-2">
                <span className="mr-3 h-6 w-6 flex items-center justify-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white hover:text-[#90f4ea] focus:text-[#90f4ea] transition-colors duration-200 transition-transform duration-200 group-hover:scale-110 group-focus:scale-110">
                    <path d="M12.001 4.529c2.349-2.532 6.15-2.532 8.499 0 2.338 2.52 2.355 6.607.035 9.146l-7.073 7.457a1.25 1.25 0 01-1.824 0l-7.073-7.457c-2.32-2.539-2.303-6.626.035-9.146 2.349-2.532 6.15-2.532 8.499 0z" />
                  </svg>
                </span>
                <span className="text-white hover:text-[#90f4ea] focus:text-[#90f4ea] transition-transform duration-200 hover:scale-105" style={{ textDecoration: 'none' }}>LinkedIn</span>
              </a>
              </div>
            </div>
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
    </div>
  );
}



















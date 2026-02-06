"use client";
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState, useRef } from 'react';


export default function AboutPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);
  const bannerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          setBannerVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const currentBannerRef = bannerRef.current;
    if (currentBannerRef) {
      observer.observe(currentBannerRef);
    }
    return () => {
      if (currentBannerRef) {
        observer.unobserve(currentBannerRef);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const currentImageRef = imageRef.current;
    if (currentImageRef) {
      observer.observe(currentImageRef);
    }
    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
    };
  }, []);

  return (
    <main className="bg-white min-h-screen pt-20 sm:pt-24 pb-0">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div ref={imageRef} className={`flex md:justify-start justify-center mt-8 md:mt-20 ${imageVisible ? 'banner-animate' : 'opacity-0'}`}>
            <img 
              src="/kj-about-3.jpg"
              alt="Kristyn Jackson"
              width={256} height={256}
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-xl md:scale-[1.75]"
              style={{ objectPosition: 'center 75%' }}
            />
          </div>

          <div className="p-4 sm:p-6 md:p-8 md:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8">About me</h1>
            <p className="text-black text-base sm:text-lg leading-relaxed">
              I&apos;m Kristyn Jackson, better known as KJ. <span className="font-semibold text-black">I&apos;m an interactive strategist.</span>
            </p>
            <p className="text-black text-base sm:text-lg leading-relaxed mt-4">
              What exactly does that mean? It means I make strategy work - ensuring it really resonates with people. <span className="font-semibold text-black">Strategy that remains relevant, is understood, adopted and drives real transformation at every stage.</span>
            </p>
            <p className="text-black text-base sm:text-lg leading-relaxed mt-4">
              How do I do it? I leverage my decade of experience in large-scale digital transformation, service design, systems thinking, and architecture. I&apos;m a certified <span className="font-semibold text-black">"wicked problem critical thinker"</span> and expert <span className="font-semibold text-black">"we needed this yesterday"</span> deliverer.
            </p>
            <p className="text-black text-base sm:text-lg leading-relaxed mt-4">
              I've been privileged to work on some of our generation's biggest transformation programs, and have seen my ideas come to life to transform how people access service.
              <span className="block w-full mt-4 flex justify-center">
                <a href="#experience" aria-label="Scroll to My experience" className="group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#24658f] opacity-80 drop-shadow group-hover:text-[#1db6ac] transition-colors duration-200">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v12.19l4.47-4.47a.75.75 0 111.06 1.06l-5.75 5.75a.75.75 0 01-1.06 0l-5.75-5.75a.75.75 0 111.06-1.06l4.47 4.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mt-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-black text-center mt-8 sm:mt-12">My experience</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* UNSW Card */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-white p-6 flex flex-col items-center">
            <div className="h-28 w-28 flex items-center justify-center" style={{ background: '#eff0f0', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <img src="/unsw-agsm.webp" alt="UNSW AGSM" style={{ maxWidth: '60px', height: 'auto', display: 'block' }} className="object-contain" />
            </div>
            <div className="w-full">
              <p className="text-sm text-black text-center">Studying Digital Transformation, Digital Innovation, Corporate Innovation at the Australian Graduate School of Management</p>
            </div>
          </div>
          {/* Accenture Card */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-white p-6 flex flex-col items-center">
            <div className="h-28 w-28 flex items-center justify-center" style={{ background: '#eff0f0', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <img src="/accenture.png" alt="Accenture" style={{ maxWidth: '72px', height: 'auto', display: 'block' }} className="object-contain" />
            </div>
            <div className="w-full">
              <p className="text-sm text-black text-center">Experienced leading critical components of digital transformation programs, including 2PBCs, Concepts of Operations, Blueprinting, Executive Comms.</p>
            </div>
          </div>
          {/* NTT Card */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-white p-6 flex flex-col items-center">
            <div className="h-28 w-28 flex items-center justify-center" style={{ background: '#eff0f0', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <img src="/ntt-logo.png" alt="NTT" style={{ maxWidth: '72px', height: 'auto', display: 'block' }} className="object-contain" />
            </div>
            <div className="w-full">
              <p className="text-sm text-black text-center">Lead designer for program-level Discovery, leading MDTs to support whole of government strategy</p>
            </div>
          </div>
          {/* Government Card */}
          <div className="rounded-3xl shadow-sm overflow-hidden bg-white p-6 flex flex-col items-center">
            <div className="h-28 w-28 flex items-center justify-center" style={{ background: '#eff0f0', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <img src="/gov-logo.png" alt="Government" style={{ maxWidth: '80px', height: 'auto', display: 'block' }} className="object-contain" />
            </div>
            <div className="w-full">
              <p className="text-sm text-black text-center">Expert understanding and experience supporting digital transformation, as a strategic advisor, service designer, and collaborator.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={bannerRef} id="banner" className={`relative min-h-screen bg-gradient-to-r from-[#eff0f0] to-[#eff0f0] flex items-center justify-start pt-12 sm:pt-16 pb-12 sm:pb-16 mb-0 w-full mt-16 sm:mt-24 shadow-2xl ${bannerVisible ? 'banner-animate' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full sm:pl-16 md:pl-24 lg:pl-48">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black mb-8 sm:mb-16 max-w-3xl">
            Hello, practice theory and social transformation.
          </h3>
          <div className="text-black text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 max-w-3xl">
            <p className="text-black">
              Before I went into consulting, I was a researcher at the University of Canberra. A grad student with dreams of making an impact.
            </p>
            <p className="text-black">
              My area of research? <span className="font-semibold text-black">I am a <a href="https://www.sciencedirect.com/topics/social-sciences/practice-theory" target="_blank" rel="noopener noreferrer" className="text-black underline">practice theorist</a></span>: I believe it is only through action (human or otherwise), materials, and context that transformation takes place. That is to say… <em className="font-semibold text-black">strategy is only as good as how it translates to reality!</em>
            </p>
            <p className="text-black">
              For years, I looked deeply into how people access services. I was found in the library and connecting with international experts in sociology and service management. Why? I wanted to truly understand how to fundamentally help vulnerable Australians achieve better outcomes. I wanted to make Australia&apos;s social service system better - <span className="font-semibold text-black">more intuitive, tailored, human.</span>
            </p>
            <p className="text-black">
              <span className="font-semibold text-black">This drives my impetus and everything I do.</span> This drive is intrinsic - today, I&apos;m in consulting for the same reason; I want to understand, and I want to effect real change.
            </p>
            <p className="italic text-sm text-black">
              (If you&apos;re also a nerd, please look up <a href="https://www.goodreads.com/book/show/212957.Outline_of_a_Theory_of_Practice" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-[#1db6ac]">Pierre Bourdieu</a>).
            </p>
          </div>
        </div>
      </section>
      {/* Scroll to top button - always visible for testing */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-400 to-teal-500 text-white p-3 rounded-full shadow-lg hover:from-blue-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M12 4a.75.75 0 01.53.22l5.25 5.25a.75.75 0 11-1.06 1.06L12.75 6.59V20a.75.75 0 01-1.5 0V6.59L7.28 10.53a.75.75 0 11-1.06-1.06L11.47 4.22A.75.75 0 0112 4z" clipRule="evenodd" />
        </svg>
      </button>
      <style jsx global>{`
        a:hover {
          color: #1db6ac !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .banner-animate {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

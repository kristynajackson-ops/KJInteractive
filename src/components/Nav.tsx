'use client'

import { useState } from 'react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition duration-300 no-underline group">
              <img src="/kj-logo-black.png" alt="KJ Design" className="h-10 sm:h-12 w-auto transition-transform duration-200 group-hover:scale-110" />
            </a>
          </div>
          
          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1db6ac] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1db6ac]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 h-full">
            <a href="/about" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-3 lg:px-4 py-2">
                About
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#client-work" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-3 lg:px-4 py-2">
                Client work
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#ideas" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-3 lg:px-4 py-2">
                Ideas
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/strategy-interactive" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-3 lg:px-4 py-2 text-sm lg:text-base">
                Strategy Interactive
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
            <a href="/#contact" className="group text-gray-700 transition duration-300 no-underline font-semibold relative h-full flex items-stretch">
              <span className="group-hover:bg-[#eff0f0] group-hover:text-[#1db6ac] w-full h-full transition-colors duration-200 block relative flex items-center justify-center px-3 lg:px-4 py-2">
                Reach me
                <span className="w-full absolute left-0 bottom-0 h-1 bg-[#1db6ac] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          <a href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold hover:bg-[#eff0f0] hover:text-[#1db6ac] rounded-md no-underline transition-colors duration-200">
            About
          </a>
          <a href="/#client-work" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold hover:bg-[#eff0f0] hover:text-[#1db6ac] rounded-md no-underline transition-colors duration-200">
            Client work
          </a>
          <a href="/#ideas" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold hover:bg-[#eff0f0] hover:text-[#1db6ac] rounded-md no-underline transition-colors duration-200">
            Ideas
          </a>
          <a href="/strategy-interactive" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold hover:bg-[#eff0f0] hover:text-[#1db6ac] rounded-md no-underline transition-colors duration-200">
            Strategy Interactive
          </a>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 font-semibold hover:bg-[#eff0f0] hover:text-[#1db6ac] rounded-md no-underline transition-colors duration-200">
            Reach me
          </a>
        </div>
      </div>
    </nav>
  );
}

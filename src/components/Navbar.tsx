'use client';

import React, { useState, useEffect, useRef } from 'react';
import logoLight from '/Logo-light.png';
import logoDark from '/Logo-dark.png';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Refs for outside click detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Slider pill styles
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  // Track scrolling to toggle thin/glass state & floating card layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track hover dimensions for sliding menu pill
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const container = target.parentElement;
    if (container) {
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        opacity: 1,
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
      });
    }
  };

  const handleMouseLeave = () => {
    setPillStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  const triggerScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-100 transition-all duration-500 flex justify-center px-4 ${
          isScrolled ? 'pt-4 pb-0' : 'pt-0'
        }`}
      >
        <div 
          className={`w-full max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'py-2 bg-white/80 dark:bg-[#07050a]/75 backdrop-blur-md border border-slate-200/60 dark:border-purple-500/10 rounded-full shadow-lg shadow-slate-900/5'
              : 'py-5 bg-transparent border-b border-transparent'
          }`}
        >
          
          {/* Logo Section */}
          <a
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Monexa Healthtech Homepage"
          >
            <div className={`relative flex items-center justify-center p-1 rounded-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-transparent' : 'bg-transparent'
            }`}>
              <img 
                src={isDarkMode ? logoDark : logoLight} 
                alt="Monexa Logo" 
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </a>

          {/* Desktop Nav Center Menu */}
          <nav 
            className="hidden md:flex items-center gap-1 relative px-1 py-1 rounded-full bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-800/30 backdrop-blur-sm"
            onMouseLeave={handleMouseLeave}
          >
            {/* Sliding Pill Indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white dark:bg-purple-950/40 shadow-sm border border-slate-200/40 dark:border-purple-500/10 pointer-events-none"
              style={pillStyle}
            />
            
            {/* Product Trigger - Opens via Hover or Click */}
            <div 
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={(e) => {
                handleMouseEnter(e);
                setIsProductDropdownOpen(true);
              }}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <button
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[14px] font-semibold text-black dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition duration-300 cursor-pointer focus:outline-none"
              >
                Product
                <svg
                  className={`w-3.5 h-3.5 opacity-60 transition-all duration-300 ${isProductDropdownOpen ? 'rotate-180 opacity-100' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Box */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-110 p-5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/60 dark:border-purple-500/10 rounded-2xl shadow-2xl transition-all duration-300 z-50 ${
                  isProductDropdownOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
              >
                <div className="flex flex-col gap-4 text-left">
                  <span className="px-2 py-1 text-[10px] rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30 w-fit">
                    PRODUCT
                  </span>

                  {/* Clickable Card Link jumping directly to section on page */}
                  <button 
                    onClick={() => triggerScrollTo('product')}
                    className="group/item text-left w-full p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-200 focus:outline-none bg-transparent border-none cursor-pointer"
                  >
                    <h5 className="font-bold text-slate-900 dark:text-white text-base group-hover/item:text-cyan-500 dark:group-hover/item:text-purple-400 transition-colors duration-100">
                      MONA Radiology &rarr;
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      MONA Radiology is being developed to support clinical imaging workflows through structured processing systems, intelligent analysis assistance, and workflow-focused design.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); triggerScrollTo('about'); }}
              onMouseEnter={(e) => handleMouseEnter(e)}
              className="px-4 py-1.5 z-10 rounded-full text-[14px] font-semibold text-black dark:text-slate-300 hover:text-black dark:hover:text-white transition duration-300 cursor-pointer focus:outline-none"
            >
              About
            </a>

            {/* Contact */}
            <button
              onClick={() => triggerScrollTo('contact')}
              onMouseEnter={handleMouseEnter}
              className="px-4 py-1.5 z-10 rounded-full text-[14px] font-semibold text-black dark:text-slate-300 hover:text-black dark:hover:text-white transition duration-300 cursor-pointer focus:outline-none"
            >
              Contact
            </button>
          </nav>

          {/* Right Area CTA & Utilities */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Theme Toggle Switch */}
            <button
              onClick={onToggleTheme}
              type="button"
              className="p-2 rounded-full border border-slate-200/80 dark:border-purple-500/20 bg-slate-100/55 dark:bg-purple-950/20 text-slate-800 dark:text-purple-300 hover:bg-slate-200/80 dark:hover:bg-purple-950/40 transition duration-300 cursor-pointer flex items-center justify-center shadow-sm relative overflow-hidden group focus:outline-none"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative w-4 h-4 transition-transform duration-500 group-hover:rotate-30">
                {isDarkMode ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.3 22c5.02 0 9.1-4.08 9.1-9.1 0-4.07-2.67-7.53-6.39-8.72-.49-.16-.98.24-.86.73.9 3.65-.16 7.43-2.92 10.19-2.76 2.76-6.54 3.82-10.19 2.92-.49-.12-.89.37-.73.86C2.47 19.33 5.93 22 10 22c.78 0 1.55-.09 2.3-.2z"/>
                  </svg>
                )}
              </div>
            </button>

            {/* Premium CTA Request Demo */}
            <button
              onClick={() => triggerScrollTo('contact')}
              className="group relative inline-flex items-center justify-center px-5 py-4 rounded-full font-dm-sans font-semibold text-sm text-white overflow-hidden bg-linear-to-r from-cyan-600 via-teal-500 to-indigo-600 dark:from-purple-600 dark:via-pink-500 dark:to-blue-600 shadow-md transition-all duration-300 hover:scale-[1.03] cursor-pointer focus:outline-none border-none"
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-1">
                Request Demo
                <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Hamburg Trigger */}
          <div className="md:hidden flex items-center gap-2">
            {!isMobileMenuOpen && (
              <button
                onClick={onToggleTheme}
                type="button"
                className="p-2 rounded-full border border-slate-200/80 dark:border-purple-500/20 bg-slate-100/55 dark:bg-purple-950/20 text-slate-800 dark:text-purple-300 hover:bg-slate-200/80 dark:hover:bg-purple-950/40 transition duration-300 cursor-pointer flex items-center justify-center shadow-sm focus:outline-none"
                aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.3 22c5.02 0 9.1-4.08 9.1-9.1 0-4.07-2.67-7.53-6.39-8.72-.49-.16-.98.24-.86.73.9 3.65-.16 7.43-2.92 10.19-2.76 2.76-6.54 3.82-10.19 2.92-.49-.12-.89.37-.73.86C2.47 19.33 5.93 22 10 22c.78 0 1.55-.09 2.3-.2z"/>
                  </svg>
                )}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-purple-300 bg-slate-100/50 dark:bg-purple-950/20 border border-slate-200/50 dark:border-purple-500/10 focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <svg className="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      <div
        className={`fixed inset-0 z-[120] bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          ref={mobileMenuRef}
          className={`absolute inset-0 h-full w-full bg-white dark:bg-[#0b0813] p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-purple-950/30">
              <span className="font-extrabold text-slate-900 dark:text-white">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-purple-950/30"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col gap-4">
              <div className="flex flex-col">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
                  className="flex items-center justify-between py-2 text-left text-base font-bold text-slate-800 dark:text-slate-200 border-none bg-transparent cursor-pointer"
                >
                  <span>Product</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'product' ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {activeDropdown === 'product' && (
                  <div className="mt-2 pl-4 flex flex-col gap-3 border-l-2 border-cyan-500/30 dark:border-purple-500/30">
                    <button
                      onClick={() => triggerScrollTo('product')}
                      className="py-1.5 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-purple-400 bg-transparent border-none cursor-pointer"
                    >
                      MONA Radiology
                    </button>
                  </div>
                )}
              </div>

              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); triggerScrollTo('about'); }}
                className="py-2 text-base font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-purple-400"
              >
                About
              </a>

              <button
                onClick={() => triggerScrollTo('contact')}
                className="py-2 text-left text-base font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-purple-400 border-none bg-transparent cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Bottom Action for Mobile */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => { setIsMobileMenuOpen(false); triggerScrollTo('contact'); }}
              className="w-full py-3.5 text-center font-bold text-sm text-white rounded-xl bg-linear-to-r from-cyan-600 to-teal-500 dark:from-purple-600 dark:to-blue-600"
            >
              Request Demo
            </button>
            <div className="text-center text-[10px] text-slate-400 dark:text-slate-600">
              &copy; {new Date().getFullYear()} Monexa Healthtech
            </div>
          </div>
        </div>
      </div>

      {/* Custom Floating Modal: Request Demo */}
    </>
  );
};

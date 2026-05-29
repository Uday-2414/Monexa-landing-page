import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionSection from './components/SolutionSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Orb from './components/Orb';

function App() {
  // Global theme state defaulting to light theme to match the reference image
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sync isDarkMode state with the <html> classList for Tailwind v4 utility classes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#07050a] text-slate-800 dark:text-slate-100 overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* Visual Accent Glow Bubbles (Only active in dark mode to preserve pure white background in light mode) */}
      <div className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] bg-transparent dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300" />
      <div className="absolute top-[20%] right-[5%] w-[45vw] h-[45vw] bg-transparent dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-[10%] left-[15%] w-[50vw] h-[50vw] bg-transparent dark:bg-teal-900/10 rounded-full blur-[150px] pointer-events-none transition-colors duration-300" />

      {/* Premium responsive navbar with dynamic light/dark support */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Orb animation — positioned to sit right below navbar, centered, large circle behind hero */}
      {isDarkMode && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-205 h-205 z-0 pointer-events-none opacity-45 mix-blend-normal transition-opacity duration-300 max-w-[95vw] max-h-[95vw]">
          <Orb
            hoverIntensity={3.0}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
            backgroundColor="#07050a"
          />
        </div>
      )}

      {/* Core Landing Page Modules */}
      <Hero isDarkMode={isDarkMode} onContactClick={scrollToContact} />
      <ProblemStatement />
      <SolutionSection onContactClick={scrollToContact} />
      <AboutSection />
      <ContactSection />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;

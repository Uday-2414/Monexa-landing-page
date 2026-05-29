import { motion } from 'framer-motion';
import { SVGFollower } from '@/components/ui/svg-follower';

interface HeroProps {
  isDarkMode: boolean;
  onContactClick?: () => void;
}

const Hero = ({ isDarkMode, onContactClick }: HeroProps) => {
  return (
    <header className="relative overflow-hidden bg-white px-6 pb-20 pt-36 transition-colors duration-300 dark:bg-[#07050a]">
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute left-[-5%] top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-[30%] h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/5 blur-[180px]" />
      </div>
      <SVGFollower active={!isDarkMode} />

      <motion.div
        className="relative mx-auto flex max-w-7xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >

      {/* Main Title */}
      <motion.h1
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] dark:text-white max-w-4xl leading-[1.15] mb-6 mt-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      >
        AI-assisted radiology workflows built for{' '}
        <span className="bg-linear-to-r from-teal-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent font-cormorant-garamond font-bold italic dark:from-purple-400 dark:to-pink-400">
          real clinical environments.
        </span>
      </motion.h1>
      
      {/* Subtitle description */}
      <motion.p
        className="relative z-10 text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        MONA Radiology streamlines medical imaging workflows through DICOM-based processing,
        AI-assisted analysis, and structured findings generation designed to support clinical decision-making.
      </motion.p>

      {/* Hero Buttons (CTAs) */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
      >
        <button onClick={onContactClick} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#009bb4] hover:bg-[#008aa3] dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-[#009bb4]/10 dark:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2">
          Request Demo
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button onClick={onContactClick} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2">
          {/* Document Icon */}
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Learn More
        </button>
      </motion.div>

      </motion.div>
    </header>
  );
};

export default Hero;

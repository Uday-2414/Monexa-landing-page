'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import {
  BrainCircuit,
  Database,
  Activity,
  Workflow,
  Microscope,
  FileText,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

// Register GSAP Plugin safely for Next.js/SSR environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilities = [
  {
    index: 1,
    title: 'Clinical Imaging Support',
    description:
      'Designed to support radiology workflows through structured imaging analysis and intelligent processing assistance.',
    icon: BrainCircuit,
    tag: 'Core Engine',
    highlight: 'Real-time AI assistance',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&fit=crop',
    accent: '#06b6d4',
  },
  {
    index: 2,
    title: 'DICOM-Compatible Infrastructure',
    description:
      'Full DICOM compliance means zero friction with existing PACS, RIS, and modality systems.',
    icon: Database,
    tag: 'Infrastructure',
    highlight: 'Zero-friction integration',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&fit=crop',
    accent: '#14b8a6',
  },
  {
    index: 3,
    title: 'AI-Assisted Analysis',
    description:
      'Supports imaging interpretation workflows through assistive analysis systems.',
    icon: Activity,
    tag: 'Intelligence',
    highlight: '98.4% accuracy rate',
    image:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80&fit=crop',
    accent: '#0ea5e9',
  },
  {
    index: 4,
    title: 'Workflow-Focused Design',
    description:
      'Every interaction is optimized for the radiology reading room environment.',
    icon: Workflow,
    tag: 'Usability',
    highlight: 'Built for radiologists',
    image:
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80&fit=crop',
    accent: '#06b6d4',
  },
  {
    index: 5,
    title: 'Research-Driven Development',
    description:
      'Actively developed through ongoing clinical research partnerships.',
    icon: Microscope,
    tag: 'Research',
    highlight: 'Evidence-based features',
    image:
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&q=80&fit=crop',
    accent: '#14b8a6',
  },
  {
    index: 6,
    title: 'Intelligent Reporting Assistance',
    description:
      'Structured reporting and one-click generation improve workflow speed.',
    icon: FileText,
    tag: 'Reporting',
    highlight: '40% faster turnaround',
    image:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&fit=crop',
    accent: '#0ea5e9',
  },
];

export default function SolutionSection({ onContactClick }: { onContactClick?: () => void }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card-gsap');
    
    cards.forEach((card, i) => {
      // 1. Pin card in place smoothly upon entering viewport track
      ScrollTrigger.create({
        trigger: card,
        start: `top top+=${80 + i * 20}px`, // Beautiful visible top stack tabs
        endTrigger: containerRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false, // Allows subsequent cards to slide up over it smoothly
        anticipatePin: 1,  // Avoids sub-pixel layout jumps on fast scrolls
      });

      // 2. Elegant, subtle scale depth when NEXT card scrolls over it (No darkening filters!)
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.96, // Slight reduction just for a natural card stack aesthetic
          transformOrigin: 'top center',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top center',
            scrub: 1, // Creates a silky 1-second catchup interpolation when moving to and fro
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-white px-6 py-28 transition-colors duration-300 dark:bg-[#07050a]"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-10%] top-[10%] h-125 w-125 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />
        <div className="absolute bottom-0 right-[-10%] h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/20" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HERO SECTION */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-[11px] font-dm-sans uppercase tracking-[0.24em] text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
              MONA RADIOLOGY
            </div>

            <h2 className="mt-8 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-[3.5rem] dark:text-white">
              Built to support
              <br />
              modern radiology
              <span className="block bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text font-cormorant-garamond italic text-transparent">
                workflows.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                MONA Radiology supports clinical imaging
                workflows through structured processing
                systems and intelligent workflow assistance.
              </p>
              <p>
                Designed to improve workflow organization
                and diagnostic operations.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                onClick={onContactClick}
                size="lg"
                className="rounded-full border-0 bg-linear-to-r from-cyan-500 to-teal-500 px-8 text-white shadow-[0_8px_30px_rgba(6,182,212,0.35)]"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={onContactClick}
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-black"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[3rem]" />
              <div
                className="relative overflow-hidden rounded-4xl border border-slate-200/80 dark:border-slate-700/60"
                style={{ width: '330px', aspectRatio: '10 / 16' }}
              >
                <video
                  src="/Vid.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 mt-40 text-center"
        >
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-5 py-2 text-[11px] font-dm-sans uppercase tracking-[0.24em] text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
            Capabilities
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white md:text-5xl">
            Everything you need,
            <span className="bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text font-cormorant-garamond italic text-transparent">
              {' '}
              nothing you don't.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Six core capabilities designed to align with
            every step of the radiology workflow.
          </p>
        </motion.div>
      </div>

      {/* ULTRA-SMOOTH STACKING CONTAINER */}
      <div 
        ref={containerRef}
        className="relative mx-auto max-w-6xl space-y-[25vh] pb-[15vh]"
      >
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.title}
              className="card-gsap w-full will-change-transform"
            >
              <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#0B1220] dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
                <div className="grid h-190px md:min-h-135 grid-cols-1 md:grid-cols-2">
                  
                  {/* LEFT TEXT PANEL */}
                  <div className="relative flex flex-col justify-center px-4 py-5 md:px-12 md:py-14">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{ background: `radial-gradient(circle at top left, ${cap.accent}30, transparent 50%)` }}
                    />
                    <div
                      className="relative mb-3 md:mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-dm-sans uppercase tracking-[0.22em]"
                      style={{ borderColor: `${cap.accent}40`, backgroundColor: `${cap.accent}10`, color: cap.accent }}
                    >
                      <Icon className="h-3 w-3" strokeWidth={2.5} />
                      {cap.tag}
                    </div>

                    <p className="mb-2 md:mb-3 text-[11px] font-dm-sans uppercase tracking-[0.2em] text-slate-400">
                      {String(cap.index).padStart(2, '0')} / {String(capabilities.length).padStart(2, '0')}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-950 dark:text-white md:text-[2.4rem]">
                      {cap.title}
                    </h3>

                    <div className="my-3 md:my-5 flex items-center gap-1 md:gap-2">
                      <CheckCircle2 className="h-4 w-4" style={{ color: cap.accent }} />
                      <span className="text-sm font-semibold" style={{ color: cap.accent }}>
                        {cap.highlight}
                      </span>
                    </div>

                    <p className="text-[12px] md:text-[15px] leading-[1.8] text-slate-500 dark:text-slate-400">
                      {cap.description}
                    </p>

                    <div className="mt-4 md:mt-8">
                      <button
                        onClick={onContactClick}
                        className="group flex items-center gap-2 rounded-full px-3 py-2 md:px-6 md:py-3 text-sm font-dm-sans text-white transition-all duration-500 hover:gap-4"
                        style={{ background: cap.accent }}
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* RIGHT IMAGE PANEL */}
                  <div className="relative h-[220px] md:h-full overflow-hidden">
                    <motion.img
                      src={cap.image}
                      alt={cap.title}
                      initial={{ scale: 1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-contain md:object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${cap.accent}20 0%, transparent 60%)` }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                    >
                      <p className="text-xs md:text-[10px] font-dm-sans uppercase tracking-widest text-white/70">
                        {cap.tag}
                      </p>
                      <p className="mt-1 text-sm md:text-lg font-dm-sans text-white">
                        {cap.highlight}
                      </p>
                    </motion.div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[10vh]" />
    </section>
  );
}
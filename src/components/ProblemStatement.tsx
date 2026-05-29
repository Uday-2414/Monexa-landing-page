'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock3, Network, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── FeatureCard component (inline) ───────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, className, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
      className={cn(
        'p-8 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2',
        'border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
        className
      )}
    >
      {/* Icon container */}
      <div className="mb-6 bg-secondary p-4 rounded-full dark:bg-purple-950/50">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 tracking-tight text-slate-950 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    icon: <Clock3 className="h-10 w-10 text-cyan-500" strokeWidth={1.5} />,
    title: 'Delayed Reporting',
    description:
      'Growing imaging volumes increase reporting pressure and turnaround times.',
  },
  {
    icon: <Network className="h-10 w-10 text-cyan-500" strokeWidth={1.5} />,
    title: 'Fragmented Systems',
    description:
      'Many imaging and AI systems operate separately from existing workflows.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-cyan-500" strokeWidth={1.5} />,
    title: 'Workflow Fatigue',
    description:
      'Radiologists spend significant time managing repetitive processes instead of focused interpretation.',
  },
];

// ─── Container animation ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProblemStatement() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 transition-colors duration-300 dark:bg-[#07050a]">
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_20%)] pointer-events-none" />
      <div className="mx-auto relative max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center"
        >
          <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white">
            Modern radiology workflows face
            <br />
            increasing{' '}
            <span className="bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text font-cormorant-garamond italic text-transparent dark:from-purple-400 dark:to-pink-400">
              operational pressure.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-[22px] leading-[1.6] text-slate-500 dark:text-slate-400">
            From delayed reporting to fragmented systems,
            <br />
            these challenges impact efficiency and patient care.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto my-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {cards.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants}>
              <FeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
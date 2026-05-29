'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-28 bg-white dark:bg-[#07050a] transition-colors duration-300"
    >
      {/* Ambient background glows - Visible ONLY in dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_18%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.08),transparent_18%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl font-semibold tracking-[-0.04em] text-[#0f172a] font-dm-sans dark:text-white sm:text-6xl md:text-7xl">
              About <span className=" bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text font-cormorant-garamond italic text-transparent">
                Monexa.
              </span>
            </h2> 

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 90 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-6 h-1 rounded-full bg-cyan-500"
            />

            <div className="mt-10 space-y-8 text-lg leading-relaxed font-poppins text-slate-600 dark:text-slate-400">
              <p>
                Monexa Healthtech is a research-driven startup focused on
                building clinically assistive AI infrastructure for medical
                imaging workflows.
              </p>

              <p>
                The current focus is MONA Radiology, a system designed to
                support radiology workflows through structured imaging pipelines,
                intelligent processing, and assistive findings generation.
              </p>
            </div>

           

         
          </motion.div>

          {/* RIGHT VISUAL - IMAGE CONTAINER WITH DARK MODE GLOW */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-center w-full h-130"
          >
            <div className="relative w-full h-full overflow-hidden rounded-4xl border border-transparent dark:border-slate-800 dark:shadow-[0_30px_60px_rgba(34,211,238,0.05)]">
              <img
                src="/About.jpg"
                alt="Monexa Radiology Dashboard and Clinical Workflow"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
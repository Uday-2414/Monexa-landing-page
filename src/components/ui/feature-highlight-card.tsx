import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FeatureHighlightCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  buttonText?: string;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const imageContainerVariants: Variants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export const FeatureHighlightCard = React.forwardRef<
  HTMLDivElement,
  FeatureHighlightCardProps
>(({ imageSrc, imageAlt = 'Feature image', title, description, buttonText, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-card p-6 text-left shadow-sm transition-colors duration-300 dark:border-purple-500/20 dark:bg-slate-950/80',
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="absolute left-1/2 top-0 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-purple-500/10" />

      <motion.div variants={imageContainerVariants} className="mb-6 overflow-hidden rounded-xl border border-slate-200/70 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="aspect-[16/10] w-full object-cover"
        />
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="text-2xl font-bold tracking-tight text-card-foreground dark:text-white"
      >
        {title}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-base leading-relaxed text-muted-foreground dark:text-slate-400"
      >
        {description}
      </motion.p>

      {buttonText && (
        <motion.div variants={itemVariants} className="mt-8">
          <Button size="lg" className="w-full sm:w-auto">
            {buttonText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
});

FeatureHighlightCard.displayName = 'FeatureHighlightCard';

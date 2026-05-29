import type React from 'react';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = 'YourBrand',
  brandDescription = 'Your description here',
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn('relative z-10 mt-0 w-full overflow-hidden', className)}>
      <footer className="relative border-t border-cyan-200/20 bg-[#052f38] transition-colors duration-300 dark:border-slate-900 dark:bg-[#07050a]">
        <div className="relative mx-auto flex min-h-120 max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-140 md:min-h-160">
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start">
              <div className="flex flex-col items-center space-y-3 md:items-start">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  {brandIcon && (
                    <div className="flex shrink-0 items-center justify-center">
                      {brandIcon}
                    </div>
                  )}
                  <span className="text-center text-3xl font-bold text-white md:text-left">
                    {brandName}
                  </span>
                </div>
                <p className="w-full max-w-sm px-4 text-center font-semibold text-cyan-50/70 dark:text-slate-400 sm:w-96 sm:px-0 md:text-left">
                  {brandDescription}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 mb-8 md:items-end">
                {socialLinks.length > 0 && (
                  <div className="flex gap-6">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-cyan-50/70 transition-colors hover:text-white dark:text-slate-400 dark:hover:text-white"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <div className="h-6 w-6 duration-300 hover:scale-110">
                          {link.icon}
                        </div>
                        <span className="sr-only">{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}

                {navLinks.length > 0 && (
                  <nav className="flex max-w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1 px-10 text-sm font-medium text-cyan-50/70 dark:text-slate-400 md:justify-end md:px-0">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        className="duration-300 hover:font-semibold hover:text-white dark:hover:text-white"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-cyan-50/65 dark:text-slate-400 md:text-left">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-cyan-50/65 transition-colors duration-300 hover:font-medium hover:text-white dark:text-slate-400 dark:hover:text-white"
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-36 left-1/2 max-w-[95vw] -translate-x-1/2 select-none bg-linear-to-b from-white/25 via-cyan-50/10 to-transparent bg-clip-text px-4 text-center font-extrabold leading-none tracking-tighter text-transparent dark:from-white/20 dark:via-white/10 md:bottom-28"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
          }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="absolute bottom-24 left-1/2 h-px w-full -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-200/20 to-transparent backdrop-blur-sm dark:via-slate-800" />
        <div className="absolute bottom-16 h-24 w-full bg-linear-to-t from-[#052f38] via-[#052f38]/80 to-[#052f38]/40 blur-[1em] dark:from-[#07050a] dark:via-[#07050a]/80 dark:to-[#07050a]/40" />
      </footer>
    </section>
  );
};

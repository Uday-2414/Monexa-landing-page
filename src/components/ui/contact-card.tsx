import React from 'react';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        'relative grid h-full w-full border border-cyan-300/20 bg-[#073842] shadow-xl shadow-cyan-950/30 md:grid-cols-2 lg:grid-cols-3 dark:border-purple-500/20 dark:bg-slate-950/80 dark:shadow-purple-950/20',
        className,
      )}
      {...props}
    >
      <PlusIcon className="absolute -left-3 -top-3 h-6 w-6 text-cyan-200 dark:text-purple-300" />
      <PlusIcon className="absolute -right-3 -top-3 h-6 w-6 text-cyan-200 dark:text-purple-300" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-cyan-200 dark:text-purple-300" />
      <PlusIcon className="absolute -bottom-3 -right-3 h-6 w-6 text-cyan-200 dark:text-purple-300" />
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-cyan-50/75 md:text-base lg:text-lg dark:text-slate-400">
            {description}
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex h-full w-full items-center border-t border-cyan-300/20 bg-[#052f38] p-5 text-white md:col-span-1 md:border-l md:border-t-0 dark:border-purple-500/20 dark:bg-slate-900/50',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
      <div className="rounded-lg bg-cyan-200/10 p-3 text-cyan-200 dark:bg-purple-950/50 dark:text-purple-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="text-xs text-cyan-50/65 dark:text-slate-400">{value}</p>
      </div>
    </div>
  );
}

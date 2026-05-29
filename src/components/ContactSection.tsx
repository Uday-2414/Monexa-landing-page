import { motion } from 'framer-motion';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { MailIcon, MapPinIcon, PhoneIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCard } from '@/components/ui/contact-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('https://formspree.io/f/xnnrbqej', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        event.currentTarget.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-[#052f38] px-6 py-24 dark:bg-[#07050a]">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/30 to-transparent dark:via-purple-500/20" />
      <div className="absolute left-1/2 top-24 -z-10 h-136 w-136 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl dark:bg-purple-900/25" />

      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <ContactCard
          title="Get in touch"
          description="Interested in collaborations, research partnerships, or early-stage deployment discussions? Share a few details and the Monexa team will respond soon."
          className="rounded-4xl"
          formSectionClassName="rounded-b-[2rem] md:rounded-r-[2rem] md:rounded-bl-none"
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'monexahealth@gmail.com',
            },
            {
              icon: PhoneIcon,
              label: 'Phone',
              value: '+91 7671952358',
            },
            {
              icon: MapPinIcon,
              label: 'Location',
              value: 'India',
              className: 'md:col-span-2 lg:col-span-1',
            },
          ]}
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-6 dark:from-emerald-500/15 dark:to-cyan-500/15 border border-emerald-400/30 dark:border-emerald-500/30"
              >
                <CheckCircleIcon className="h-8 w-8 text-emerald-400 dark:text-emerald-300" />
                <div className="text-center">
                  <p className="font-bold text-emerald-700 dark:text-emerald-200">Thank you for reaching out!</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-1">We'll get back to you shortly.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name" className="text-cyan-50">Name</Label>
                    <Input id="contact-name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-organization" className="text-cyan-50">Organization</Label>
                    <Input id="contact-organization" name="organization" type="text" autoComplete="organization" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email" className="text-cyan-50">Email</Label>
                  <Input id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message" className="text-cyan-50">Message</Label>
                  <Textarea id="contact-message" name="message" rows={6} required />
                </div>
                <Button
                  className="w-full rounded-xl bg-[#009bb4] font-extrabold text-white shadow-lg shadow-cyan-500/15 hover:bg-[#008aa3] dark:bg-purple-600 dark:shadow-purple-500/20 dark:hover:bg-purple-500 disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </>
            )}
          </form>
        </ContactCard>
      </motion.div>
    </section>
  );
};

export default ContactSection;

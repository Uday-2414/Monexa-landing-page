import { Mail } from 'lucide-react';
import { Footer as AnimatedFooter } from '@/components/ui/modem-animated-footer';
import logoLight from '/Logo-light.png';
import logoDark from '/Logo-dark.png';

interface FooterProps {
  isDarkMode: boolean;
}

const LinkedInIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.98H3.56V20h3.38V8.98ZM5.25 4C4.17 4 3.38 4.8 3.38 5.82c0 .99.77 1.82 1.83 1.82h.02c1.1 0 1.87-.83 1.87-1.82C7.08 4.8 6.33 4 5.25 4ZM20.62 13.68c0-3.28-1.75-4.8-4.09-4.8a3.52 3.52 0 0 0-3.18 1.75V8.98H9.98c.04 1.03 0 11.02 0 11.02h3.37v-6.15c0-.33.02-.66.12-.9.25-.66.83-1.34 1.8-1.34 1.27 0 1.78 1 1.78 2.43V20h3.57v-6.32Z" />
  </svg>
);

const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <AnimatedFooter
      brandName="Monexa Healthtech"
      className="flex flex-row items-center justify-center text-center"
      brandDescription="AI-assisted radiology infrastructure under active research and development."
      navLinks={[
        { label: 'Product', href: '#product' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      ]}
      socialLinks={[
        {
          icon: <LinkedInIcon />,
          href: 'https://www.linkedin.com',
          label: 'LinkedIn',
        },
        {
          icon: <Mail className="h-6 w-6" />,
          href: 'mailto:contact@monexahealthtech.com',
          label: 'Email',
        },
      ]}
      brandIcon={
        <img 
          src={isDarkMode ? logoDark : logoLight} 
          alt="Monexa Logo" 
          className="h-12 w-auto transition-opacity duration-300"
        />
      }
    />
  );
};

export default Footer;

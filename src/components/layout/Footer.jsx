import { Code2, Mail, Network } from 'lucide-react';

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/placeholder', icon: Code2 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/placeholder', icon: Network },
  { label: 'Correo', href: 'mailto:placeholder@example.com', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-cyber/70 bg-surface/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-6 md:flex-row lg:px-8">
        <p className="font-mono text-xs text-muted-text">&copy; 2026 Norman Aguirre</p>

        <div className="flex items-center gap-2">
          {footerLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-surface-high/50 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan"
              aria-label={label}
              target={label === 'Correo' ? undefined : '_blank'}
              rel={label === 'Correo' ? undefined : 'noreferrer'}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

import { Code2, Mail, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'GitHub Principal', href: 'https://github.com/Naguirrel', icon: Code2 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/norman-aguirre-lepe-6679a5340', icon: Network },
  { label: 'Correo Personal', href: 'mailto:normanjraguirre@gmail.com', icon: Mail },
  { label: 'Contacto', href: '/contact', icon: Mail, internal: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-cyber/70 bg-surface/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-6 md:flex-row lg:px-8">
        <p className="font-mono text-xs text-muted-text">&copy; 2026 Norman Aguirre</p>

        <div className="flex items-center gap-2">
          {footerLinks.map(({ label, href, icon: Icon, internal }) =>
            internal ? (
              <Link
                key={label}
                to={href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-surface-high/50 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan"
                aria-label={label}
              >
                <Icon size={17} />
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-surface-high/50 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan"
                aria-label={label}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              >
                <Icon size={17} />
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}

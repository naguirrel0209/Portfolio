import { Code2, Mail, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const footerLinks = [
  { labelKey: 'common.footer.githubPrimary', href: 'https://github.com/Naguirrel', icon: Code2 },
  { labelKey: 'common.footer.linkedin', href: 'https://linkedin.com/in/norman-aguirre-lepe-6679a5340', icon: Network },
  { labelKey: 'common.footer.personalEmail', href: 'mailto:normanjraguirre@gmail.com', icon: Mail },
  { labelKey: 'common.footer.contact', href: '/contact', icon: Mail, internal: true },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border-cyber/70 bg-surface/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-6 md:flex-row lg:px-8">
        <p className="font-mono text-xs text-muted-text">&copy; 2026 {t('common.brand')}</p>

        <div className="flex items-center gap-2">
          {footerLinks.map(({ labelKey, href, icon: Icon, internal }) =>
            internal ? (
              <Link
                key={labelKey}
                to={href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-surface-high/50 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan"
                aria-label={t(labelKey)}
              >
                <Icon size={17} />
              </Link>
            ) : (
              <a
                key={labelKey}
                href={href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-surface-high/50 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan"
                aria-label={t(labelKey)}
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

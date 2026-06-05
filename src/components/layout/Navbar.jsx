import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';
import ThemeSwitcher from '../ui/ThemeSwitcher.jsx';

const navItems = [
  { labelKey: 'common.nav.home', path: '/' },
  { labelKey: 'common.nav.projects', path: '/projects' },
  { labelKey: 'common.nav.contact', path: '/contact' },
];

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
    isActive ? 'text-primary-cyan-bright' : 'text-muted-text hover:text-primary-cyan',
  ].join(' ');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border-cyber/70 bg-surface/70 backdrop-blur-xl"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="font-mono text-sm font-semibold tracking-normal text-text transition-colors duration-200 hover:text-primary-cyan-bright"
          onClick={() => setIsOpen(false)}
        >
          {t('common.brand')}
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {t(item.labelKey)}
            </NavLink>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher onSelect={() => setIsOpen(false)} />
          <ThemeSwitcher onSelect={() => setIsOpen(false)} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/80 bg-surface-high/70 text-muted-text transition-colors duration-300 hover:border-primary-cyan hover:text-primary-cyan"
            aria-label={isOpen ? t('common.nav.close') : t('common.nav.open')}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <motion.div
          className="border-t border-border-cyber/60 bg-surface/90 px-5 py-3 backdrop-blur-xl md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

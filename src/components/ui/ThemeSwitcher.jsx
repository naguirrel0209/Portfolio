import { AnimatePresence, motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeSwitcher({ onSelect }) {
  const { themeId, themes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextThemeId) => {
    setTheme(nextThemeId);
    setIsOpen(false);
    onSelect?.();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/80 bg-surface-high/70 text-muted-text transition-colors duration-300 hover:border-primary-cyan hover:text-primary-cyan-bright"
        aria-label={t('common.theme.button')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="absolute right-0 top-12 z-50 w-56 rounded-lg border border-border-cyber/80 bg-surface/95 p-3 shadow-[0_0_36px_var(--primary-glow-soft)] backdrop-blur-xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <p className="px-2 pb-2 font-mono text-xs uppercase text-primary-cyan-bright">
              {t('common.theme.title')}
            </p>

            <div className="grid gap-1">
              {themes.map((theme) => {
                const isActive = theme.id === themeId;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm transition duration-300 ${
                      isActive
                        ? 'border-primary-cyan bg-surface-high/80 text-text shadow-[0_0_18px_var(--primary-glow-soft)]'
                        : 'border-transparent text-muted-text hover:border-primary-cyan/60 hover:bg-surface-high/55 hover:text-text'
                    }`}
                    onClick={() => handleSelect(theme.id)}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full border border-text/40"
                        style={{ backgroundColor: theme.swatch }}
                        aria-hidden="true"
                      />
                      <span>{theme.icon}</span>
                      {t(`common.theme.${theme.id}`)}
                    </span>
                    {isActive ? <Check size={15} className="text-primary-cyan-bright" /> : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

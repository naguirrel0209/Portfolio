import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'es', shortLabel: 'ES', icon: '🇪🇸' },
  { code: 'en', shortLabel: 'EN', icon: '🇺🇸' },
];

export default function LanguageSwitcher({ onSelect }) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    onSelect?.();
  };

  return (
    <div
      className="inline-flex h-10 items-center rounded-md border border-border-cyber/80 bg-surface-high/70 p-1"
      aria-label={t('common.language.label')}
    >
      {languages.map((language) => {
        const isActive = i18n.resolvedLanguage === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={`inline-flex h-8 items-center gap-1 rounded px-2 font-mono text-xs font-semibold transition duration-300 ${
              isActive
                ? 'bg-primary-cyan text-background shadow-[0_0_18px_var(--primary-glow-soft)]'
                : 'text-muted-text hover:text-primary-cyan-bright'
            }`}
            aria-pressed={isActive}
            title={t(`common.language.${language.code}`)}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span aria-hidden="true">{language.icon}</span>
            {language.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

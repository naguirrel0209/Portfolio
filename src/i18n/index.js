import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

const LANGUAGE_STORAGE_KEY = 'norman-language';
const supportedLanguages = ['es', 'en'];

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'es';
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'es';
}

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
});

export default i18n;

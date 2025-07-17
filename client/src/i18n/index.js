import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // default language if not detected
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      fr: { translation: fr }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

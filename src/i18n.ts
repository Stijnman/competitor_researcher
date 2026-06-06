// i18n foundation (item 35)
// Basic setup for future translations. Currently English only.
// To expand: install i18next etc (already in batch deps), add json locales, use useTranslation.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "analyze": "Analyze & Strategize",
      "verify": "Verify Project",
      "dashboardTitle": "Competitive GitHub Master",
      // Add more strings here for microcopy improvements (item 36)
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from "./tr.json";
import en from "./en.json";

const resources = {
    tr: {
        translation: tr
    },
    en: {
        translation: en
    }
}

i18n
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        compatibilityJSON: 'v3',
        lng: 'tr',
        fallbackLng: 'en',
        resources,
        interpolation: {
        escapeValue: false
    },
        react: {
        useSuspense: false,
    }
  });


export default i18n;
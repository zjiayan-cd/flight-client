import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enNavbar from './locales/en/navbar.json';
import enLogin from './locales/en/login.json';

// import zhCommon from './locales/zh/common.json';
import zhHome from './locales/zh/home.json';
import zhNavbar from './locales/zh/navbar.json';
import zhLogin from './locales/zh/login.json';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en', // 默认语言
    fallbackLng: 'en',
    resources: {
      en: {
        home: enHome,
        navbar: enNavbar,
        login: enLogin,
      },
      zh: {
        home: zhHome,
        navbar: zhNavbar,
        login: zhLogin,
      }
    },
    ns: ['home', 'navbar', 'login'],
    defaultNS: 'navbar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

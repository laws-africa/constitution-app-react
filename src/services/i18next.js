import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const enResources = {
  help: require('../locales/en/help.json'),
  landing: require('../locales/en/landing.json'),
}

// const xhResources = {
//   help: require('../locales/xh/help.json'),
//   landing: require('../locales/xh/landing.json'),
// }

const resources = {};

if(Object.keys(enResources).some(ns => enResources[ns])) {
  resources.en  = {};
  Object.keys(enResources).forEach(ns => {
    if(enResources[ns]) {
      resources.en[ns] = enResources[ns]
    }
  })
}

// if(Object.keys(xhResources).some(ns => xhResources[ns])) {
//   resources.xh  = {};
//   Object.keys(xhResources).forEach(ns => {
//     if(xhResources[ns]) {
//       resources.xh[ns] = xhResources[ns]
//     }
//   })
// }


i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: "en",
      interpolation: {
        escapeValue: false,
      },
      debug: true,
      fallbackLng: "en",
      keySeparator: ".",
      supportedLngs: ["en", "xh"],
      saveMissing: true,
    });

export default i18next;

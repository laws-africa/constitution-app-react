import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const loadJSONFile = (url = "" ) => {
  try {
   return require(`../locales/${url}`);
  } catch (e) {
    return null;
  }
}

const resources = {};

['af', 'en', 'xh', 'zu'].forEach(key => {
  const resource = {};
  const data =  {
    case: loadJSONFile(`${key}/case.json`),
    constitution: loadJSONFile(`${key}/constitution.json`),
    global: loadJSONFile(`${key}/global.json`),
    help: loadJSONFile(`${key}/help.json`),
    home: loadJSONFile(`${key}/home.json`),
    landing: loadJSONFile(`${key}/landing.json`),
    rules: loadJSONFile(`${key}/rules.json`),
    search: loadJSONFile(`${key}/search.json`),
    topic: loadJSONFile(`${key}/topic.json`),
    language_switcher: loadJSONFile(`${key}/language_switcher.json`),
  }
  Object.keys(data).forEach(ns => {
    if(data[ns]) {
      resource[ns] = data[ns];
    }
  });
  resources[key] = resource;
});

i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: localStorage.getItem('locale') || 'en',
      interpolation: {
        escapeValue: false,
      },
      debug: true,
      fallbackLng: 'en',
      keySeparator: ".",
      supportedLngs: ['af', 'en', 'zu', 'xh'],
      saveMissing: true,
    });

export default i18next;

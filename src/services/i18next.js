import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const loadJSONFile = (url = "" ) => {
  try {
   return require(`../locales/${url}`);
  } catch (e) {
    return null;
  }
}

const enData = {
  case: loadJSONFile("en/case.json"),
  constitution: loadJSONFile("en/constitution.json"),
  global: loadJSONFile("en/global.json"),
  help: loadJSONFile("en/help.json"),
  home: loadJSONFile("en/home.json"),
  landing: loadJSONFile("en/help.json"),
  rules: loadJSONFile("en/rules.json"),
  search: loadJSONFile("en/search.json"),
  topic: loadJSONFile("en/topic.json"),
}

const enResources = {};
Object.keys(enData).forEach(ns => {
  if(enData[ns]) {
    enResources[ns] = enData[ns];
  }
})

const zuData = {
  case: loadJSONFile("en/case.json"),
  constitution: loadJSONFile("zu/constitution.json"),
  global: loadJSONFile("zu/global.json"),
  help: loadJSONFile("zu/help.json"),
  home: loadJSONFile("zu/home.json"),
  landing: loadJSONFile("zu/help.json"),
  rules: loadJSONFile("zu/rules.json"),
  search: loadJSONFile("zu/search.json"),
  topic: loadJSONFile("zu/topic.json")
}

const zuResources = {};
Object.keys(zuData).forEach(ns => {
  if(zuData[ns]) {
    zuResources[ns] = zuData[ns];
  }
})

i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: enResources,
        zu: zuResources
      },
      lng: "en",
      interpolation: {
        escapeValue: false,
      },
      debug: true,
      fallbackLng: "en",
      keySeparator: ".",
      supportedLngs: ["en", "zu"],
      saveMissing: true,
    });

export default i18next;

import React, { useEffect, useState } from "react";
import i18next from "i18next";

export const useLanguage = () => {
  let [lang, setLang] = useState(localStorage.getItem('locale') || 'en');
  const [listenerRegistered, setListenerRegistered] = React.useState(false);
  useEffect(() => {
    if(!listenerRegistered) {
      i18next.on('languageChanged', lang => {
        setLang(lang);
        setListenerRegistered(true);
      })
    }
  }, [listenerRegistered]);
  return lang;
};

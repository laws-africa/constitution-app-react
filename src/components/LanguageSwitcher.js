import React from "react";
import { useTranslation } from "react-i18next";
import {svgs} from "../assets/svgs";
import {IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from "@ionic/react";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation('language_switcher');
  const supportedLngs = i18n.options.supportedLngs.filter(option => option !==  'cimode');
  const getLngName = (language) => {
    const languageNames = new Intl.DisplayNames([i18n.language], {type: 'language'});
    return languageNames.of(language);
  }
  const handleLangChange = async (e) => {
    await i18n.changeLanguage(e.target.value);
    localStorage.setItem('locale', e.target.value);
  }

  return (
      <IonList className="language-switcher">
        <IonItem>
          <img src={svgs.LANGUAGE} alt="language-switcher" />
          <IonLabel style={{
            display: 'none'
          }}>
            {t('choose_language', 'Choose Language')}
          </IonLabel>
          <IonSelect
              style={{
                maxWidth: "100%",
                flexGrow: 1
              }}
              placeholder={t('choose_language', 'Choose Language')}
              value={i18n.language}
              onIonChange={handleLangChange}
          >
            {supportedLngs.map((option, index) => (
                <IonSelectOption key={index} value={option}>
                  {getLngName(option)}
                </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
  );
}
export default LanguageSwitcher;

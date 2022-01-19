import React from "react";
import { useTranslation } from "react-i18next";
import {svgs} from "../assets/svgs";
import {IonItem, IonLabel, IonList, IonSelect, IonSelectOption} from "@ionic/react";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const supportedLngs = i18n.options.supportedLngs.filter(option => option !==  'cimode');
  const getLngName = (language) => {
    const languageNames = new Intl.DisplayNames([i18n.language], {type: 'language'});
    return languageNames.of(language);
  }
  return (
      <IonList>
        <IonItem
            className="language-switcher">
          <img src={svgs.LANGUAGE} alt="language-switcher"
               style={{
                 marginLeft: "10px",
                 width: "28px",
                 height: "28px",
               }}
          />
          <IonLabel style={{
            display: 'none'
          }}>Choose Language</IonLabel>
          <IonSelect
              style={{
                maxWidth: "100%",
                flexGrow: 1
              }}
              placeholder="Select a language"
              value={i18n.language}
              onIonChange={(e) =>
                  i18n.changeLanguage(e.target.value)
              }
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

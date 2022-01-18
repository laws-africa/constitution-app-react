import React from "react";
import { useTranslation } from "react-i18next";
import {IonSelect, IonSelectOption} from "@ionic/react";
import {svgs} from "../assets/svgs";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const supportedLngs = i18n.options.supportedLngs.filter(option => option !==  'cimode');
  return (
      <div
          className="language-switcher">
        <img src={svgs.LANGUAGE} alt="language-switcher" style={{
          width: "28px",
          height: "28px"
        }}/>
        <IonSelect
            interface="popover"
            mode="ios"
            style={{
              paddingStart: "10px"
            }}
            value={i18n.language}
            onIonChange={(e) =>
                i18n.changeLanguage(e.target.value)
            }
        >
          {supportedLngs.map((option, index) => (
              <IonSelectOption key={index} value={option}>
                {option}
              </IonSelectOption>
          ))}
        </IonSelect>
      </div>
  );
}
export default LanguageSwitcher;

import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  return (
      <div>
        <div className="select">
          <select
              value={i18n.language}
              onChange={(e) =>
                  i18n.changeLanguage(e.target.value)
              }
          >
            {i18n.options.supportedLngs.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
            ))}
          </select>
        </div>
      </div>
  );
}
export default LanguageSwitcher;

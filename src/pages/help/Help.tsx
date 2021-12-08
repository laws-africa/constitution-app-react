import React from "react";
import { IonCol, IonContent, IonIcon, IonPage } from "@ionic/react";
import "./Help.css";
import { svgs } from "../../assets/svgs";
import ActionAnchorLink from "../../components/Action/ActionAnchorLink";
import {useTranslation} from "react-i18next";
import parse from "html-react-parser";

const Tab1: React.FC = () => {
  const { t } = useTranslation('help');
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <section className="search-title">
          <IonCol size="1" class="icon ion-no-padding">
            <IonIcon size="small" icon={svgs.HELP}></IonIcon>
          </IonCol>
          <h2>{t('about_heading', 'About')}</h2>
        </section>

        <hr className="header-divider" />
        {parse(t('app_description', `
          <p>
            The Constitution App is developed by the
          <a
            href="http://www.dgru.uct.ac.za/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Democratic Governance and Rights Unit
          </a>
          of the Faculty of Law, University of Cape Town in collaboration with
          <a
            href="https://africanlii.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            AfricanLII
          </a>
          and
          <a
            href="https://laws.africa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laws.Africa
          </a>
          , with funding support from the
          <a
            href="https://www.kas.de/en/web/suedafrika/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konrad-Adenauer-Stiftung
          </a>
          . The aim of the project is to equip South African parliamentarians
          with accurate and authoritative information on South African
          constitutional law.
        </p>
          <p>
          In this application, you will find an updated version of the South
          African constitution, together with commentary of its key provisions
          and their interpretation by South Africa’s highest courts. The app
          allows you to browse through and read summaries as well as the full
          text of constitutional court judgments. The content of this
          application is available off-line and will be updated twice a year.
        </p>
        `))}
        {parse(t('contact_us', `
          <h3>Contact</h3>
          <p>
            Feel free to forward constructive feedback and suggestions to
            <a href="mailto:info@africanlii.org">info@africanlii.org</a>.
          </p>
        `))}

        {parse(t('copyright', `
          <h3>Copyright</h3>
          <p>
            The contents of this app is licensed under Attribution-NonCommercial
            4.0 International (CC BY-NC 4.0) Creative Commons license. View the
            license at
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://creativecommons.org/licenses/by-nc/4.0/
            </a>
            .
          </p>
        `))}
        <div>
          <ActionAnchorLink
            href="mailto:info@africanlii.org"
            actionText={parse(t('send_feedback_button_title', 'Send feedback'))}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

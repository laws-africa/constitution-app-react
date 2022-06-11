import React from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { getAndClearRedirected } from "../../redirect";
import { TopicItem } from "../../components/topic";
import { Link, Redirect } from "react-router-dom";
import { svgs } from "../../assets/svgs";
import ActionRouteLink from "../../components/Action/ActionRouteLink";
import ActionAnchorLink from "../../components/Action/ActionAnchorLink";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import {getGuides, Guide} from "../../data/guides";
import {useLanguage} from "../../custom-hooks/useLanguage";

const Home: React.FC = () => {
  const {t} = useTranslation('home')
  const lang = useLanguage();
  const guides = getGuides(lang)

  // redirect to a url from the 404.html page?
  const path = getAndClearRedirected();
  if (path.length) {
    return <Redirect to={path}/>;
  }

  return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="app-title">
            <div className="app-title__left">
              <img src="/assets/logo.png" alt="logo" className="logo"/>
              <h2>
                Constitution <br/> Compass{" "}
                <img
                    src="/assets/flag.png"
                    className="flag"
                    alt="South African Flag"
                />
              </h2>
            </div>
          </div>
          <hr className="header-divider"/>

          <div className="ion-padding-bottom">
            {t('choose_language_preference', 'Choose your preferred language:')}
          </div>

          <div style={{
            marginBottom: "3rem"
          }}>
            <LanguageSwitcher/>
          </div>

          <div className="ion-padding-bottom">
            {t('browser_constitution_text', 'Browse the Constitution for the provisions that you need.')}
          </div>
          <ActionRouteLink
              leftIcon={svgs.CONSTITUTION}
              actionText={t('explore_constitution_link_text', 'Explore the Constitution')}
              routerLink="/constitution"
          />

          <hr className="divider"/>

          <IonGrid className="ion-no-padding ion-padding-bottom">
            <IonRow>
              <IonCol size="1">
                <IonIcon size="small" icon={svgs.GUIDES}/>
              </IonCol>
              <IonCol>
                <h5 className="section-heading">{t('guides_heading', 'Guides')}</h5>
              </IonCol>
              <IonCol size="1">
                <Link className="ion-float-right link-plain" to="/search/guides">
                  {t('search_guides_link_text', 'Search')}
                </Link>
              </IonCol>
            </IonRow>
          </IonGrid>

          <div className="ion-padding-bottom">
            {t('understand_provisions_text', `Understand the provisions of the Constitution and their implications
          for parliamentary matters.`)}
          </div>
          <IonList className="ion-margin-bottom ion-padding">
            {guides.slice(0, 3).map((guide: Guide) => (
            <TopicItem topic={guide} key={guide.id} />
          ))}
        </IonList>
        <ActionRouteLink
          routerLink="/guides"
          leftIcon={svgs.GUIDES}
          actionText={t('browse_all_guides_text', 'Browse All Guides')}
        />

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={svgs.CASES} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">{t('cases_heading', 'Cases')}</h5>
            </IonCol>
            <IonCol size="1" className="ion-text-nowrap">
              <Link className="ion-float-right link-plain" to="/search/cases">
                {t('search_cases_link_title', 'Search')}
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          {t('courts_interpreted_text', `See how the courts have interpreted the Constitution by reading the
          leading cases on constitutional provisions.`)}
        </div>
        <ActionRouteLink
          routerLink="/cases"
          actionText={t('browse_cases_text', 'Browse Cases')}
          leftIcon={svgs.CASES}
        />

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={svgs.RULES} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">
                {t('rules_of_national_assembly_heading', 'Rules of the National Assembly')}
              </h5>
            </IonCol>
            <IonCol size="1">
              <Link className="ion-float-right link-plain" to="/search/rules">
                {t('search_link_label', 'Search')}
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          {t('browse_rules_of_assembly_text', 'Browse the Rules of the National Assembly.')}
        </div>
        <ActionRouteLink
          routerLink="/rules"
          actionText={t('browse_rules_label', 'Browse Rules')}
          leftIcon={svgs.RULES}
        />

        <hr className="divider" />

        <p>{t('sponsors_of_app_text', 'This app is brought to you by')}:</p>

        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeMd="6">
              <a
                href="https://africanlii.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="African Lii Logo"
                  src="/assets/African Lii logo.svg"
                />
              </a>
            </IonCol>
            <IonCol sizeXs="12" sizeMd="6">
              <a
                href="https://www.kas.de/en/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="KAS Logo"
                  src="/assets/03_KAS_Logo_Min_RGB_Blau.jpg"
                />
              </a>
            </IonCol>
            <IonCol sizeXs="12" sizeMd="6">
              <a
                href="https://www.uct.ac.za/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="UCT Logo" src="/assets/uct-logo.png" />
              </a>
            </IonCol>

            <IonCol sizeXs="12" sizeMd="6">
              <a
                href="https://laws.africa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="Laws Africa Logo"
                  src="/assets/laws-africa-logo.png"
                />
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br />
        <ActionRouteLink routerLink="/help" actionText={t('about_app_link_label', 'About This App')} />
        <br />
        <ActionAnchorLink
          href="mailto:info@africanlii.org"
          actionText={t('send_feedback_link_label', 'Send feedback')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;

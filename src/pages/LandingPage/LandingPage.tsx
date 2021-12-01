import {
  IonCol,
  IonRow,
  IonIcon,
  IonPage,
  IonButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonFooter,
  IonGrid,
} from "@ionic/react";
import React, { useState } from "react";
import { svgs } from "../../assets/svgs";
import { handleSupportersLink } from "../../utils";
import "./LandingPage.scss";
import { getAndClearRedirected } from "../../redirect";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const LandingPage = () => {
  const [tab, setTab] = useState("ios");
  const { t } = useTranslation();

  const isSafari = (() => {
    const hasSafariAgent = navigator.userAgent.indexOf("Safari") > -1;
    const hasChromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
    if (hasSafariAgent) {
      return !hasChromeAgent; // Chrome seems to have both Chrome and Safari userAgents
    }
    return false;
  })();

  // redirect to a url from the 404.html page?
  const path = getAndClearRedirected();
  if (path.length) {
    return <Redirect to={path} />;
  }

  return (
    <IonPage className="landing-page">
      <LanguageSwitcher />
      <IonContent>
        <IonRow class="ion-justify-content-between ion-margin-horizontal ion-padding-vertical header ion-align-items-center">
          <section className="app-title">
            <img src="/assets/logo.png" alt="logo" className="logo" />
            <h2>
              {/*<span dangerouslySetInnerHTML={t("landing_page.app_title")} />*/}
              <img
                src="/assets/flag.png"
                className="flag"
                alt="South African Flag"
              />
            </h2>
          </section>

          <IonRow class="ion-align-items-center right-links ion-justify-content-between">
            <a href="#features">Features</a>{" "}
            <IonButton color="light" href="#installation">
              {t("landing_page.install_now")}
            </IonButton>
          </IonRow>
        </IonRow>

        <div className="ion-text-center main-content">
          <h1>{t("landing_page.main_content.h1")}</h1>
          <h2>{t("landing_page.main_content.h2")}</h2>
          <p>
            Browse, search and understand the South African Constitution and how
            it applies to everyone. Continuously updated and curated
            Constitution and{" "}
            <span className="ion-text-nowrap">
              Rules of the National Assembly
            </span>
            .
          </p>
          <IonButton color="light" href="#installation">
            {t("landing_page.install_now")}
          </IonButton>

          <a href="/home" className="ion-padding-top">
            {t("landing_page.use_web_version")}
          </a>
        </div>

        <div className="images">
          <img
            src="/assets/phone.png"
            className="img-phone"
            alt="iphone screenshot"
          />
          <img
            src="/assets/tablet.png"
            className="img-tablet"
            alt="tablet screenshot"
          />
        </div>

        <div id="features" className="features-content">
          <IonGrid>
            <IonRow>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.CONSTITUTION}
                  title={t("landing_page.features_content.constitution_title")}
                  text={t("landing_page.features_content.constitution_text")}
                />

                <Features
                  iconName={svgs.GUIDES}
                  title={t("landing_page.features_content.guides_title")}
                  text={t("landing_page.features_content.guides_text")}
                />

                <Features
                  iconName={svgs.RULES}
                  title={t("landing_page.features_content.rules_title")}
                  text={t("landing_page.features_content.rules_text")}
                />
              </IonCol>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.CASES}
                  title={t("landing_page.features_content.cases_title")}
                  text={t("landing_page.features_content.case_text")}
                />

                <Features
                  iconName={svgs.SEARCH}
                  title={t("landing_page.features_content.search_title")}
                  text={t("landing_page.features_content.search_text")}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div id="installation" className="installation">
          <h2>{t("landing_page.installation.add_home_screen_text")}</h2>
          <IonSegment
            mode="md"
            value={tab}
            onIonChange={(e) => setTab(e.detail.value || "ios")}
          >
            <IonSegmentButton value="ios">
              {t("landing_page.installation.ios_segment_button_text")}
            </IonSegmentButton>
            <IonSegmentButton value="android">
              {t("landing_page.installation.android_segment_button_text")}
              Android
            </IonSegmentButton>
          </IonSegment>

          <hr />

          {tab === "ios" ? (
            <div>
              <h6>Install on your iPhone or iPad</h6>
              <br />
              <IonRow className="instruction-row">
                <IonCol size-md="6">
                  <img
                    className="image-instruction"
                    src="/assets/installation/ios/step-1.jpg"
                    alt="ios-install-step-1"
                  />
                </IonCol>
                <IonCol size-md="6">
                  <ol>
                    {!isSafari ? (
                      <React.Fragment>
                        <li>
                          Open your Safari browser
                          <div className="light">
                            Note: It must be Safari, you cannot use Google
                            Chrome or Firefox.
                          </div>
                        </li>
                        <li>
                          Go to{" "}
                          <a
                            href="https://bit.ly/concompass"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            bit.ly/concompass
                          </a>
                        </li>
                      </React.Fragment>
                    ) : null}
                    <li>Tap the share icon at the bottom of the screen</li>
                  </ol>
                </IonCol>
              </IonRow>
              <hr className="hr-divider" />
              <IonRow className="instruction-row">
                <IonCol size-md="6">
                  <img
                    className="image-instruction"
                    src="/assets/installation/ios/step-2.jpg"
                    alt="ios-install-step-2"
                  />
                  <br />
                  <br />
                  <img
                    className="image-instruction"
                    src="/assets/installation/ios/step-3.jpg"
                    alt="ios-install-step-3"
                  />
                </IonCol>
                <IonCol size-md="6">
                  <ol start={4}>
                    <li>
                      Scroll down and tap “Add to Home Screen” then tap “Add”
                    </li>
                    <li>To open the app, find it on your home screen</li>
                  </ol>
                </IonCol>
              </IonRow>
            </div>
          ) : null}

          {tab === "android" ? (
            <div>
              <h6>Install on your Android</h6>
              <br />
              <IonRow className="instruction-row">
                <IonCol size-md="6">
                  <img
                    className="image-instruction"
                    src="/assets/installation/android/step-1.jpg"
                    alt="android-install-step-1"
                  />
                </IonCol>
                <IonCol size-md="6">
                  <ol>
                    <li>Open your phone's browser</li>
                    <li>
                      Go to{" "}
                      <a
                        href="https://bit.ly/concompass"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        bit.ly/concompass
                      </a>
                    </li>
                    <li>
                      Tap on the "Add Constitution Compass to Home screen"
                      banner and follow the prompts.
                    </li>
                  </ol>
                </IonCol>
              </IonRow>

              <hr className="hr-divider" />

              <IonRow className="instruction-row">
                <IonCol size-md="6">
                  <img
                    className="image-instruction"
                    src="/assets/installation/android/step-2.jpg"
                    alt="android-install-step-2"
                  />
                </IonCol>
                <IonCol size-md="6">
                  <ol start={4}>
                    <li>
                      If the banner is not visible, tap on the Toolbar icon in
                      top right corner, then tap "Install App".
                    </li>
                  </ol>
                </IonCol>
              </IonRow>
              <hr className="hr-divider" />
              <IonRow className="instruction-row">
                <IonCol size-md="6">
                  <img
                    className="image-instruction"
                    src="/assets/installation/android/step-3.jpg"
                    alt="android-install-step-3"
                  />
                </IonCol>
                <IonCol size-md="6">
                  <ol start={5}>
                    <li>To open the app, find it on your home screen</li>
                  </ol>
                </IonCol>
              </IonRow>
            </div>
          ) : null}
        </div>

        <IonFooter>
          <IonRow class="ion-justify-content-between ion-padding-vertical header ion-align-items-center">
            <section className="app-title">
              <img src="/assets/logo.png" alt="logo" className="logo" />
              <h2>
                Constitution <br /> Compass{" "}
                <img
                  src="/assets/flag.png"
                  className="flag"
                  alt="South African Flag"
                />
              </h2>
            </section>

            <IonCol class="footer-links">
              <a href="#features">Features</a>
              <a href="#installation">Install now</a>
              <a href="mailto:info@africanlii.org">info@africanlii.org</a>
            </IonCol>
          </IonRow>

          <div className="last-content">
            <span>Developed by:</span>

            <IonGrid>
              <IonRow class="ion-align-items-center">
                <IonCol size-md="3">
                  <img
                    alt=""
                    src="../../assets/African Lii logo.svg"
                    onClick={() =>
                      handleSupportersLink("https://africanlii.org/")
                    }
                  />
                </IonCol>
                <IonCol size-md="3">
                  <img
                    alt=""
                    src="../../assets/03_KAS_Logo_Min_RGB_Blau.jpg"
                    onClick={() =>
                      handleSupportersLink(
                        "https://www.kas.de/en/web/suedafrika/home"
                      )
                    }
                  />
                </IonCol>
                <IonCol size-md="3">
                  <img
                    alt=""
                    src="../../assets/uct-logo.jpg"
                    onClick={() =>
                      handleSupportersLink("https://www.uct.ac.za/")
                    }
                  />
                </IonCol>
                <IonCol size-md="3">
                  <img
                    alt=""
                    src="../../assets/Laws.Africa.jpg"
                    onClick={() => handleSupportersLink("https://laws.africa/")}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>

            <div className="ion-padding-vertical">
              &copy; 2021 AfricanLII.org
            </div>
          </div>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;

interface FeaturesProps {
  iconName: string;
  title: string;
  text: string;
}

const Features: React.FC<FeaturesProps> = ({ iconName, title, text }) => {
  return (
    <div className="feature">
      <IonCol class="feature-col">
        <IonIcon size="large" class="feature_icon" icon={iconName} />
      </IonCol>
      <section className="feature-details">
        <h6>{title}</h6>
        <p>{text}</p>
      </section>
    </div>
  );
};

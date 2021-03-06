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

const LandingPage = () => {
  const [tab, setTab] = useState('ios');

  // redirect to a url from the 404.html page?
  const path = getAndClearRedirected();
  if (path.length) {
    return <Redirect to={path}/>
  }

  return (
    <IonPage className="landing-page">
      <IonContent>
        <IonRow class="ion-justify-content-between ion-margin-horizontal ion-padding-vertical header ion-align-items-center">
          <section className="app-title">
            <img src="/assets/logo.png" alt="logo" className="logo" />
            <h2>Constitution <br/> Compass <img src="/assets/flag.png" className="flag" alt="South African Flag"/></h2>
          </section>

          <IonRow class="ion-align-items-center right-links ion-justify-content-between">
            <a href="#features">Features</a>{" "}
            <IonButton color="light" href="#installation">Install Now</IonButton>
          </IonRow>
        </IonRow>

        <div className="ion-text-center main-content">
          <h1>Constitution Compass</h1>
          <h2>The Constitution App for Members of Parliament.</h2>
          <p>
            Browse, search and understand the South African Constitution and how it applies to everyone. Continuously
            updated and curated Constitution and <span className="ion-text-nowrap">Rules of the National Assembly</span>.
          </p>
          <IonButton color="light" href="#installation">Install Now</IonButton>

          <a href="/home" className="ion-padding-top">Use the web version</a>
        </div>

        <div className="images">
          <img src="/assets/phone.png" className="img-phone" alt="iphone screenshot" />
          <img src="/assets/tablet.png" className="img-tablet" alt="tablet screenshot" />
        </div>

        <div id="features" className="features-content">
          <IonGrid>
            <IonRow>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.CONSTITUTION}
                  title="Browse the Constitution"
                  text="Browse, search and read the latest version of the South African Constitution: updated and consolidated."
                />

                <Features
                  iconName={svgs.GUIDES}
                  title="Guides to the Constitution"
                  text="Quick guides to the purpose and meaning of each section of the Bill of Rights and some of the most used chapters of the Constitution."
                />

                <Features
                  iconName={svgs.RULES}
                  title="Get Cases in Context"
                  text="Accessible guides to the South African Constitutional Court’s authoritative interpretation of the Constitution."
                />
              </IonCol>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.CASES}
                  title="Rules of the National Assembly"
                  text="Quickly browse through the consolidated and updated version of the Rules of the National Assembly."
                />

                <Features
                  iconName={svgs.SEARCH}
                  title="Find what you are looking for"
                  text="Search across the Constitution, Rules, Guides or Cases to find the information that you need."
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <div id="installation" className="installation">
          <h2>How to install the app on your phone</h2>

          <IonSegment mode="md" value={tab} onIonChange={(e) => setTab(e.detail.value || "ios")}>
            <IonSegmentButton value="ios">iOS</IonSegmentButton>
            <IonSegmentButton value="android">Android</IonSegmentButton>
          </IonSegment>

          <hr />

          <IonRow class="ion-justify-content-between">
            <IonCol size-md="6">
              <figure></figure>
            </IonCol>

            <IonCol size-md="6">
              <div className="installation-steps">
                {tab === 'ios' && <>
                  <h6>Install on your iPhone or iPad</h6>

                  <ol>
                    <li>
                      Open your Safari browser
                      <div className="light">
                        Note: It must be Safari, you cannot use Google Chrome or Firefox.
                      </div>
                    </li>
                    <li>Go to <a href="https://bit.ly/concompass" target="_blank" rel="noopener noreferrer">bit.ly/concompass</a></li>
                    <li>Tap the share icon at the bottom of the screen</li>
                    <li>Scroll down and tap “Add to Home Screen” then tap “Add”</li>
                    <li>To open the app, find it on your home screen</li>
                  </ol>
                </>}

                {tab === 'android' && <>
                  <h6>Install on your Android</h6>

                  <ol>
                    <li>Open your phone's browser</li>
                    <li>Go to <a href="https://bit.ly/concompass" target="_blank" rel="noopener noreferrer">bit.ly/concompass</a></li>
                    <li>Tap the share icon at the bottom of the screen</li>
                    <li>Scroll down and tap “Add to Home Screen” then tap “Add”</li>
                    <li>To open the app, find it on your home screen</li>
                  </ol>
                </>}
              </div>
            </IonCol>
          </IonRow>
        </div>

        <IonFooter>
          <IonRow class="ion-justify-content-between ion-padding-vertical header ion-align-items-center">
            <section className="app-title">
              <img src="/assets/logo.png" alt="logo" className="logo" />
              <h2>Constitution <br/> Compass <img src="/assets/flag.png" className="flag" alt="South African Flag"/></h2>
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
                      handleSupportersLink("https://www.kas.de/en/web/suedafrika/home")
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
                    onClick={() =>
                      handleSupportersLink("https://laws.africa/")
                    }
                  />
                </IonCol>
              </IonRow>
            </IonGrid>

            <div className="ion-padding-vertical">&copy; 2021 AfricanLII.org</div>
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
        <IonIcon
          size="large"
          class="feature_icon"
          icon={iconName}
        />
      </IonCol>
      <section className="feature-details">
        <h6>{title}</h6>
        <p>{text}</p>
      </section>
    </div>
  );
};

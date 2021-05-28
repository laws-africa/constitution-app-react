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
          <section className="tab-title">
            <IonCol size="2" class="home-icon ion-no-padding">
              <IonIcon
                icon={
                  "../../assets/images/sec_2__Supremacy_of_the_Constitution.svg"
                }
                onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg";
                }}
              />
            </IonCol>
            <h3>
              Constitution <br /> Guide
            </h3>
          </section>

          <IonRow class="ion-align-items-center right-links ion-justify-content-between">
            <a href="#features">Features</a>{" "}
            <IonButton color="light" href="#installation">Install Now</IonButton>
          </IonRow>
        </IonRow>

        <div className="ion-text-center main-content">
          <h1>Short version of the purpose of this app. </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
          <IonButton color="light" href="#installation">Install Now</IonButton>

          <a href="/home" className="ion-padding-top">Use the web version</a>
        </div>

        <div id="features" className="features-content">
          <h2>Your guide to the constitution</h2>

          <IonGrid>
            <IonRow>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.CONSTITUTION}
                  text="Filium morte multavit si sine causa quae fuerit causa mox videro interea epicurus in sanguinem suum tam egregios viros consectetur"
                  title="Browse the Constitution"
                />

                <Features
                  iconName={svgs.GUIDES}
                  text="Filium morte multavit si sine causa quae fuerit causa mox videro interea epicurus in sanguinem suum tam egregios viros consectetur"
                  title="Guides to the Constitution"
                />

                <Features
                  iconName={svgs.CASES}
                  text="Filium morte multavit si sine causa quae fuerit causa mox videro interea epicurus in sanguinem suum tam egregios viros consectetur"
                  title="Get Cases in Context "
                />
              </IonCol>
              <IonCol size-lg="6">
                <Features
                  iconName={svgs.RULES}
                  text="Filium morte multavit si sine causa quae fuerit causa mox videro interea epicurus in sanguinem suum tam egregios viros consectetur"
                  title="Rules of the National Assembly"
                />

                <Features
                  iconName={svgs.SEARCH}
                  text="Filium morte multavit si sine causa quae fuerit causa mox videro interea epicurus in sanguinem suum tam egregios viros consectetur"
                  title="Find what you’re looking for"
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
                    <li>Go to <a href="https://bit.ly/saconapp" target="_blank">bit.ly/saconapp</a></li>
                    <li>Tap the share icon at the bottom of the screen</li>
                    <li>Scroll down and tap “Add to Home Screen” then tap “Add”</li>
                    <li>To open the app, find it on your home screen</li>
                  </ol>
                </>}

                {tab === 'android' && <>
                  <h6>Install on your Android</h6>

                  <ol>
                    <li>Open your phone's browser</li>
                    <li>Go to <a href="https://bit.ly/saconapp" target="_blank">bit.ly/saconapp</a></li>
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
            <section className="tab-title">
              <IonCol size="2" class="home-icon ion-no-padding">
                <IonIcon
                  icon={
                    "../../assets/images/sec_2__Supremacy_of_the_Constitution.svg"
                  }
                  onError={(e) => {
                    e.currentTarget.src = "../../assets/shapes.svg";
                  }}
                />
              </IonCol>
              <h3>
                Constitution <br /> Guide
              </h3>
            </section>
            <IonCol class="footer-links">
              <a href="#features">Features</a>
              <a href="#installation">Install now</a>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-between ion-padding-vertical last-content ion-align-items-center">

            <span>&copy; 2021 AfricanLII.org</span>

            <IonGrid class="ion-align-items-center">
              <span>Developed By:</span>

              <IonRow>
                <IonCol size="6">
                  <img
                    alt=""
                    src="../../assets/African Lii logo.svg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg";
                    }}
                    onClick={() =>
                      handleSupportersLink("https://africanlii.org/")
                    }
                  />
                </IonCol>
                <IonCol size="6">
                  <img
                    alt=""
                    src="../../assets/03_KAS_Logo_Min_RGB_Blau.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg";
                    }}
                    onClick={() =>
                      handleSupportersLink("https://www.kas.de/en/home")
                    }
                  />
                </IonCol>
                <IonCol size="6">
                  <img
                    alt=""
                    src="../../assets/uc-tlogo@2x.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg";
                    }}
                    onClick={() =>
                      handleSupportersLink("https://www.uct.ac.za/")
                    }
                  />
                </IonCol>
                <IonCol size="6">
                  <img
                    alt=""
                    src="../../assets/Laws.Africa.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg";
                    }}
                    onClick={() =>
                      handleSupportersLink("https://www.uct.ac.za/")
                    }
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRow>
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
          onError={(e) => {
            e.currentTarget.src = "../../assets/shapes.svg";
          }}
        />
      </IonCol>
      <section className="feature-details">
        <h6>{title}</h6>
        <p>{text}</p>
      </section>
    </div>
  );
};

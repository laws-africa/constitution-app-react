import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonIcon,
} from '@ionic/react';
import './Home.css';
import data from "../../assets/data/data.json";
import { getAndClearRedirected } from '../../redirect';
import { TopicItem } from '../../components/topic';
import { Link, Redirect } from "react-router-dom";
import { ActionButton } from '../../components/actionButton';
import { svgs } from '../../assets/svgs';

const Home: React.FC = () => {
  const guides = data.topics;

  // redirect to a url from the 404.html page?
  const path = getAndClearRedirected();
  if (path.length) {
    return <Redirect to={path}/>
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="app-title">
          <img src="/assets/logo.png" alt="logo" className="logo" />
          <h2>Constitution <br/> Compass <img src="/assets/flag.png" className="flag" alt="South African Flag"/></h2>
        </div>
        <hr className="header-divider" />

        <div className="ion-padding-bottom">Browse the Constitution for the provisions that you need.</div>
        <ActionButton icon={svgs.CONSTITUTION} text="Explore the Constitution" routerLink="/constitution" />

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={svgs.GUIDES} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">Guides</h5>
            </IonCol>
            <IonCol size="1">
              <Link className="ion-float-right link-plain" to="/search/guides">Search</Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          Understand the provisions of the Constitution and their implications for parliamentary matters.
        </div>
        <IonList className="ion-margin-bottom ion-padding">
          {guides.slice(0,3).map((guide) => (
            <TopicItem topic={guide} key={guide.id}/>
          ))}
        </IonList>
        <ActionButton routerLink="/guides" icon={svgs.GUIDES} text="Browse All Guides" />

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={svgs.CASES} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">Cases</h5>
            </IonCol>
            <IonCol size="1" className="ion-text-nowrap">
              <Link className="ion-float-right link-plain" to="/cases/">Search</Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          See how the courts have interpreted the Constitution by reading the leading cases on constitutional
          provisions.
        </div>
        <ActionButton routerLink="/search/cases" text="Browse Cases" icon={svgs.CASES} />

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={svgs.RULES} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">Rules of the National Assembly</h5>
            </IonCol>
            <IonCol size="1">
              <Link className="ion-float-right link-plain" to="/search/rules">Search</Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">Browse the Rules of the National Assembly.</div>
        <ActionButton routerLink="/rules" text="Browse Rules" icon={svgs.RULES} />

        <hr className="divider" />

        <p>This app is brought to you by:</p>

        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <a href="https://africanlii.org/"
                 target="_blank"
                 rel="noopener noreferrer"
              >
                <img
                    alt=""
                    src="/assets/African Lii logo.svg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg"
                    }}
                />
              </a>
            </IonCol>
            <IonCol size="6">
              <a href="https://www.kas.de/en/home"
                 target="_blank"
                 rel="noopener noreferrer">
                <img
                    alt=""
                    src="/assets/03_KAS_Logo_Min_RGB_Blau.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg"
                    }}
                />
              </a>
            </IonCol>
            <IonCol size="6">
              <a href="https://www.uct.ac.za/"
                 target="_blank"
                 rel="noopener noreferrer">
                <img
                    alt=""
                    src="/assets/uct-logo.png"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg"
                    }}
                />
              </a>
            </IonCol>

            <IonCol>
              <a href="https://laws.africa/"
                 target="_blank"
                 rel="noopener noreferrer">
                <img
                    alt=""
                    src="/assets/laws-africa-logo.png"
                    onError={(e) => {
                      e.currentTarget.src = "../../assets/shapes.svg"
                    }}
                />
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
        <br />
        <ActionButton routerLink="/help" text="About This App" />
      </IonContent>
    </IonPage>
  );
};

export default Home;

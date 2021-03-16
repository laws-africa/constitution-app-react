import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonIcon,
} from '@ionic/react';
import { people, document, documents, pencilOutline } from 'ionicons/icons';
import './Home.css';
import data from "../../assets/data/data.json";
import { getAndClearRedirected } from '../../redirect';
import { TopicItem } from '../../components/topic';
import { Link, Redirect } from "react-router-dom";
import { handleSupportersLink } from '../../utils';

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
        <h2>South Africa's Constitution</h2>
        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={document} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">The Constitution</h5>
            </IonCol>
            <IonCol size="1">
              <Link className="ion-float-right link-plain" to="/search/constitution">Search</Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">Browse the Constitution for the provisions that you need.</div>
        <IonButton routerLink="/constitution" expand="block">Browse Sections</IonButton>

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-vertical">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={people} />
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
        <IonList>
          {guides.slice(0,3).map((guide) => (
            <TopicItem topic={guide} />
          ))}
        </IonList>
        <IonButton routerLink="/guides" expand="block">Browse All Guides</IonButton>

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-vertical">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={documents} />
            </IonCol>
            <IonCol>
              <h5 className="section-heading">Cases</h5>
            </IonCol>
            <IonCol size="1" className="ion-text-nowrap">
              <Link className="ion-float-right link-plain" to="/cases/">Browse All</Link>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          See how the courts have interpreted the Constitution by reading the leading cases on constitutional
          provisions.
        </div>
        <IonButton routerLink="/search/cases" expand="block">Search Cases</IonButton>

        <hr className="divider" />

        <IonGrid className="ion-no-padding ion-padding-bottom">
          <IonRow>
            <IonCol size="1">
              <IonIcon size="small" icon={pencilOutline} />
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
        <IonButton routerLink="/rules" expand="block">Browse Rules</IonButton>

        <hr className="divider" />

        <p>This app is brought to you by:</p>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <img
                alt=""
                src="../../assets/African Lii logo.svg"
                onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}
                onClick={() => handleSupportersLink('https://africanlii.org/')}
              />
            </IonCol>
            <IonCol size="6">
              <img
                alt=""
                src="../../assets/03_KAS_Logo_Min_RGB_Blau.jpg"
                onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}
                onClick={() => handleSupportersLink('https://www.kas.de/en/home')}
              />
            </IonCol>
            <IonCol size="6">
              <img
                alt=""
                src="../../assets/uct-logo.jpg"
                onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}
                onClick={() => handleSupportersLink('https://www.uct.ac.za/')}
               />

            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton routerLink="/help" expand="block">About This App</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

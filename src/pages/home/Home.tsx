import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
  IonButton,
  IonList,
  IonIcon,
} from '@ionic/react';
import { people, document, documents } from 'ionicons/icons';
import './Home.css';
import data from "../../assets/data/data.json";
import { TopicItem } from '../../components/topic';

const Home: React.FC = () => {
  const guides = data.topics;

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
              <IonRouterLink class="ion-float-right" href="/search/constitution">Search</IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">Browse the Constitution for the provisions that you need.</div>
        <IonButton href="/constitution" expand="block">Browse Sections</IonButton>

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
              <IonRouterLink class="ion-float-right" href="/search/guides">Search</IonRouterLink>
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
        <IonButton href="/guides" expand="block">Browse All Guides</IonButton>

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
              <IonRouterLink class="ion-float-right" href="/cases">Browse All</IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="ion-padding-bottom">
          See how the courts have interpreted the Constitution by reading the leading cases on constitutional
          provisions.
        </div>
        <IonButton href="/search/cases" expand="block">Search Cases</IonButton>

        <hr className="divider" />

        <p>This app is brought to you by:</p>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <img alt="" src="../../assets/African Lii logo.svg" onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
              }}/>
            </IonCol>
            <IonCol size="6">
              <img alt="" src="../../assets/03_KAS_Logo_Min_RGB_Blau.jpg" onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
              }}/>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton href="/help" expand="block">About This App</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

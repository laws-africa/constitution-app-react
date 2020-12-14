import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonRouterLink,
  IonButton,
  IonList,
  IonIcon,
  IonToolbar,
  IonButtons,
  IonTitle
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
        <IonSearchbar placeholder="Find guides, cases or sections..." onIonChange={(e) => (e)}></IonSearchbar>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="large" icon={document} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonRouterLink class="ion-float-right" href="/search/constitution">Search</IonRouterLink>
          </IonButtons>

          <IonTitle>The Constitution</IonTitle>
        </IonToolbar>
        <p>Browse the Constitution for the provisions that you need.</p>
        <IonButton href="/constitution" expand="block">Browse Sections</IonButton>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="large" icon={people} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonRouterLink class="ion-float-right" href="/search/guides">Search</IonRouterLink>
          </IonButtons>

          <IonTitle>Guides</IonTitle>
        </IonToolbar>
        <p>Better understand the provisions of the Constitution and their implications for parlimentary matters.</p>
        <IonList>
          {guides.slice(0,3).map((guide) => (
            <TopicItem page="home" topic={guide} />
          ))}
        </IonList>
        <IonButton href="/guides" expand="block">Browse All Guides</IonButton>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon size="large" icon={documents} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonRouterLink class="ion-float-right" href="/cases">Browse All</IonRouterLink>
          </IonButtons>

          <IonTitle>Cases</IonTitle>
        </IonToolbar>
        <p>See how the courts have interpreted the Constitution by reading the leading cases on constitutional provisions.</p>
        <IonButton href="/search/cases" expand="block">Search Cases</IonButton>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonItem,
  IonRouterLink,
  IonButton,
  IonList,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonThumbnail
} from '@ionic/react';
import { people, document, documents } from 'ionicons/icons';
import './Home.css';
import data from "../../assets/data/data.json";

const Home: React.FC = () => {
  const guides = data.topics;

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>South Africa's Constitution</h2>
        <IonSearchbar placeholder="Find guides, cases or sections..." onIonChange={(e) => (e)}></IonSearchbar>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonIcon size="large" icon={document} />
              </IonCol>
              <IonCol size="7">
                <h4>The Constitution</h4>
              </IonCol>
              <IonCol size="3">
                <IonRouterLink class="ion-float-right" href="/search">Search</IonRouterLink>
              </IonCol>
            </IonRow>
            <p>Browse the Constitution for the provisions that you need.</p>
            <IonButton href="/constitution" expand="block">Browse Sections</IonButton>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonIcon size="large" icon={people} />
              </IonCol>
              <IonCol size="7">
                <h4>Guides</h4>
              </IonCol>
              <IonCol size="3">
                <IonRouterLink class="ion-float-right" href="/search">Search</IonRouterLink>
              </IonCol>
            </IonRow>
            <p>Better understand the provisions of the Constitution and their implications for parlimentary matters.</p>
            <IonSegment value="all">
              <IonSegmentButton value="all">
                <IonLabel>Most Popular</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                <IonLabel>Recently Viewed</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonList>
            {guides.slice(0,3).map((guide) => (
              <IonItem key={guide.id} routerLink={"/guides/" + guide.id}>
                <IonThumbnail slot="start">
                  <img src={"../../assets/images/" + guide.id + ".svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={guide.title} />
                </IonThumbnail>
                <IonLabel>
                  <h3>{guide.title}</h3>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonItem>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonButton href="/guides" expand="block">Browse All Guides</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonIcon size="large" icon={documents} />
              </IonCol>
              <IonCol size="6">
                <h4>Cases</h4>
              </IonCol>
              <IonCol size="4">
                <IonRouterLink class="ion-float-right" href="/cases">Browse All</IonRouterLink>
              </IonCol>
            </IonRow>
            <p>See how the courts have interpreted the Constitution by reading the leading cases on constitutional provisions.</p>
            <IonButton href="/search" expand="block">Search Cases</IonButton>
          </IonGrid>
        </IonItem>
        <p>This app is brought to you by:</p>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <img alt="" src="../../assets/African Lii logo.ai" onError={(e) => {
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

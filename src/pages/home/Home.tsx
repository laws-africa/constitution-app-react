import React from 'react';
import {
  IonContent,
  IonPage,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonAvatar,
  IonItem,
  IonRouterLink,
  IonButton,
  IonThumbnail,
  IonLabel
} from '@ionic/react';
import { people, document, documents } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonContent>
        <IonListHeader>
          <h2>South Africa's Constitution</h2>
        </IonListHeader>
        <IonSearchbar placeholder="Find guides, cases or sections..." onIonChange={(e) => (e)}></IonSearchbar>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonAvatar>
                  <img src={document} />
                </IonAvatar>
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
                <IonAvatar>
                  <img src={people} />
                </IonAvatar>
              </IonCol>
              <IonCol size="7">
                <h4>Guides</h4>
              </IonCol>
              <IonCol size="3">
                <IonRouterLink class="ion-float-right" href="/search">Search</IonRouterLink>
              </IonCol>
            </IonRow>
            <p>Better understand the provisions of the Constitution and their implications for parlimentary matters.</p>
            <IonItem>
              <IonThumbnail slot="start">
                <img src={document} onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}/>
                </IonThumbnail>
                <IonLabel>
                  <h4>Title</h4>
                </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail slot="start">
                <img src={document} onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}/>
                </IonThumbnail>
                <IonLabel>
                  <h4>Title</h4>
                </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail slot="start">
                <img src={document} onError={(e) => {
                  e.currentTarget.src = "../../assets/shapes.svg"
                }}/>
                </IonThumbnail>
                <IonLabel>
                  <h4>Title</h4>
                </IonLabel>
            </IonItem>
            <IonButton href="/guides" expand="block">Browse All Guides</IonButton>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonAvatar>
                  <img src={documents} />
                </IonAvatar>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;

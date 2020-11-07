import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonGrid } from '@ionic/react';
import './Help.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <h3>About the Constitution App</h3>
          </IonRow>
          <IonRow>
            <p>
              The Constitution App is developed by the Democratic Governance and Rights Unit of the Faculty of Law, University
              of Cape Town in collaboration with AfricanLII and Laws.Africa, with funding support from the Konrad Adenauer
              Stiftung. The aim of the project is to equip South African parliamentarians with accurate and authoritative
              information on South African constitutional law.
            </p>
            <p>
              In this application, you will find an updated version of the South African constitution, together with
              commentary of its key provisions and their interpretation by South Africa’s highest courts. The app allows you
              to browse through and read summaries as well as the full text of constitutional court judgments. The content of
              this application is available off-line and will be updated twice a year.
            </p>
          </IonRow>
          <IonRow>
            <h3>Contact</h3>
          </IonRow>
          <IonRow>
            <p>
              Feel free to forward constructive feedback and suggestions to info@africanlii.org.
            </p>
          </IonRow>
          <IonRow>
            <h3>Copyright</h3>
          </IonRow>
          <IonRow>
            <p>
              The contents of this app is licensed under Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) Creative
              Commons license. View the license here: https://creativecommons.org/licenses/by-nc/4.0/
            </p>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
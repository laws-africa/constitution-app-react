import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  IonButton,
  IonIcon,
  withIonLifeCycle
} from '@ionic/react';
import { star } from 'ionicons/icons';
import './Constitution.css';
import { TOCList } from '../../components/constitutionTOC';

class ConstitutionTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-padding">
            <h2>Constitution of the Republic of South Africa</h2>

            <IonButton routerLink={"/constitution/full"} expand="block" color="light" className="shadow">
              <IonIcon slot="start" icon={star} />
              Read the full Constitution
            </IonButton>
          </div>

          <IonList>
            <IonListHeader>
              <IonLabel>Table of Contents</IonLabel>
            </IonListHeader>
            <TOCList/>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(ConstitutionTOC);

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
import { arrowForward, document } from 'ionicons/icons';
import './Constitution.css';
import { TOCList } from '../../components/constitutionTOC';

class ConstitutionTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-padding">
            <h2>Constitution of the Republic of South Africa</h2>

            <IonButton routerLink={"/constitution/full"} mode="ios" expand="block" color="light" className="shadow">
              <IonIcon slot="start" icon={document} />
              Read the full Constitution
              <IonIcon mode="ios" color="medium" slot="end" icon={arrowForward} />
            </IonButton>
          </div>

          <IonList className="ion-padding-end">
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

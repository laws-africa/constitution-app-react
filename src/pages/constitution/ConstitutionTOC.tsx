import React from 'react';
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  withIonLifeCycle
} from '@ionic/react';
import './Constitution.css';
import { TOCList } from '../../components/toc';

class ConstitutionTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <IonListHeader>
            <IonLabel>Constitution of the Republic of South Africa</IonLabel>
          </IonListHeader>
          <IonList>
            <IonItem routerLink={"/constitution/full"}>Read the full Constitution</IonItem>
          </IonList>
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

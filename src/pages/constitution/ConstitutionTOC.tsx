import React from 'react';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonPage,
  withIonLifeCycle,
  IonIcon,
  IonButton
} from '@ionic/react';
import {document } from 'ionicons/icons';
import './Constitution.css';
import { TOCList } from '../../components/constitutionTOC';
import { ActionButton } from '../../components/actionButton';

class ConstitutionTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-padding">
            <section className="tab-title ion-justify-content-between">
              <h2><IonIcon slot="start" class="ion-margin-end" icon={document}></IonIcon>Constitution of the Republic of South Africa</h2>
              <IonButton className="ion-no-padding" fill="clear" routerLink={"/search/constitution"}>Search</IonButton>
            </section>

            <hr className="divider" />

            <ActionButton routerLink="/constitution/full" icon={document} text="Read the Full Constitution"  />
          </div>

          <IonList>
            <IonListHeader>
              <IonLabel class="contents-label">Table of Contents</IonLabel>
            </IonListHeader>
            <div className="ion-padding-start"><hr className="divider" /></div>
            <TOCList/>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(ConstitutionTOC);

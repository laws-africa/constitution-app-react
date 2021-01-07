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
import './Rules.css';
import { TOCList } from '../../components/rulesTOC';

class RulesTOC extends React.Component {
  render() {
    return (
      <IonPage>
        <IonContent>
          <IonListHeader>
            <IonLabel>Rules of the Republic of South Africa</IonLabel>
          </IonListHeader>
          <IonList>
            <IonItem routerLink={"/rules/full"}>Read the full Rules of the National Assembly</IonItem>
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

export default withIonLifeCycle(RulesTOC);

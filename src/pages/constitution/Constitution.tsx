import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import * as Data from '../../assets/data/constitution.json';
import './Constitution.css';

const Tab1: React.FC = () => {

  const constitutionData = () => {
    return {
      __html: Data
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Constitution</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="akoma-ntoso" dangerouslySetInnerHTML={{__html: Data.body}}></div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Tab1;
import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import { CaseItem } from "../../components/case";

const Cases: React.FC = () => {
  const cases = data.cases;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <div className="ion-padding">
            Summaries of cases from the Constitutional Court.
          </div>
        </IonText>
        <IonList>
          {cases.map((kase) => (
            <CaseItem kase={kase}/>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Cases;

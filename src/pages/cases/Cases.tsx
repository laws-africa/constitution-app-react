import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import parse from 'html-react-parser';

const Topics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-title">Cases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonText>
          For short summaries of cases from the Constitutional Court, please click on the case which you want to read more about.
        </IonText>
        <IonList>
          {data.cases.map((article, index) => (
            <IonItem key={index} routerLink={"/cases/" + article.id}>
              <IonLabel>
                <h3>{ article.title }</h3>
                <p>{ parse(article.snippet) }</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;
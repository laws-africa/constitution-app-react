import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  IonButtons,
  IonButton
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import { arrowBack } from 'ionicons/icons';

const Case: React.FC = () => {
  let thisCase: any = {};
  const { id } = useParams();
  thisCase = data.cases.find((item) => item.id === id);
  let topics = [];

  for(const id of thisCase.topics) {
    const topic = data.topics.find((topic) => topic.id === id);
    if(topic) topics.push(topic);
  }

  const previous = () => {
    window.history.back();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={previous}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle class="ion-title">
            {thisCase.title}
            </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <h3>{ thisCase.title }</h3>
          <div className="case-summary">{ parse(thisCase.summary) }</div>
        </div>
        {topics.length > 0 && (
          <IonList>
            <IonListHeader>
              <IonLabel>Related Topics</IonLabel>
            </IonListHeader>
            {topics.map((topic: any, index: any) => (
              <IonItem key={index} routerLink={"/topics/" + topic.id}>
                <IonThumbnail slot="start">
                  <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => { e.currentTarget.src = "../../assets/shapes.svg" }} alt={topic.title} />
                </IonThumbnail>
                <IonLabel>
                  <h3>{ topic.title }</h3>
                  <p>{ parse(topic.snippet) }</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Case;

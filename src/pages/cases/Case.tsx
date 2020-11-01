import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonThumbnail,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";

const Case: React.FC = () => {
  let thisCase: any = {}
  const { id } = useParams()
  thisCase = data.cases.find((item) => item.id === id)
  console.log(thisCase)
  let topics = []

  for(const id of thisCase.topics) {
    const topic = data.topics.find((topic) => topic.id === id)
    if(topic) topics.push(topic)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{thisCase.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>{parse(thisCase.summary)}</IonText>
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
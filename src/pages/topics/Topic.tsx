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
import './Topics.css';
import parse from 'html-react-parser';
import { Route, useParams } from "react-router-dom";

const Topic: React.FC = () => {
  let topic: any = {}
  const { id } = useParams()
  topic = data.topics.find((topic) => topic.id === id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{ topic.title }</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        foobar
      </IonContent>
    </IonPage>
  );
};

export default Topic;
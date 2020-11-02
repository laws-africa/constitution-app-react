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
  IonListHeader,
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Topics.css';
import parse from 'html-react-parser';

const Topics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-title">
            <IonText>Topics</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>
          For legal commentary for sections and Chapters of the Constitution, please click on the topic which you want to read more about.
        </IonText>
        <IonList>
          {data.topics.map((topic, index) => (
            <IonItem key={index} routerLink={"topics/" + topic.id}>
              <IonThumbnail slot="start">
                <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={topic.title} />
              </IonThumbnail>
              <IonListHeader>
                { topic.title }
              </IonListHeader>
              <IonLabel>
                { parse(topic.snippet) }
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;
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
            Guides
          </IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent>
          <IonText>
            <div className="ion-padding">
              Guides to the sections the Constitution.
            </div>
          </IonText>
          <IonList>
            {data.topics.map((topic, index) => (
              <IonItem key={index} routerLink={"guides/" + topic.id}>
                <IonThumbnail slot="start">
                  <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={topic.title} />
                </IonThumbnail>
                <IonLabel>
                  <h3>{ topic.title }</h3>
                  <p>{ parse(topic.snippet) }</p>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;

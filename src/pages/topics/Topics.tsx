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
import './Topics.css';
import { TopicItem } from '../../components/topic';

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
            {data.topics.map((topic) => (
              <TopicItem topic={topic} />
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Topics;

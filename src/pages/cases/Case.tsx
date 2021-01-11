import React, {useState} from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonListHeader,
  IonIcon,
  IonButtons,
  IonButton,
  useIonViewWillEnter
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import parse from 'html-react-parser';
import { RouteComponentProps } from "react-router-dom";
import { arrowBack } from 'ionicons/icons';
import { TopicItem } from '../../components/topic';

interface Props extends RouteComponentProps<{ id: string; }> { }

const Case: React.FC<Props> = ({ match }) => {
  const [thisCase, setCase] = useState({title: '', summary: ''});
  const [topics, setTopics] = useState([]);

  useIonViewWillEnter(() => {
    const thisCase = data.cases.find(c => c.id === match.params.id);
    // @ts-ignore
    setCase(thisCase);

    let topics: any[] = [];
    if (thisCase) {
      for (const id of thisCase.topics) {
        // @ts-ignore
        const topic = data.topics.find((topic) => topic.id === id);
        if (topic) topics.push(topic);
      }
    }

    // @ts-ignore
    setTopics(topics);
  });

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
      <IonContent>
        <div className="ion-padding">
          <h3>{ thisCase.title }</h3>
          <div className="case-summary">{ parse(thisCase.summary) }</div>
        </div>

        {topics.length > 0 && (
          <IonList className="ion-padding-bottom">
            <IonListHeader color="light">
              <IonLabel>Related Guides</IonLabel>
            </IonListHeader>
            {topics.map((topic: any, index: any) => (
              <TopicItem topic={topic} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Case;

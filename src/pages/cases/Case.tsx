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
  const [thisCase, setCase] = useState({
    title: '', snippet: '', facts_and_issues: '', right_and_principle: '', interpretation: '',
  });
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
          <div className="case-content">{ parse(thisCase.snippet) }</div>

          {thisCase.facts_and_issues.length > 0 &&
          <>
            <h4>What was the case about?</h4>
            <div className="case-content">{parse(thisCase.facts_and_issues)}</div>
          </>
          }

          {thisCase.right_and_principle.length > 0 &&
          <>
            <h4>What did the court say about the right or principle?</h4>
            <div className="case-content">{parse(thisCase.right_and_principle)}</div>
          </>
          }

          {thisCase.interpretation.length > 0 &&
          <>
            <h4>How did the court apply their interpretation?</h4>
            <div className="case-content">{parse(thisCase.interpretation)}</div>
          </>
          }
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

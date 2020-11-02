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
  IonListHeader,
  IonIcon
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Topics.css';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import * as Constitution from '../../assets/data/constitution.json';
import { arrowBack } from 'ionicons/icons';

function getObject(array: [], key: string, value: string) {
  var o;
  array.some(function iter(a: any) {
    if (a[key] === value) {
      o = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  });
  return o;
}

const Topic: React.FC = () => {
  let constitutionData: any = (Constitution as any).default
  let topic: any = {}
  let cases = []
  let references = []
  const { id } = useParams()
  topic = data.topics.find((topic) => topic.id === id)
  for (const reference of topic.references) {
    const linkedReference = getObject(constitutionData.toc, "id", reference);
    references.push(linkedReference)
  }
  for (const caseId of topic.cases) {
    const linkedCase = data.cases.find((c) => c.id === caseId);
    cases.push(linkedCase);
  }

  const back = () => {
    window.history.back()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-title">
            <IonIcon class="ion-icon" icon={arrowBack} onClick={back} />
            {topic.title}
            </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>{parse(topic.content)}</IonText>
          {cases.length > 0 && (
          <IonList>
            <IonListHeader>
              <IonLabel>Related Cases</IonLabel>
            </IonListHeader>
            {cases.map((c: any, index) => (
              <IonItem key={index} routerLink={"/cases/" + c.id}>
                <IonLabel>
                  <h3>{c.title}</h3>
                  <p>{parse(c.snippet)}</p>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
        )}
        {references.length > 0 &&
        <IonList>
          <IonListHeader>
            <IonLabel>References</IonLabel>
          </IonListHeader>
          {references.map((reference: any, index) => (
          <IonItem key={index} routerLink={"/constitution/" + reference.id}>
            <IonLabel>
              <h3>{ reference.title }</h3>
            </IonLabel>
          </IonItem>
          ))}
        </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Topic;
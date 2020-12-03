import React, { useState, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonButtons,
  IonButton,
  IonThumbnail,
  IonIcon,
  useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { arrowBack } from 'ionicons/icons';
import data from "../../assets/data/data.json";
import './Topics.css';
import parse from 'html-react-parser';
import { constitutionRoot, getTOCEntry } from '../../data/constitution';

interface Props extends RouteComponentProps<{ id: string; }> { }

const Topic: React.FC<Props> = ({ match }) => {
  const [topic, setTopic] = useState({title: '', content: ''});
  const [cases, setCases] = useState([]);
  const [references, setReferences] = useState([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useIonViewWillEnter(() => {

    const topic = data.topics.find(t => t.id === match.params.id);
    // @ts-ignore
    setTopic(topic);

    let cases = [];
    let references: any[] = [];

    if (topic) {
      for (const reference of topic.references) {
        const match = getTOCEntry(reference);
        if (match) references.push(match);
      }
      for (const caseId of topic.cases) {
        const linkedCase = data.cases.find((c) => c.id === caseId);
        cases.push(linkedCase);
      }
    }

    // @ts-ignore
    setCases(cases);
    // @ts-ignore
    setReferences(references);

    if (match.params.id && rootRef.current) {
      let id = match.params.id.split("_", 2).join("_");
      let provision = constitutionRoot.getElementById(id);
      if (provision) {
        // remove current elements
        while (rootRef.current.hasChildNodes()) rootRef.current.childNodes[0].remove();
        rootRef.current.appendChild(provision.cloneNode(true));
      }
    }
  });

  const previous = () => {
    window.history.back()
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
          <IonTitle>{topic.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h3>{ topic.title }</h3>
        </div>
        <div className="ion-padding akn-insert">
          <div className="akoma-ntoso" ref={rootRef}></div>
        </div>

        <div className="ion-padding">
          <div className="topic-content">{ parse(topic.content) }</div>
        </div>

        {references.length > 0 &&
        <IonList className="ion-padding-bottom">
          {references.map((ref: any) => (
            <IonItem key={ref.id} routerLink={"/constitution/provision/" + ref.id} color="primary" lines="none">Section { ref.title }</IonItem>
          ))}
        </IonList>
        }

        {cases.length > 0 && (
          <IonList className="ion-padding-bottom">
            <IonListHeader color="light">
              <IonLabel>Related Cases</IonLabel>
            </IonListHeader>
            {cases.map((c: any, index) => (
              <IonItem key={index} routerLink={"/cases/" + c.id}>
                <IonThumbnail slot="start">
                  <img src={"../../assets/images/case.svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={c.title} />
                </IonThumbnail>
                <IonLabel>
                  <h3>{c.title}</h3>
                  <p>{parse(c.snippet)}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Topic;

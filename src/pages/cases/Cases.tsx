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
  IonThumbnail
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Cases.css';
import parse from 'html-react-parser';

const Cases: React.FC = () => {
  const cases = data.cases;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <div className="ion-padding">
            Summaries of cases from the Constitutional Court.
          </div>
        </IonText>
        <IonList>
          {cases.map((article, index) => (
            <IonItem key={index} routerLink={"/cases/" + article.id}>
              <IonThumbnail slot="start">
                <img src={"../../assets/images/case.svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={article.title} />
              </IonThumbnail>
              <IonLabel>
                <h3>{article.title}</h3>
                <span>{parse(article.snippet)}</span>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Cases;

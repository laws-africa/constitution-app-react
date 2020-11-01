import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Home.css';
import parse from 'html-react-parser';

const Home: React.FC = () => {
  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>
          Highlights
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {data.topics.filter((o) => o.highlighted === true).map((highlight, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{ highlight.title }</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{ parse(highlight.snippet) }</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonListHeader>
          Popular Topics
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {data.topics.filter((o) => o.featured === true).map((topic, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{ topic.title }</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="3">
                          <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={topic.title} />
                        </IonCol>
                        <IonCol size="9">
                          { parse(topic.snippet) }
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonListHeader>
          Popular Cases
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {data.cases.filter((o) => o.featured === true).map((article, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{ article.title }</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{ parse(article.snippet) }</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
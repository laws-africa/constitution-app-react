import React, { useMemo } from 'react';
import {
  IonContent,
  IonPage,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import data from "../../assets/data/data.json";
import './Home.css';
import parse from 'html-react-parser';

const Home: React.FC = () => {

  const moemorizedCases = useMemo(() =>  data.cases, []);
  const moemorizedTopics = useMemo(() =>  data.topics, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonListHeader>
          Highlights
        </IonListHeader>
        <IonGrid>
          <IonRow>
            {moemorizedTopics.filter((o) => o.highlighted === true).map((highlight, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard routerLink={"topics/" + highlight.id}>
                  <IonCardHeader>
                    <IonCardTitle>{highlight.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{parse(highlight.snippet)}</IonCardContent>
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
            {moemorizedTopics.filter((o) => o.featured === true).map((topic, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard routerLink={"topics/" + topic.id}>
                  <IonCardHeader>
                    <IonCardTitle>{topic.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="3">
                          <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => { e.currentTarget.src = "../../assets/shapes.svg" }} alt={topic.title} />
                        </IonCol>
                        <IonCol size="9">
                          {parse(topic.snippet)}
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
            {moemorizedCases.filter((o) => o.featured === true).map((article, index) => (
              <IonCol size="12" size-sm="6" size-xl="4" key={index}>
                <IonCard routerLink={"cases/" + article.id}>
                  <IonCardHeader>
                    <IonCardTitle>{article.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{parse(article.snippet)}</IonCardContent>
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

import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonList,
  IonButton,
  IonCol,
  IonIcon,
} from "@ionic/react";
import data from "../../assets/data/data.json";
import "./Topics.css";
import { TopicItem } from "../../components/topic";
import { svgs } from "../../assets/svgs";

const Topics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-padding-horizontal ion-padding-top">
        <section className="tab-title">
          <IonCol size="1" class="icon ion-no-padding">
            <IonIcon size="small" icon={svgs.GUIDES}></IonIcon>
          </IonCol>
          <h2>Guides</h2>
          <IonButton
            className="ion-no-padding"
            fill="clear"
            routerLink={"/search/guides"}
          >
            Search
          </IonButton>
        </section>
        <hr className="header-divider" />
      </IonHeader>
      <IonContent>
        <IonText>
          <div className="ion-padding">
            Guides to the sections the Constitution.
            <hr className="list-divider" />
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

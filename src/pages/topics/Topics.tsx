import React from "react";
import {
  IonContent,
  IonPage,
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
      <IonContent>
        <div className="ion-padding">
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

          <p>Guides to the sections the Constitution.</p>
          <hr className="list-divider" />
        </div>
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

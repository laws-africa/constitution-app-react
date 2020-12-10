import {IonItem, IonLabel, IonThumbnail} from "@ionic/react";
import React from "react";

interface HomeTopicProps {
  topic: any
}

export const HomeTopic: React.FC<HomeTopicProps> = ({ topic }) => {
  return (
    <IonItem key={topic.id} routerLink={"/guides/" + topic.id}>
      <IonThumbnail slot="start">
        <img src={"../../assets/images/" + topic.id + ".svg"} onError={(e) => {
          e.currentTarget.src = "../../assets/shapes.svg"
        }} alt={topic.title}/>
        </IonThumbnail>
        <IonLabel>
          <h3>{topic.title}</h3>
        </IonLabel>
    </IonItem>
  );
};

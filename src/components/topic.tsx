import { IonCard, IonCardContent, IonCol } from "@ionic/react";
import parse from "html-react-parser";
import React from "react";
import { TopicIcon } from "./topicIcon/topicIcon";
import { Guide } from "../data/guides";

interface TopicItemProps {
  topic: Guide;
}

export const TopicItem: React.FC<TopicItemProps> = ({ topic }) => {
  return (
    <IonCard
      className="topic-item ion-no-margin ion-margin-vertical"
      key={"topic-" + topic.id}
      routerLink={"/guides/" + topic.id}
    >
      <div>
        <IonCol size="2">
          <TopicIcon topic={topic} />
        </IonCol>
        <IonCardContent className="ion-margin-start ion-no-padding ion-padding-horizontal">
          <h3 className="ion-text-wrap">{topic.title}</h3>
          <div className="ion-text-wrap">{parse(topic.snippet)}</div>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

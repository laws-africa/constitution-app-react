import {IonCard, IonCardContent, IonCol, IonIcon} from "@ionic/react";
import parse from "html-react-parser";
import React from "react";

interface TopicItemProps {
  topic: any,
}

export const TopicItem: React.FC<TopicItemProps> = ({ topic }) => {
  return (
    <IonCard
      class="topic-item"
      key={"topic-" + topic.id}
      routerLink={"/guides/" + topic.id}
    >
      <div>
        <IonCol>
          <IonIcon
            size="large"
            icon={"../../assets/images/" + topic.id + ".svg"}
            onError={(e) => {
              e.currentTarget.src = "../../assets/shapes.svg";
            }}
          ></IonIcon>
        </IonCol>
        <IonCardContent>
          <h3 className="ion-text-wrap">{topic.title}</h3>
          <p className="ion-text-wrap">{parse(topic.snippet)}</p>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

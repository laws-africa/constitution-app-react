import { IonCard, IonIcon } from "@ionic/react";
import React from "react";
import "./topicIcon.css";

interface TopicIconProps {
  topic: any;
}

export const TopicIcon: React.FC<TopicIconProps> = ({ topic }) => {
  const formatTitle = (str: string) => {
    return str.substring(str.indexOf(":") + 1);
  };
  return (
    <IonCard className="topic-icon ion-no-margin">
      <div>
        <span className="guide">A Guide to</span>
        <div className="topic_title">{formatTitle(topic.title)}</div>
        <IonIcon
          size="large"
          className="main_icon"
          icon={"../../assets/images/" + topic.id + ".svg"}
          onError={(e) => {
            e.currentTarget.src = "../../assets/shapes.svg";
          }}
        ></IonIcon>
      </div>
    </IonCard>
  );
};

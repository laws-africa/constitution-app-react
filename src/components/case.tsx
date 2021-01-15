import {IonItem, IonLabel, IonThumbnail} from "@ionic/react";
import parse from "html-react-parser";
import React from "react";

interface CaseItemProps {
  kase: any
}

export const CaseItem: React.FC<CaseItemProps> = ({ kase }) => {
  return (
    <IonItem key={kase.id} routerLink={"/cases/" + kase.id}>
      <IonThumbnail slot="start">
        <img src={"../../assets/images/case.svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={kase.title} />
      </IonThumbnail>
      <IonLabel>
        <h3 className="ion-text-wrap">{kase.title}</h3>
      </IonLabel>
    </IonItem>
  );
};

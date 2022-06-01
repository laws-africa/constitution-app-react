import {IonItem, IonLabel, IonThumbnail} from "@ionic/react";
import React from "react";
import parse from "html-react-parser";
import {Case} from "../data/cases";

interface CaseItemProps {
  kase: Case
}

export const CaseItem: React.FC<CaseItemProps> = ({ kase }) => {
  return (
    <IonItem key={"case-" + kase.id} routerLink={"/cases/" + kase.id}>
      <IonThumbnail slot="start">
        <img src={"../../assets/images/case.svg"} onError={(e)=>{e.currentTarget.src = "../../assets/shapes.svg"}} alt={kase.title} />
      </IonThumbnail>
      <IonLabel>
        <h3 className="ion-text-wrap">{kase.title}</h3>
        <p className="ion-text-wrap">{parse(kase.snippet || '')}</p>
      </IonLabel>
    </IonItem>
  );
};

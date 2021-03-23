import { IonCard, IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React from "react";

interface ActionButtonProps {
  routerLink: string;
  icon?: any;
  text: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({ routerLink, icon, text }) => {
  return (
    <IonCard button routerLink={routerLink} mode="ios" className="action-button shadow ion-padding ion-no-margin">
      <div>
        {icon && (<IonIcon slot="start" icon={icon} />)}
        {text}
        <IonIcon mode="ios" color="medium" slot="end" icon={arrowForward} />
      </div>
    </IonCard>
  );
};
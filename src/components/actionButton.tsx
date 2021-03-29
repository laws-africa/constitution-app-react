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
    <IonCard button routerLink={routerLink} className="action-button shadow ion-no-margin">
      <div>
        {icon && (<IonIcon size="small" slot="start" icon={icon} />)}
        {text}
        <IonIcon size="small" color="medium" slot="end" icon={arrowForward} />
      </div>
    </IonCard>
  );
};
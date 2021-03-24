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
    <IonCard button routerLink={routerLink} className="action-button shadow ion-no-margin chapter">
      <div>
        {icon && (<IonIcon size="large" slot="start" icon={icon} />)}
        {text}
        <IonIcon size="large" color="medium" slot="end" icon={arrowForward} />
      </div>
    </IonCard>
  );
};
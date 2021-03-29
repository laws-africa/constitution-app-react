import { IonCard, IonCardContent, IonCol, IonIcon } from "@ionic/react";
import React from "react";

interface SearchConstitutionProps {
  provision: any;
}

export const SearchConstitution: React.FC<SearchConstitutionProps> = ({ provision }) => {
  return (
    <IonCard
      class="topic-item ion-no-margin ion-margin-vertical"
      key={provision.id}
      routerLink={"/constitution/provision/" + provision.id}
    >
      <div>
        <IonCol size="1">
          <IonIcon
            size="large"
            icon={
              "../../assets/images/Co-operative_Government_and_Intergovernmental_Relations.svg"
            }
            onError={(e) => {
              e.currentTarget.src = "../../assets/shapes.svg";
            }}
          ></IonIcon>
        </IonCol>
        <IonCardContent className="ion-margin-start">
          <h3 className="ion-text-wrap">{provision.title}</h3>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

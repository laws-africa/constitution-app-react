import { IonCard, IonCardContent, IonCol, IonIcon } from "@ionic/react";
import React from "react";
import { svgs } from "../assets/svgs";
import { searchTopics } from "../data/search";

interface SearchConstitutionProps {
  provision: any;
}

export const SearchConstitution: React.FC<SearchConstitutionProps> = ({
  provision,
}) => {
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
              searchTopics(provision.id)
                ? "../../assets/images/" + searchTopics(provision.id) + ".svg"
                : svgs.CONSTITUTION
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

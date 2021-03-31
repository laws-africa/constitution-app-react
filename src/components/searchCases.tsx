import { IonCard, IonCardContent } from "@ionic/react";
import parse from "html-react-parser";
import React from "react";

interface SearchCasesProps {
  caseItem: any;
}

export const SearchCases: React.FC<SearchCasesProps> = ({
  caseItem,
}) => {
  return (
    <IonCard
      class="case-item ion-no-margin ion-margin-vertical"
      key={"case-" + caseItem.id}
      routerLink={"/cases/" + caseItem.id}
    >
      <div>
        <IonCardContent>
          <h3 className="ion-text-wrap">{caseItem.title}</h3>
          <p className="ion-text-wrap">{parse(caseItem.snippet)}</p>
        </IonCardContent>
      </div>
    </IonCard>
  );
};

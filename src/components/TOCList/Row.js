import React from "react";
import { IonItem } from "@ionic/react";

const Row = ({ data, clickItemData }) => {
  const props = {
    ...clickItemData.overrideClickEvt ? {
      onClick: () => clickItemData.overrideClickEvt(data)
    } : {
      routerLink: `${clickItemData.baseRoute}/${data.id}`
    }
  };
  return (
      <div
          // ref={root}
          style={{ marginLeft: `${16 * data.depth}px` }}>
        <IonItem class={data.type === "chapter" ? "chapter" : ""} {...props}>
          {data.title}
        </IonItem>
      </div>
  );
};
export default React.memo(Row);

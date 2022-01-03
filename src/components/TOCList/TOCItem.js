import React from "react";
import { IonItem } from "@ionic/react";

const TOCItem = ({ item, clickItemData }) => {
  const props = {
    ...clickItemData.overrideClickEvt ? {
      onClick: () => clickItemData.overrideClickEvt(item)
    } : {
      routerLink: `${clickItemData.baseRoute}/${item.id}`
    }
  };

  return (
      <div style={{
        marginLeft: `${16 * item.depth}px`
      }}>
        <IonItem class={item.type === "chapter" ? "chapter" : ""} {...props}>
          {item.title}
        </IonItem>
      </div>
  );
};

export default TOCItem

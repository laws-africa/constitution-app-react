import React from "react";
import { IonItem } from "@ionic/react";
import { iTOCItem } from "./index";

interface iRow {
  data: iTOCItem,
  baseRoute?: string,
  overrideClickEvt?: ((itemData: any) => any) | undefined,
}

const defaultProps: iRow = {
  data: {},
  baseRoute: "",
  overrideClickEvt: undefined
}

const Row = ({ data, baseRoute, overrideClickEvt }: iRow) => {
  const props = {
    ...overrideClickEvt ? {
      onClick: () => overrideClickEvt(data)
    } : {
      routerLink: `${baseRoute}/${data.id}`
    }
  };
  return (
      <div style={{ marginLeft: `${16 * data.depth}px` }}>
        <IonItem class={data.type === "chapter" ? "chapter" : ""} {...props}>
          {data.title}
        </IonItem>
      </div>
  );
};
export default Row;

Row.defaultProps = defaultProps;

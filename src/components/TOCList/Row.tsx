import React from "react";
import { IonItem } from "@ionic/react";
import { ITOCItem } from "./index";

interface IRow {
  data: ITOCItem,
  prependRoute?: string,
  overrideClickEvt?: ((itemData: any) => any) | undefined,
}

const defaultProps: IRow = {
  data: {},
  prependRoute: "",
  overrideClickEvt: undefined
}

const Row = ({ data, prependRoute, overrideClickEvt }: IRow) => {
  const props = {
    ...overrideClickEvt ? {
      onClick: () => overrideClickEvt(data)
    } : {
      routerLink: `${prependRoute}/${data.id}`
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

import React from "react";
import { IonItem } from "@ionic/react";
import { toc } from "../data/constitution";

interface TOCListProps {
  onClick?: any;
}

// only render provisions with ids
const provisions = toc.items.filter((c: any) => c.id);

export const TOCList: React.FC<TOCListProps> = ({ onClick }) => {
  return (
      <div>
        {provisions.map((item: any) => {
          return (
              <div key={item.id}>
                <TOCItem item={item} onClick={onClick}/>
              </div>
          );
        })}
      </div>
  );
};

interface TOCItemProps {
  item: any;
  onClick?: any;
}

export const TOCItem: React.FC<TOCItemProps> = ({ item, onClick }) => {
  const kids = (item.children || []).filter((c: any) => c.id);
  const props = onClick ? {onClick: () => onClick(item)} : {routerLink: '/constitution/provision/' + item.id};

  return (
    <div>
      <IonItem class={item.type === "chapter" ? "chapter" : ""} {...props}>
        {item.title}
      </IonItem>
      {kids.length > 0 && (
        <div className="ion-padding-start">
          {kids.map((child: any) => {
            return <TOCItem key={child.id} item={child} onClick={onClick} />;
          })}
        </div>
      )}
    </div>
  );
};

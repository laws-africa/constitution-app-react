import React from "react";
import { IonItem } from "@ionic/react";
import { toc } from "../data/rules";

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
                <RuleTOCItem item={item} onClick={onClick}/>
              </div>
          );
        })}
      </div>
  );
};

interface RuleTOCItemProps {
  item: any;
  onClick?: any;
}

export const RuleTOCItem: React.FC<RuleTOCItemProps> = ({ item, onClick }) => {
  const kids = (item.children || []).filter((c: any) => c.id);
  const props = onClick ? {onClick: () => onClick(item)} : {routerLink: '/rules/provision/' + item.id};

  return (
    <div>
      <IonItem class={item.type === 'chapter' ? "chapter" : ""} {...props}>
        {item.title}
      </IonItem>
      {kids.length > 0 && (
        <div className="ion-padding-start">
          {kids.map((child: any) => {
            return (
              <RuleTOCItem key={child.id} item={child} onClick={onClick} />
            );
          })}
        </div>
      )}
    </div>
  );
};

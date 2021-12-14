import React from "react";
import { IonItem } from "@ionic/react";
import { toc } from "../data/rules";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useWindowResize } from "../hooks/useWindowResize";
import { RowPropsType } from "../common-types";

interface TOCListProps {
  onClick?: any;
}

export const TOCList: React.FC<TOCListProps> = ({ onClick }) => {

  const Row = ({ index, setSize, data, windowWidth }: RowPropsType ) => {
    const rowRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => {
      if(rowRef && rowRef.current) {
        // @ts-ignore
        setSize(String(index), rowRef.current.getBoundingClientRect().height);
      }
    }, [setSize, index, windowWidth])
    return (
        <div
            // @ts-ignore
            ref={rowRef}
        >
          <RuleTOCItem
              item={data[index]}
              onClick={onClick}
          />
        </div>
    )
  };

  const listRef = React.useRef(null);
  const sizeMap = React.useRef({});
  const setSize = React.useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    // @ts-ignore
    listRef.current.resetAfterIndex(index);
  }, []);
  // @ts-ignore
  const getSize = index => sizeMap.current[index] || 50;
  const [windowWidth] = useWindowResize();

  // only render provisions with ids
  const provisions = React.useMemo(
      () => toc.items.filter((c: any) => c.id),
      []
  );
  return (
      <div>
        <List
            ref={listRef}
            className="List"
            height={500}
            itemCount={provisions.length}
            itemData={provisions}
            itemSize={getSize}
            width="100%"
        >
          {({ data, index, style }) => (
              <div style={style}>
                <Row
                    index={index}
                    setSize={setSize}
                    windowWidth={windowWidth}
                    data={data}
                />
              </div>
          )}
        </List>
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

import React, {useRef} from "react";
import { IonItem } from "@ionic/react";
import { VariableSizeList as List } from "react-window";
import { toc } from "../data/constitution";
import {useWindowSize} from "../custom-hooks/useWindowResize";

interface TOCListProps {
  onClick?: any;
}

// @ts-ignore
const Row = ({ index, setSize, rowData, windowWidth, onClick } ) => {
  const rowRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if(rowRef && rowRef.current) {
      // @ts-ignore
      setSize(String(index), rowRef.current.getBoundingClientRect().height);
    }
  }, [setSize, index, windowWidth]);
  return (
      <div
          // @ts-ignore
          ref={rowRef}
      >
        <TOCItem
            item={rowData}
            onClick={onClick}
        />
      </div>
  )
};

export const TOCList: React.FC<TOCListProps> = ({ onClick }) => {
  const listRef = React.useRef(null);
  const sizeMap = React.useRef({});
  const setSize = React.useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    // @ts-ignore
    listRef.current.resetAfterIndex(index);
  }, []);
  // @ts-ignore
  const getSize = index => sizeMap.current[index] || 50;
  const [windowWidth] = useWindowSize();

  // only render provisions with ids
  const provisions = React.useMemo(
      () => toc.flattenedDeep.filter((c: any) => c.id),
      []
  );
  return (
      <div>
        <List
            ref={listRef}
            className="List"
            height={400}
            itemCount={provisions.length}
            itemSize={getSize}
            width="100%"
        >
          {({ index, style }) =>
              <div style={style} key={index}>
                <Row windowWidth={windowWidth}
                     onClick={onClick}
                     setSize={setSize}
                     index={index}
                     rowData={provisions[index]}
                />
              </div>
          }
        </List>
      </div>
  );
};

interface TOCItemProps {
  item: any;
  onClick?: any;
}

const TOCItem: React.FC<TOCItemProps> = ({ item, onClick }) => {
  const props = onClick ? {onClick: () => onClick(item)} : {routerLink: '/constitution/provision/' + item.id};

  return (
    <div>
      <IonItem class={item.type === "chapter" ? "chapter" : ""} {...props}>
        {item.title}
      </IonItem>
    </div>
  );
};

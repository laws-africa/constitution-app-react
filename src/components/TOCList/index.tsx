import React from "react";
import Row from "./Row";
import { useWindowSize } from "../../custom-hooks/useWindowResize";
import { VariableSizeList as List } from "react-window";

interface TOCItem {
  [key: string]: any; // type for unknown keys.
  title?: string;
  id?: string;
}

type ClickItemData = {
  overrideClickEvt?: (item: TOCItem) => TOCItem;
  baseRoute?: string,
}


interface TOCListProps {
  items: TOCItem[];
  clickItemData: ClickItemData,
}

const TOCList = ({ items, clickItemData }: TOCListProps) => {
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
      () => items,
      [items]
  );
  return (
      <div>
        <List
            useIsScrolling
            ref={listRef}
            className="List"
            height={300}
            itemCount={provisions.length}
            itemSize={getSize}
            width="100%"
        >
          {({ index, isScrolling, style }) =>
              <Row
                  windowWidth={windowWidth}
                  clickItemData={clickItemData}
                  setSize={setSize}
                  index={index}
                  rowData={provisions[index]}
                  style={style}
                  isScrolling={isScrolling}
              />
          }
        </List>
      </div>
  );
};

TOCList.defaultProps = {
  items: [],
  clickItemData: {}
}

export default TOCList;

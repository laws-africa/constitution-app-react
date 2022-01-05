import React from "react";
import {Virtuoso} from 'react-virtuoso'
import Row from "./Row";
import {useWindowSize} from "../../custom-hooks/useWindowResize";

export interface ITOCItem {
  [key: string]: any; // type for unknown keys.
  title?: string;
}

interface ITOCList {
  items: ITOCItem[],
  prependRoute?: string,
  overrideClickEvt?: ((itemData: ITOCItem) => any) | undefined,
}

const defaultProps: ITOCList = {
  items: [],
  prependRoute: '',
  overrideClickEvt: undefined,
}

const VirtualizedList = ({ items, overrideClickEvt, prependRoute }: ITOCList) => {
  const list = React.useMemo(() => items, [items]);
  return <Virtuoso
      style={{ height: '100%' }}
      totalCount={list.length}
      components={{
        ScrollSeekPlaceholder: ({ height, index }) => (
            <div
                style={{
                  height,
                  padding: "8px",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
            >
              <div
                  style={{
                    background: "lightgray",
                    height,
                    marginLeft: `${16 * list[index].depth}px`
                  }}
              />
            </div>
        ),
      }}
      itemContent={(index) => {
        return (
            <Row data={list[index]}
                 overrideClickEvt={overrideClickEvt}
                 prependRoute={prependRoute}
            />
        );
      }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 200,
        exit: (velocity) => {
          return Math.abs(velocity) < 10;
        }
      }}
  />
}

VirtualizedList.defaultProps = defaultProps;


const TOCList = ({ items, overrideClickEvt, prependRoute }: ITOCList) => {
  const [windowWidth] = useWindowSize();


  const renderList = () => {
    if(windowWidth <= 425) {
      return (
          <VirtualizedList
              overrideClickEvt={overrideClickEvt}
              prependRoute={prependRoute}
              items={items}
          />
      )
    }
    return items.map(item => (
        <div key={item.id}>
          <Row data={item}
               overrideClickEvt={overrideClickEvt}
               prependRoute={prependRoute}
          />
        </div>
    ))
  }
  return (
      <React.Fragment>
        {renderList()}
      </React.Fragment>
  );
}


export default TOCList;

TOCList.defaultProps = defaultProps

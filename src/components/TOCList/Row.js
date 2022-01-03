import React from "react";
import TOCItem from "./TOCItem";
import { IonSkeletonText } from "@ionic/react";

const Row = ({ index, setSize, rowData, windowWidth, style, isScrolling, clickItemData } ) => {
  const rowRef = React.useRef(null);
  React.useEffect(() => {
    if(rowRef && rowRef.current) {
      // @ts-ignore
      setSize(String(index), rowRef.current.getBoundingClientRect().height);
    }
  }, [setSize, index, windowWidth]);

  const renderContent = () => {
    // if(isScrolling) {
    //   return (
    //       <div style={{
    //         marginBottom: "5px"
    //       }}>
    //         <IonSkeletonText animated />
    //       </div>
    //   )
    // }
    return (
        <TOCItem
            item={rowData}
            clickItemData={clickItemData}
        />
    )
  }

  return (
      <div
          // @ts-ignore
          ref={rowRef}
          style={style}
          key={index}
      >
        {renderContent()}
      </div>
  )
};

export default Row;

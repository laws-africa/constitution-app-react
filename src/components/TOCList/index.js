import React from "react";
import { Virtuoso } from 'react-virtuoso'
import Row from "./Row";

const TOCList = ({ items, clickItemData }) => {
  return (
      <Virtuoso
          style={{ height: '100%' }}
          totalCount={items.length}
          itemContent={(index) => {
            return (
                <Row data={items[index]} clickItemData={clickItemData} />
            );
          }}
      />
  )
}

export default TOCList;

TOCList.defaultProps = {
  items: [],
  clickItemData: {}
}

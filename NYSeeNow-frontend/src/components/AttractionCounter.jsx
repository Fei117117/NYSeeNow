import React from 'react';
import { useSelection } from '../context/SelectionContext';

const AttractionCounter = ({ left, bottom }) => {
  const { selectedList } = useSelection();

  // Use the 'left' and 'bottom' props to position the counter
  const counterStyle = {
    left,
    bottom,
  };

  return (
    <div className="attraction-counter" style={counterStyle}>
      <p>{selectedList ? selectedList.length : 0}</p>
    </div>
  );
};

export default AttractionCounter;

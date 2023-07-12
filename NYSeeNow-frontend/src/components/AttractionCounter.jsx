import React from 'react';
import { useSelection } from '../context/SelectionContext';

const AttractionCounter = ({ left }) => {
  const { selectedList } = useSelection();

  // Use the 'left' prop to position the counter
  const counterStyle = {
    left,
  };

  return (
    <div className="attraction-counter" style={counterStyle}>
      <p>{selectedList ? selectedList.length : 0}</p>
    </div>
  );
};

export default AttractionCounter;

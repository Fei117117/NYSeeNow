import React from 'react';
import { useSelection } from '../context/SelectionContext';

const AttractionCounter = () => {
  const { selectedList } = useSelection();

  return (
    <div className="attraction-counter">
      <p>{selectedList ? selectedList.length : 0}</p>
    </div>
  );
};

export default AttractionCounter;

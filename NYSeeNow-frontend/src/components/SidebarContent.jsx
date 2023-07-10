import React from 'react';
import AttractionCard from './AttractionCard';
import { useSelection } from '../context/SelectionContext';

const SidebarContent = () => {
  const { selectedList, setSelectedList } = useSelection();

  const handleDelete = (attractionName) => {
    setSelectedList(selectedList.filter((attraction) => attraction !== attractionName));
  };

  // If selectedList is null or empty, display a default message
  if (!selectedList || selectedList.length === 0) {
    return <p>...</p>
  }

  // Iterate over the selectedList and create a div for each attraction
  return (
    <div className="sidebar-content">
      {selectedList.map((attraction, index) => (
        <AttractionCard key={index} attraction={{ name: attraction }} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default SidebarContent;
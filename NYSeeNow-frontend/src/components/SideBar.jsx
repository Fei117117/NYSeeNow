import React, { useState, useEffect } from 'react';
import SidebarContent from './SidebarContent';
import AttractionCounter from './AttractionCounter';

export const SideBar = ({ isOpen, setIsOpen }) => {
  // State for holding the left position of AttractionCounter
  const [counterLeft, setCounterLeft] = useState('60px');

  useEffect(() => {
    setCounterLeft(isOpen ? 'calc(50% + 60px)' : '60px'); // update the position according to sidebar's state
  }, [isOpen]);

  return (
    <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-icons">
        <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="hamburger.png" alt="Menu" />
        </div>
        <img src="calendar.png" alt="Calendar" />
        <img src="marker.png" alt="Marker" />
        <div className="question-mark-icon">
          <img src="question_mark.png" alt="Help" />
        </div>
      </div>
      <div className="sidebar-content">
        {isOpen && <SidebarContent />}
      </div>
      <AttractionCounter left={counterLeft} />
    </aside>
  );
};

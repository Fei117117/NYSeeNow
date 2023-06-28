import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SideBar = ({ isOpen, setIsOpen }) => { 
    return (
      <div>
        <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
          <ul className="hamburger-icon" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/hamburger.png" alt="hamburger icon" />
          </ul>
          <div className="sidebar-content">
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <li className="calendar-icon">
                {/* Will replace emoji with your calendar icon later */}
                🗓️
              </li>
              <li className="marker-icon">
                {/* Will replace emoji with your marker icon later */}
                📍
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
};

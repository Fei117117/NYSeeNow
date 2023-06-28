import { useState } from 'react';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
        <ul>
        <li>|||</li>
        </ul>
        <ul>
          <li>
            {/* Will replace emoji with your calendar icon later */}
            🗓️
          </li>
          <li>
            {/* Will replace emoji with your marker icon later */}
            📍
          </li>
        </ul>
      </aside>
    </div>
  );
};

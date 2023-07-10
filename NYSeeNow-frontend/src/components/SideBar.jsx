import SidebarContent from './SidebarContent';

export const SideBar = ({ isOpen, setIsOpen }) => {
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
        {isOpen && <SidebarContent />} {/* Includes the SidebarContent component */}
      </div>
    </aside>
  );
};
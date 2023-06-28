export const SideBar = ({ isOpen, setIsOpen }) => {
    return (
      <div>
        <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
          <ul className="hamburger-icon" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', justifyContent: 'center' }}>
            <li><img src="hamburger.png" alt="Menu" /></li>
          </ul>
          <div className="sidebar-content">
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <li>
                {/* Will replace emoji with your calendar icon later */}
                <img src="calendar.png" alt="Calendar" />
              </li>
              <li>
                {/* Will replace emoji with your marker icon later */}
                <img src="marker.png" alt="Marker" />
              </li>
            </ul>
          </div>
          <div className="question-mark-icon">
            <img src="question_mark.png" alt="Help" />
          </div>
        </aside>
      </div>
    );
};

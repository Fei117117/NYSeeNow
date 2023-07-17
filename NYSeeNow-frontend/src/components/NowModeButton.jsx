import React from 'react';

const NowModeButton = ({ isNowMode, toggleNowMode }) => {
  const buttonStyle = isNowMode ? "now-mode-button on" : "now-mode-button off";
  
  return (
    <div className={buttonStyle} onClick={toggleNowMode}>
      <p>NOW</p>
    </div>
  );
};

export default NowModeButton;

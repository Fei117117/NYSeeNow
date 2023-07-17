import React from 'react';

const NowModeButton = ({isNowMode, toggleNowMode}) => {
  const buttonStyle = isNowMode ? "now-mode-button on" : "now-mode-button off";
  return (
    <button 
      className={buttonStyle} 
      onClick={toggleNowMode}
    >
      NOW Mode
    </button>
  );
};

export default NowModeButton;

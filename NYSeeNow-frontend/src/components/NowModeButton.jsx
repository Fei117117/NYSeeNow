import React from 'react';

const NowModeButton = ({ isNowMode, toggleNowMode }) => {
  const buttonStyle = isNowMode ? "now-mode-button on" : "now-mode-button off";
  
  const buttonStyleWithBackground = {
    backgroundImage: `linear-gradient(${isNowMode ? 'rgba(0, 255, 0, 0.02)' : 'rgba(255, 0, 0, 0.02)'}, ${isNowMode ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'}), url(${isNowMode ? '/nyseenowLogoNowModeGreen.png' : '/nyseenowLogoNowModeRed.png'})`,
    backgroundSize: 'cover',
    border: '2px solid #333',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  };
  
  return (
    <div className={buttonStyle} onClick={toggleNowMode} style={buttonStyleWithBackground}>
    </div>
  );
};

export default NowModeButton;

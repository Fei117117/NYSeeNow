import React from 'react';

const NowModeButton = ({ isNowMode, toggleNowMode }) => {
  const buttonStyle = isNowMode ? "now-mode-button on" : "now-mode-button off";
  
  const buttonStyleWithBackground = {
    backgroundImage: `url(${isNowMode ? '/nyseenowLogoNowModeGreen.png' : '/nyseenowLogoNowModeRed.png'})`,
    backgroundSize: 'cover',
  };
  
  return (
    <div className={buttonStyle} onClick={toggleNowMode} style={buttonStyleWithBackground}>
    </div>
  );
};


export default NowModeButton;

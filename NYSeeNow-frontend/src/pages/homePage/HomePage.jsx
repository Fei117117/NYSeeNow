import { HomePageMap } from './HomePageMap'
import NowModeButton from '../../components/NowModeButton';
import { useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'; 

export const HomePage = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE'
  });

  const [isNowMode, setIsNowMode] = useState(false); // add this state

  // function to toggle Now Mode on and off
  const toggleNowMode = () => {
    setIsNowMode((prev) => !prev);
  };

  if (!isLoaded) {
    return <h1>Map loading...</h1>
  } else {
    return (
      <>
        <HomePageMap map_center={props.map_center} isNowMode={isNowMode} />
        <NowModeButton isNowMode={isNowMode} toggleNowMode={toggleNowMode} />
      </>
    );
  }
};
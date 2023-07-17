import { HomePageMap } from './HomePageMap'
import NowModeButton from '../../components/NowModeButton';
import { useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'; 

export const HomePage = (props) => {
  const { isLoaded } = useLoadScript({
<<<<<<< HEAD
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE',
    libraries: ['visualization']
  })
=======
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE'
  });

  const [isNowMode, setIsNowMode] = useState(false); // add this state

  // function to toggle Now Mode on and off
  const toggleNowMode = () => {
    setIsNowMode((prev) => !prev);
  };
>>>>>>> 213a9a097953ed6a22efdfea10b8aeae3368e2fe

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
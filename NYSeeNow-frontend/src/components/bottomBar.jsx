import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelection } from '../context/SelectionContext';
import { useNavigate } from 'react-router-dom';
import { LocatorContext } from '../context/LocatorContext';
import SidebarContent from './SidebarContent';

const BottomBar = ({ mapRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [attractionListToSend, setAttractionListToSend] = useState([]);

  const { selectedList, setSelectedList } = useSelection();
  const navigate = useNavigate();

  const { showLocator, setShowLocator } = useContext(LocatorContext);

  const handleLocatorClick = () => {
    setIsOpen(false);
    setShowLocator(true);
  };

  const handleSubmitButton = () => {
    console.log('calling submit funtion')
    console.log('SENDING REQUEST')
    const request_obj = {
      start_date: startDate,
      end_date: endDate,
      attraction_list: selectedList
    }
    console.log('This is the sending list: FYR')
    console.log(selectedList)

    const url = 'itinerary/predict'

    const req_string = JSON.stringify(request_obj)

    const response_processing = (response_obj) => {
      let new_map = {}
      Object.entries(response_obj).map(([key, attraction_list]) => {
        new_map[key] = []
        attraction_list.map((attraction, arrKey) => {
          let attraction_string = attraction
          let attraction_object = JSON.parse(attraction_string)
          new_map[key].push(attraction_object)
        })
      })

      return new_map
    }

    axios
      .post(url, req_string, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Success!')
        console.log(response)
        let response_obj = response_processing(response.data)
        setTripData(response_obj)
        navigate('/itinerary-builder')
        setIsOpen(false)
      })
      .catch((error) => {
        console.log('You have an error!')
        console.log(error)
      })
  };

  return (
    <div className={`bottom-bar ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="close-icon" onClick={() => setIsOpen(false)}>
          <i className="fas fa-chevron-down"></i>
        </div>
      )}
      <div className="bottom-bar-icons">
        <div
          className="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        >
          <i className="fas fa-bars"></i>
        </div>
        <Link to="/itineraries" className="calendar-icon bottom-bar-link">
          <i className="far fa-calendar-alt"></i>
          <p>My Itineraries</p>
        </Link>
        <div className="locator-icon" onClick={handleLocatorClick}>
          <i className="fas fa-map-marker-alt"></i>
          <p>Locator</p>
        </div>
        <Link to="/" className="question-mark-icon">
          <i className="fas fa-question-circle"></i>
          <p>Help</p>
        </Link>
      </div>
      {isOpen && (
        <div className="sidebar-content-wrapper">
          <SidebarContent
            open={isOpen}
            getStartDate={setStartDate}
            getEndDate={setEndDate}
            submitHandler={handleSubmitButton}
            currStartDate={startDate}
            currEndDate={endDate}
            className="bottom-bar-content" // Add a new class when SidebarContent is used in BottomBar
          />
        </div>
      )}
    </div>
  );
};

export default BottomBar;

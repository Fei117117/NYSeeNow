import React, { useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/homePage/HomePage'
import { MyItineraries } from './pages/savedItinerariesPage/MyItineraries'
import { UserProfile } from './pages/userProfilePage/UserProfile'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './pages/authOverlay/Login'
import { Forget } from './pages/authOverlay/Reset'
import { SelectionProvider } from './context/SelectionContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { ItineraryBuilder } from './pages/itineraryBuilderPage/ItineraryBuilder'
import { LocatorContext } from './context/LocatorContext';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [center, setMapCenter] = useState({ lat: 40.7484, lng: -73.9857 })
  const [zoom, setZoom] = useState(10); // Add this new state
  const [showLocator, setShowLocator] = useState(false);

  return (
    <>
      <AuthProvider>
        <SelectionProvider>
          <CategoriesProvider>
          <LocatorContext.Provider value={{ showLocator, setShowLocator }}>
              <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
              <NavBar isOpen={isOpen} set_map_center={setMapCenter} />
              <div className="route-container">
                <Routes>
                <Route path="/" element={<HomePage map_center={center} setMapCenter={setMapCenter} zoom={zoom} setZoom={setZoom} />} />
                  <Route path="/itineraries" element={<MyItineraries />}></Route>
                  <Route path="/itinerary-builder" element={<ItineraryBuilder />}></Route>
                  <Route path="/userprofile" element={<UserProfile />}></Route>
                  <Route path="/attractions-map" element={<HomePage map_center={center} setMapCenter={setMapCenter} />} />
                </Routes>
              </div>
            </LocatorContext.Provider>
          </CategoriesProvider>
        </SelectionProvider>
      </AuthProvider>
    </>
  )
}

export default App

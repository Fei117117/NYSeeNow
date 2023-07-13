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

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [center, setMapCenter] = useState({ lat: 40.7484, lng: -73.9857 })

  return (
    <>
      <AuthProvider>
        <SelectionProvider>
          <CategoriesProvider>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <NavBar isOpen={isOpen} set_map_center={setMapCenter} />
            <div className="route-container">
              <Routes>
                <Route path="/" element={<HomePage map_center={center} />}></Route>
                <Route path="/itineraries" element={<MyItineraries />}></Route>
                <Route path="/userprofile" element={<UserProfile />}></Route>
              </Routes>
            </div>
          </CategoriesProvider>
        </SelectionProvider>
      </AuthProvider>
    </>
  )
}

export default App

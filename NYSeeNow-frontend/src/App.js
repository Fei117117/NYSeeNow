import React, { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { MyItineraries } from './pages/savedItinerariesPage/MyItineraries';
import { UserProfile } from './pages/userProfilePage/UserProfile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/authOverlay/Login';
import { Forget } from './pages/authOverlay/Reset'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <AuthProvider>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <NavBar isOpen={isOpen} />
        <div className="route-container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/itineraries" element={<MyItineraries />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App;

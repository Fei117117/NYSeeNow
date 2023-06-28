import './App.css'
import { NavBar } from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/homePage/HomePage'
import { MyItineraries } from './pages/savedItinerariesPage/MyItineraries'
import { UserProfile } from './pages/userProfilePage/UserProfile'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './pages/authOverlay/Login'
import { Forget } from './pages/authOverlay/Reset'
function App() {
  return (
    <>
      <AuthProvider>
        <NavBar></NavBar>
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

export default App

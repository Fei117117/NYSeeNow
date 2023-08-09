import React from 'react'
import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LandingPage = () => {
  const location = useLocation()
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  return (
    <div className={styles['landing-page']}>
      <header>
        <nav className={location.pathname === '/' ? styles['landing-navbar'] : ''}>
          <div className={styles['logo-section']}>
            <img
              src="nyseenowLogoLanding.png"
              alt="logo"
              style={{ maxHeight: '50px', maxWidth: '100%' }}
            />
          </div>

          {!isLoggedIn && (
            <div className={styles['nav-links']}>
              <Link to="/about">About Us</Link>
              <Link to="/userprofile">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          )}
          {isLoggedIn && (
            <div className={styles['nav-links']}>
              <Link to="/about">About Us</Link>
              <Link to="/userprofile">UserProfile</Link>
            </div>
          )}
        </nav>
      </header>
      <section className={styles.hero}>
        <h1 className={styles['hero-heading']}>Welcome!Live your NYC dream trip, NOW!</h1>
        <p className={styles['hero-subheading']}>
          Find top attractions, build an itinerary, and decide what suits you here and NOW. Using
          our 'NOW mode' you can check busyness levels, weather info and directions between
          destinations. All in one place here and now!
        </p>
        <h2 className={styles.slogan}>The best time is now</h2>
        <div className={styles['action-buttons']}>
          <Link to="/home" className={`${styles.button} ${styles['button-plan']}`}>
            Plan a trip
          </Link>
          <Link to="/explore" className={`${styles.button} ${styles['button-explore']}`}>
            Explore NOW!
          </Link>
        </div>
      </section>

      {/* User Flow Section */}
      <section className={styles['user-flow-section']}>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'grey' }}>
          <img src="/userFlow1.png" alt="User Flow 1" />
          <h2>Header Text for User Flow 1</h2>
          <p>Explanation for User Flow 1...</p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/userFlow2.png" alt="User Flow 2" />
          <h2>Header Text for User Flow 2</h2>
          <p>Explanation for User Flow 2...</p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'grey' }}>
          <img src="/userFlow3.png" alt="User Flow 3" />
          <h2>Header Text for User Flow 3</h2>
          <p>Explanation for User Flow 3...</p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/userFlow4.png" alt="User Flow 4" />
          <h2>Header Text for User Flow 4</h2>
          <p>Explanation for User Flow 4...</p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'grey' }}>
          <img src="/userFlow5.png" alt="User Flow 5" />
          <h2>Header Text for User Flow 5</h2>
          <p>Explanation for User Flow 5...</p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/userFlow6.png" alt="User Flow 6" />
          <h2>Header Text for User Flow 6</h2>
          <p>Explanation for User Flow 6...</p>
        </div>
      </section>

      <section className={styles.cta}>
        <Link to="/explore" className={styles.button}>
          Explore NOW!
        </Link>
      </section>

      <footer>
        <p>© 2023 NYSeeNOW</p>
        <div className={styles['social-icons']}>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-youtube"></i>
        </div>
        <div className={styles['footer-links']}>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

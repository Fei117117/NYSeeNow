import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LandingPage = () => {
    const location = useLocation();
    return (
        <div className={styles['landing-page']}>
            <header>
                <nav className={location.pathname === "/" ? styles['landing-navbar'] : ""}>
                    <div className={styles['logo-section']}>
                        <img src="nyseenowLogoLanding.png" alt="logo" style={{ maxHeight: '50px', maxWidth: '100%' }} />
                    </div>
                    <div className={styles['nav-links']}>
                        <Link to="/about">About Us</Link>
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </nav>
            </header>
            <section className={styles.hero}>
                <h1 className={styles['hero-heading']}>Live your NYC dream trip, NOW!</h1>
                <p className={styles['hero-subheading']}>Find top attractions, build an itinerary, and decide what suits you here and NOW. Using our 'NOW mode' you can check busyness levels, weather info and directions between destinations. All in one place here and now!</p>
                <h2 className={styles.slogan}>The best time is now</h2>
                <div className={styles['action-buttons']}>
                    <Link to="/home" className={`${styles.button} ${styles['button-plan']}`}>Plan a trip</Link>
                    <Link to="/explore" className={`${styles.button} ${styles['button-explore']}`}>Explore NOW!</Link>

                </div>
            </section>
            <section className={styles['app-usage']}>
                {/* <img src={AppUsageImg1} alt="App Usage 1" />
                <img src={AppUsageImg2} alt="App Usage 2" />
                <img src={AppUsageImg3} alt="App Usage 3" /> */}
            </section>
            <section className={styles.cta}>
                <Link to="/plan" className={styles.button}>Plan a trip</Link>
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
    );
};

export default LandingPage;

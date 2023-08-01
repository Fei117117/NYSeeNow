import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import AppUsageImg1 from './images/appUsageImg1.jpg';
// import AppUsageImg2 from './images/appUsageImg2.jpg';
// import AppUsageImg3 from './images/appUsageImg3.jpg';

const LandingPage = () => {
    const location = useLocation();
    return (
        <div className={styles['landing-page']}>
            <header>
            <nav className={location.pathname === "/" ? styles['landing-navbar'] : ""}>
                    <div className={styles['logo-section']}>

                        <h1>NYSeeNOW</h1>
                    </div>
                    <div className={styles['nav-links']}>
                        <Link to="/about">About Us</Link>
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </nav>
            </header>
            <section className={styles.hero}>
            <img src="NYSeeLogo.png" alt="hero logo" className={styles['hero-logo']} />
                <h2 className={styles.slogan}>The best time is now</h2>
                <div className={styles['action-buttons']}>
                    <Link to="/home" className={styles.button}>Plan a trip</Link>
                    <Link to="/explore" className={styles.button}>Explore now!</Link>
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

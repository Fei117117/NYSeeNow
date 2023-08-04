import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import CategoryDropDown from './CategoriesDropDown'
import styles from './NavBar.module.css'

export const NavBar = ({ isOpen, set_map_center }) => {
  const navStyle = {
    marginLeft: isOpen ? '40%' : '0', // position of sidebar extended
    transition: 'margin-left 0.3s ease' // transition animation
  }

  const logoStyle = {
    marginLeft: isOpen ? '50%' : '0', // position of logo when sidebar is extended
    transition: 'margin-left 0.3s ease' // transition animation
  }
  return (
    <nav style={navStyle}>
      <ul>
        <li style={logoStyle}>
          <a href="/home" className={styles.siteTitle}>
            <div className={styles['logo-section']}>
              <img src="nyseenowLogoLanding.png" alt="logo" style={{ maxHeight: '100px', maxWidth: '100%' }} />
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <SearchBar set_map_center={set_map_center}></SearchBar>
        </li>
      </ul>
      <ul>
        <li>
          <CategoryDropDown></CategoryDropDown>
        </li>
        <li>
          <Link to="/userprofile">User</Link>
        </li>
      </ul>
    </nav>
  )
}

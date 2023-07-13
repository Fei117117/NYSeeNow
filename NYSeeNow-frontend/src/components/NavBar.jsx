import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import CategoryDropDown from './CategoriesDropDown'
import styles from './NavBar.module.css'

export const NavBar = ({ isOpen, set_map_center }) => {
  const navStyle = {
    marginLeft: isOpen ? '50%' : '0', // position of sidebar extended
    transition: 'margin-left 0.3s ease' // transition animation
  }
  return (
    <nav style={navStyle}>
      <ul>
        <li></li>
        <li>
          <Link to="/" className={styles.siteTitle}>
          <div className="NYSEENOW-LOGO">
              <img src="nyseenowLogoBWsmall.png" alt="logo" />
            </div>
          </Link>
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
          <Link to="/itineraries">Itineraries</Link>
        </li>
        <li>
          <Link to="/userprofile">User</Link>
        </li>
      </ul>
    </nav>
  )
}

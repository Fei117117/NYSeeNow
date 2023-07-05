import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
export const NavBar = ({ isOpen, set_map_center }) => {
  const navStyle = {
    marginLeft: isOpen ? '50%' : '0', // position of sidebar extended
    transition: 'margin-left 0.3s ease' // transition animation
  }
  return (
    <nav className="main-header" style={navStyle}>
      <ul>
        <li></li>
        <li>
          <Link to="/" className="site-title">
            NySeeNow
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
          <a>Categories</a>
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

import { Link } from 'react-router-dom'
export const NavBar = () => {
  return (
    <nav className="main-header">
      <ul>
        <li>||||</li>
        <li>
          <Link to="/" className="site-title">
            NySeeNow
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <a>Search</a>
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

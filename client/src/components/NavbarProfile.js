import React from 'react';
import {
  faBell,
  faTools,
  faPlus,
  faHome,
  faSearch,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../containers/profile/styles/styles.styl';
import { Link } from '@reach/router';

function NavbarProfile() {
  return (
    <nav className="navbar-profile">
      <div>
        <Link to="/">
          Home
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/notifications">
          Notifications
          <FontAwesomeIcon icon={faBell} />
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-search">
          <input type="text" placeholder="Search" />
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </div>
        <Link to="/logout">
          Logout
          <FontAwesomeIcon icon={faDoorOpen} />
        </Link>
      </div>
    </nav>
  );
}

export default NavbarProfile;

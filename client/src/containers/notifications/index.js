import React from 'react';
import { Link } from '@reach/router';
import './styles/styles.styl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
function index() {
  return (
    <div className="notification-main">
      <div className="notification-title">
        <span>Notifications</span>
      </div>
      <div className="notification-list">
        <div className="notification-box">
          <div className="notification-icon">
            <span>
              <FontAwesomeIcon icon={faWindowClose} />
            </span>
          </div>
          <div className="notification-box-title">
            <h2>This is a silly test</h2>
          </div>
        </div>
        <div className="notification-box">
          <div className="notification-icon">
            <span>
              <FontAwesomeIcon icon={faWindowClose} />
            </span>
          </div>
          <div className="notification-box-title">
            <h2>This is a silly test</h2>
          </div>
        </div>
      </div>
      <div>
        <Link to="/profile">Go Back </Link>
      </div>
    </div>
  );
}

export default index;

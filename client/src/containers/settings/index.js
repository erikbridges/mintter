import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import './styles/styles.styl';
function index() {
  return (
    <Fragment>
      {/* Settings Navbar Component */}
      <div className="settings">
        <div className="settings-section">
          <h2>Account Settings</h2>
        </div>
        <div className="settings-section">
          <label htmlFor="firstN">Change First Name</label>
          <input type="text" placeholder="First Name" />
          <button type="button">Change</button>
        </div>
        <div className="settings-section">
          <label htmlFor="lastN">Change Last Name</label>
          <input type="text" placeholder="Last Name" />
          <button type="button">Change</button>
        </div>
        <div className="settings-section">
          <label htmlFor="email">Change Email Name</label>
          <input type="email" placeholder="Email" />
          <button type="button">Change</button>
        </div>
        <div className="settings-section">
          <label htmlFor="verify">Verify Account</label>
          <input type="text" placeholder="Verify Code" />
          <button type="button">Change</button>
        </div>
        <div className="settings-btn">
          <Link to="/profile">Return To Profile</Link>
          <button>Delete Account</button>
        </div>
      </div>
    </Fragment>
  );
}

export default index;

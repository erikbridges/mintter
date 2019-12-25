import React, { useState, Fragment } from 'react';
import { Link } from '@reach/router';
import ActivateCode from '../../components/ActivateCode';
import './styles/login.styl';
function index() {
  const [state, setState] = useState({
    codebox: false,
  });
  const toggleCodeBox = () => setState({ ...state, codebox: !state.codebox });
  return (
    <Fragment>
      <div className="login">
        <div className="login-box">
          <h1>Log in to Mintter</h1>
          <div className="login-main">
            <div>
              <label htmlFor="firstInput">Email or Username</label>
              <input
                type="text"
                name="firstInput"
                placeholder="Email or Username"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Password" />
            </div>
          </div>
          <div className="login-submit">
            <button>Login</button>
            <Link to="/forgot">Forgot Password?</Link>
          </div>
          <div className="login-options">
            <div className="login-other">
              <p>
                New to Mintter? <Link to="/signup">Sign Up now!</Link>
              </p>
              <a onClick={() => toggleCodeBox()}>Activate Your Account.</a>
            </div>
          </div>
        </div>
      </div>
      {state.codebox ? <ActivateCode closeBox={() => toggleCodeBox()} /> : null}
    </Fragment>
  );
}

export default index;

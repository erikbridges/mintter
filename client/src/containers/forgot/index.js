import React, { useState } from 'react';
import ActivateCode from '../../components/ActivateCode';
// If there is an email associated with that account you will be sent a code to reset the password.
import './styles/styles.styl';
function index() {
  const [state, setState] = useState({
    codebox: false,
  });
  const toggleCodeBox = () => setState({ ...state, codebox: !state.codebox });
  return (
    <div>
      <div className="forgot-main">
        <span>
          If there is an email associated with that account, we will contact you
          with your code to reset your password.
        </span>
        <div className="forgot-input-wrap">
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="forgot-btn-wrap">
          <button>Submit</button>
          <button onClick={() => toggleCodeBox()}>Enter Code</button>
        </div>
      </div>
      {state.codebox ? <ActivateCode closeBox={() => toggleCodeBox()} /> : null}
    </div>
  );
}

export default index;

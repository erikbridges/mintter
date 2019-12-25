import React, { useState, Fragment } from 'react';
import ReactCodeInput from 'react-code-input';

const activateCode = props => {
  const [state, setState] = useState({
    codeInput: '',
  });
  const changeInput = value => {
    return setState({
      ...state,
      codeInput: value,
    });
  };
  const codeSubmit = () => {
    console.log(state.codeInput);
  };
  return (
    <Fragment>
      <div id="overlay"></div>
      <div className="login-codebox">
        <h4> Enter the code to verify your account.</h4>
        <ReactCodeInput
          type="text"
          name="codeInput"
          fields={8}
          onChange={e => changeInput(e)}
        />
        <button id="subCode" onClick={() => codeSubmit()}>
          Submit
        </button>
        <button id="closeSub" onClick={() => props.closeBox()}>
          Close
        </button>
      </div>
    </Fragment>
  );
};

export default activateCode;

import React, { useState, Fragment } from 'react';
import './styles/styles.styl';
import { Link } from '@reach/router';
function index() {
  const [state, setState] = useState({
    step: 1,
    next: true,
    prev: false,
  });
  const onNext = () =>
    setState({
      ...state,
      step: state.step == 3 ? 3 : (state.step += 1),
      prev: state.step == 1 ? false : true,
      next: state.step == 3 ? false : true,
    });

  const onPrev = () =>
    setState({
      ...state,
      step: state.step == 1 ? 1 : (state.step -= 1),
      prev: state.step == 1 ? false : true,
      next: state.step == 3 ? false : true,
    });

  const generateSignUpBox = () => {
    switch (state.step) {
      case 1: {
        return (
          <Fragment>
            <div className="sign-up-wrap">
              <label htmlFor="first_name">First Name</label>
              <input type="text" name="first_name" placeholder="First Name" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" name="last_name" placeholder="Last Name" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="profile_image">Profile Image</label>
              <input
                type="file"
                name="profile_image"
                placeholder="Profile Image"
                id="profileFile"
              />
            </div>
          </Fragment>
        );
      }
      case 2: {
        return (
          <Fragment>
            <div className="sign-up-wrap">
              <label htmlFor="bio">About Yourself</label>
              <textarea
                name="bio"
                placeholder="Tell me about yourself. 140 characters"
              ></textarea>
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
              />
            </div>
          </Fragment>
        );
      }
      case 3: {
        return (
          <Fragment>
            <div className="sign-up-msg">
              <div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 130.2 130.2"
                >
                  <circle
                    class="path circle"
                    fill="none"
                    stroke="#73AF55"
                    stroke-width="6"
                    stroke-miterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                  />
                  <polyline
                    class="path check"
                    fill="none"
                    stroke="#73AF55"
                    stroke-width="6"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                  />
                </svg>
              </div>
              <h1> You{"'"}re all set!</h1>
              <p>
                Don{"'"}t forget to check your email to verify your account.
              </p>
            </div>
          </Fragment>
        );
      }
      default: {
        return (
          <Fragment>
            <div className="sign-up-wrap">
              <label htmlFor="first_name">First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="sign-up-wrap">
              <label htmlFor="last_name">Username</label>
              <input type="text" placeholder="Username" />
            </div>
          </Fragment>
        );
      }
    }
  };
  return (
    <div className="sign-up">
      <div className="sign-up-box">
        <div className="sign-up-title">
          <h1>Create Your Account</h1>
        </div>
        {generateSignUpBox()}
        <div className="sign-up-btn-wrap">
          {state.prev && state.step !== 3 ? (
            <button class="learn-more" onClick={() => onPrev()}>
              <span class="circle">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Previous</span>
            </button>
          ) : null}
          {state.next ? (
            <button class="learn-more" onClick={() => onNext()}>
              <span class="circle">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Next</span>
            </button>
          ) : null}
          {state.step == 3 ? (
            <Link to="/login" class="learn-more">
              <span class="circle">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Sign In</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default index;

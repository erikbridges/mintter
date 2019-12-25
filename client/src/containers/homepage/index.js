import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faSearch,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@reach/router';
import './styles/styles.styl';

function Index() {
  return (
    <div className="login">
      <div className="login-flex">
        <div>
          <span>
            {' '}
            <FontAwesomeIcon
              icon={faSearch}
              style={{ marginRight: '20px' }}
            />{' '}
            Follow your interests.
          </span>
          <span>
            {' '}
            <FontAwesomeIcon
              icon={faAddressBook}
              style={{ marginRight: '20px' }}
            />
            Hear what people are talking about.{' '}
          </span>
          <span>
            {' '}
            <FontAwesomeIcon icon={faComment} style={{ marginRight: '20px' }} />
            Join the conversation.{' '}
          </span>
          <div className="login-video">
            <video src="../../../public/video.mp4" autoPlay loop muted></video>
          </div>
        </div>
      </div>
      <div className="login-flex">
        <div className="login__section">
          <h2>See what{"'"}s happening in the world right now</h2>
          <span className="login__icon">
            <FontAwesomeIcon
              icon={faComment}
              size="1x"
              style={{ marginRight: '20px' }}
            />
            Join Mintter today.
          </span>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login" id="login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;

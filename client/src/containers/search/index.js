import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import ProfileNav from '../../components/NavbarProfile';
import './styles/styles.styl';
function index() {
  return (
    <Fragment>
      <div className="nav-color">
        <ProfileNav />
        <h1>Background Image</h1>
      </div>
      <div className="search-info">
        <h1>Search Results For: Lorem Ipsum </h1>
      </div>
      <div className="profile-tweet-main">
        <div className="w-70">
          <div className="profile-tweet">
            <div className="profile-time">
              <span>1 Minutes Ago</span>
            </div>
            <h1 className="tweet">
              This is a simple post
              <span className="hashtag">#Newhash</span>
            </h1>
            <div className="profile-status">
              <a className="profile-reply">Reply</a>
              <span className="profile-thumb">
                <span>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
                0
              </span>
              <span className="profile-cmt">
                <span>
                  <FontAwesomeIcon icon={faComment} />
                </span>{' '}
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default index;

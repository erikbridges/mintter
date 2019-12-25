import React from 'react';
import '../containers/profile/styles/styles.styl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
function TweetBox() {
  return (
    <div className="profile-tweet">
      <div className="profile-time">
        <span>1 Minutes Ago</span>
      </div>
      <h1 className="tweet">
        This is a simple post
        <span className="hashtag">#Newhash</span>
      </h1>
      <div className="profile-status">
        <span>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          0
        </span>
        <span>
          <span>
            <FontAwesomeIcon icon={faComment} />
          </span>{' '}
          0
        </span>
      </div>
    </div>
  );
}

export default TweetBox;

import React from 'react';
import NavbarProfile from '../../components/NavbarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faComment,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import './styles/styles.styl';
import TweetBox from '../../components/TweetBox';
function index() {
  return (
    <div className="profile">
      {/* Navigation Component */}
      <NavbarProfile />
      <div className="profile-background">
        <div>
          <h1>Background Image</h1>
        </div>
      </div>
      <div className="profile-flex flex-20">
        <div className="profile-side">
          {/* Profile Picture */}
          <div className="profile-img-wrap">
            <img src="https://via.placeholder.com/250x250" />
          </div>
          {/* Profile Details */}
          <div className="profile-bio">
            <h1>Username</h1>
            <span className="profile-handle">@yourhandlehere</span>
            <p>
              Your bio goes here maxiumum of 140 characters. Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Modi voluptas dolorem et
              deleniti quis, quaerat aliquam voluptate. Architecto ipsam
              consequatur impedit, neque quae earum explicabo. Aspernatur
              excepturi soluta reprehenderit voluptate?
            </p>
            <a id="website">
              <FontAwesomeIcon icon={faLink} style={{ marginRight: 5 }} />
              www.yourwebsite.com
            </a>
          </div>
        </div>
      </div>
      <div className="profile-flex">
        <div className="profile-sidebar">
          <span>
            Posts <span>5</span>
          </span>
          <span>
            Following <span>5</span>
          </span>
          <span>
            Followers <span>5</span>
          </span>
          <span>
            Favorites <span>5</span>
          </span>
        </div>
        <div className="profile-flex">
          <div className="comment-gen">
            <textarea placeholder="What's Happening?"></textarea>
            <button>Mint It</button>
          </div>
          <div className="profile-btn-wrap">
            <button type="button">New Post</button>
          </div>
          {/* Tweet Component */}
          <TweetBox />
          <TweetBox />
          <TweetBox />
        </div>
      </div>
    </div>
  );
}

export default index;

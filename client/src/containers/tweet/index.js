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

        <div className="comments">
          <div className="comment-input">
            <textarea placeholder="Mint your reply"></textarea>
            <button type="button">Mint It</button>
          </div>
          <div className="comment-list w-70">
            <div className="comment">
              <div className="comment-icons">
                <span>&times;</span>
              </div>
              <div className="comment-user">
                <div className="comment-image">
                  <img src="http://via.placeholder.com/50x50" />
                </div>
                <h1>Username</h1>
                <span>Feb 20</span>
              </div>
              <div className="comment-main">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur ut facere quo? Consequuntur repellendus ullam
                  distinctio hic at consequatur, eveniet quasi expedita, sint
                  facere consectetur officiis odio exercitationem culpa
                  quia.Expedita alias accusantium natus quasi vel eos nisi, sint
                  nesciunt vitae quam beatae qui. Tempore, nisi ea. Commodi qui
                  aspernatur, dolorum deleniti perferendis consequatur, fugiat
                  distinctio totam, iusto nobis doloremque.
                </p>
              </div>
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
      </div>
    </Fragment>
  );
}

export default index;

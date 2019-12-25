import '../containers/profile/styles/styles.styl';

const Follow = () => {
  // Return a list of followers or people following using a prop.
  return (
    <div className="follow-list">
      <h1>List of Followers or Following</h1>
      <div className="follow-item">
        {/* Follower/Following Images */}
        <div class="follow-item-img">
          <img src="http://via.placeholder/50x50" />
        </div>
        <div class="follow-item-name">
          <span>Username</span>
        </div>
      </div>
    </div>
  );
};

export default Follow;

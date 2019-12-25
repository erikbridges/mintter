import React from 'react';
import { Router } from '@reach/router';
import Home from './homepage/index';
import Login from './login/index';
import Profile from './profile/index';
import Tweet from './tweet/index';
import Search from './search/index';
import Settings from './settings/index';
import SignUp from './signup/index';
import Forgot from './forgot/index';
import Notification from './notifications/index';
function App() {
  const Homepage = () => <Home />;
  const Loginpage = () => <Login />;
  const Profilepage = () => <Profile />;
  const Tweetpage = () => <Tweet />;
  const Searchpage = () => <Search />;
  const Settingspage = () => <Settings />;
  const Signuppage = () => <SignUp />;
  const Forgotpage = () => <Forgot />;
  const Notificationpage = () => <Notification />;

  return (
    <Router>
      <Homepage path="/" />
      <Loginpage path="/login" />
      {/* ID NEEDED HERE /:id */}
      <Profilepage path="/profile" />
      {/* ID NEEDED HERE /:id */}
      <Tweetpage path="/tweet" />
      <Searchpage path="/search" />
      <Settingspage path="/settings" />
      <Signuppage path="/signup" />
      <Forgotpage path="/forgot" />
      <Notificationpage path="/notifications" />
    </Router>
  );
}

export default App;

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app'; // Root layout
import Welcome from '../components/welcome';
import Public from '../components/public';
import SignUp from '../containers/signup';
import Login from '../containers/login';
import ResetPassword from '../containers/resetpw';
import Main from '../components/main'; // Main (user) layout


function requireAuth (nextState, replace, callback) {
  if (!localStorage.getItem('jwtToken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
  callback();
}

function checkLoggedIn (nextState, replace, callback) {
  if (localStorage.getItem('jwtToken')) {
    replace({
      pathname: '/u',
      state: { nextPathname: nextState.location.pathname },
    });
  }
  callback();
}

export default (
  <Route component={ App }>
    <Route path="/">
      <IndexRoute component={ Welcome } onEnter={ checkLoggedIn }/>
      <Route component={ Public } onEnter={ checkLoggedIn }>
        <Route path="login" component={ Login } />
        <Route path="signup" component={ SignUp } />
        <Route path="resetPassword" component={ ResetPassword } />
      </Route>
    </Route>
    <Route path="/u" component={ Main } onEnter={ requireAuth }>
      <IndexRoute component={ Categories } />
      <Route path=":name">

      </Route>
    </Route>
  </Route>
);

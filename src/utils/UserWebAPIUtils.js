/**
 * Created by Justin on 2016-01-21.
 */

import dispatcher from '../core/Dispatcher';
import request from 'superagent';
//import PollActions from '../actions/PollActions';
import UserActions from '../actions/UserActions';

const API_URL = 'http://localhost:3000/api/users';

function getApiUrl(path) {
  if (typeof path === 'undefined') {
    path = '';
  }
  //console.log(global.server);
  //return process.env.WEBSITE_HOSTNAME ?
  //  `http://${process.env.WEBSITE_HOSTNAME}${path}` :
  //  `http://127.0.0.1:${global.server.settings.port}${path}`;
  if (typeof window !== 'undefined') {
    return 'http://' + window.location.hostname + ':' + window.location.port + path;
  } else if (typeof process.env.WEBSITE_HOSTNAME !== 'undefined') {
    return process.env.WEBSITE_HOSTNAME + path;
  } else {
    return '';
  }
}

// TODO JKW: User stuff should be over TLS.
export default {
  // Checks to see if the user is logged in and grabs the user info to put in the store.
  getLoggedInData: () => {
    request.post(getApiUrl('/api/users/check'))
      .timeout(2000)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res.body.hasOwnProperty('error')) {

          } else {
            // Successful login.
            // Redirect on successful login.
            UserActions.userLoggedIn(res.body.username);
          }
        }
      });
  }
};

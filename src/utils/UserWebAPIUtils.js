/**
 * Created by Justin on 2016-01-21.
 */

import dispatcher from '../core/Dispatcher';
import request from 'superagent';
//import PollActions from '../actions/PollActions';
import UserActions from '../actions/UserActions';

const API_URL = 'http://localhost:3000/api/users';

// TODO JKW: User stuff should be over TLS.
export default {
  // Checks to see if the user is logged in and grabs the user info to put in the store.
  getLoggedInData: () => {
    request.post(API_URL + '/check')
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

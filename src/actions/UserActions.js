/**
 * Created by Justin on 2016-01-21.
 */

import UserConstants from '../constants/ActionTypes';
import dispatcher from '../core/Dispatcher';
import request from 'superagent';

export default {
  userLoggedIn: (username) => {
    dispatcher.dispatch({
      type: UserConstants.USER_LOGGED_IN,
      username: username
    });
  },
  userLoggedOut: () => {
    dispatcher.dispatch({
      type: UserConstants.USER_LOGGED_OUT
    });
  }
};

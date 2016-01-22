/**
 * Created by Justin on 2016-01-21.
 */

import dispatcher from '../core/Dispatcher';
import UserConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
const CHANGE_EVENT = 'change';

var _user = {
  loggedIn: false,
  token: '',
  userIp: '',
  username: ''
}

var UserStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: () => {
    UserStore.emit(CHANGE_EVENT);
  },
  addChangeListener: (callback) => {
    UserStore.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    UserStore.removeListener(CHANGE_EVENT, callback);
  },
  get: () => {
    return _user;
  },
  userLoggedIn: (username) => {
    _user.loggedIn = true;
    _user.username = username;
  },
  userLoggedOut: () => {
    _user.username = '';
    _user.loggedIn = false;
  }
});

UserStore.dispatchToken = dispatcher.register((action) => {
  switch (action.type) {
    case UserConstants.USER_LOGGED_IN:
      console.log('USER_LOGGED_IN');
      UserStore.userLoggedIn(action.username);
      UserStore.emitChange();
      break;
    case UserConstants.USER_LOGGED_OUT:
      console.log('USER_LOGGED_OUT');
      UserStore.userLoggedOut();
      UserStore.emitChange();
      break;
    default:
      break;
  }
  return true;
});

export default UserStore;

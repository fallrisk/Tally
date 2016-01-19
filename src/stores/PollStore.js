/**
 * Created by Justin on 2016-01-14.
 */

import dispatcher from '../core/Dispatcher';
import PollConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'change';

var _polls = [];

//
// Either the userId is set or the ip is set.
// {pollId:, userId:, ip:,}
var _votes = [];

function create() {

}

var PollStore = Object.assign({}, EventEmitter.prototype, {
  getAll: () => {
    return _polls;
  },
  // We only return 6 so the screen looks good.
  getLatest: () => {
    return _polls.slice(0, 6);
  },
  get: (id) => {
    id = parseInt(id);
    for (var i = 0; i < _polls.length; i++) {
      if (_polls[i].id === id) {
        //console.log('Found it!');
        return _polls[i];
      }
    }
    return null;
  },
  emitChange: () => {
    PollStore.emit(CHANGE_EVENT);
  },
  addChangeListener: (callback) => {
    PollStore.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    PollStore.removeListener(CHANGE_EVENT, callback);
  },
  hasVoted: (pollId, user, ip) => {
    return false;
  },
  castVote: (pollId, voteChoice) => {
    console.log(pollId);
    var poll = PollStore.get(pollId);
    console.log('castVote: ' + poll);
    if (poll) {
      for (var i = 0; i < poll.pollOptions.length; i++) {
        if (poll.pollOptions[i] === voteChoice) {
          console.log('casted vote! old ' + poll.pollResults[i]);
          poll.pollResults[i] += 1;
          console.log('Store: new ' + poll.pollResults[i]);
        }
      }
    }
  }
});

PollStore.dispatchToken = dispatcher.register((action) => {

  switch (action.type) {
    case PollConstants.POLL_CREATE:
      //text = action.text.trim();
      //if (text !== '') {
      //  create(text);
      //  PollStore.emitChange();
      //}
      break;

    case PollConstants.POLL_CAST_VOTE:
      console.log('Attempting to cast vote.');
      PollStore.castVote(action.pollId, action.voteChoice);
      PollStore.emitChange();
      break;

    case PollConstants.POLL_RECEIVE_ALL:
      console.log('Updated poll data.');
      console.log(action.pollData);
      _polls = JSON.parse(action.pollData);
      PollStore.emitChange();
      break;
    default:
      break;
  }

  return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = PollStore;

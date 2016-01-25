/**
 * Created by Justin on 2016-01-14.
 */

import dispatcher from '../core/Dispatcher';
import PollConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import PollWebAPIUtils from '../utils/PollWebAPIUtils';

const CHANGE_EVENT = 'change';

var _polls = [];

// Either the username is set or the ip is set.
// {pollId:, username:, ip:,}
var _votes = [];

var _userIp = null;

// TODO JKW: This search algorithm is the trivial, garbage solution. This should be done with a much better algorithm.
function hasTheUserVoted(ip, username, pollId) {
  if (_votes.length < 1) {
    return false;
  }
  // Check to see if the userId or Ip for this poll is already been done.
  for (var i = 0; i < _votes.length; i++) {
    var vote = _votes[i];
    if (vote.pollId === pollId) {
      if (vote.ip === ip || vote.username === username) {
        return true;
      }
    }
  }
  // If they weren't found by either then return false.
  return false;
}

var PollStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: () => {
    PollStore.emit(CHANGE_EVENT);
  },
  addChangeListener: (callback) => {
    PollStore.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    PollStore.removeListener(CHANGE_EVENT, callback);
  },
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
        return Object.assign(_polls[i], {hasVoted: hasTheUserVoted(_userIp, null, _polls[i].id)});
      }
    }
    return null;
  },
  getUserPolls(username) {
    var userPolls = _polls.filter(poll => {
      return poll.username === username;
    });
    return userPolls;
  },
  hasVoted: (pollId, user, ip) => {
    return false;
  },
  castVote: (pollId, voteChoice) => {
    var poll = PollStore.get(pollId);
    if (poll) {
      for (var i = 0; i < poll.pollOptions.length; i++) {
        if (poll.pollOptions[i] === voteChoice) {
          poll.pollResults[i] += 1;
          // Add the vote to the list of votes.
          var vote = {ip: _userIp, username: null, pollId: parseInt(pollId)};
          _votes.push(vote);
        }
      }
    }
  },
  createPoll: poll => {
    var newPoll = {};
    if (name !== '' && options.length !== 0) {
      newPoll = {
        id: _polls.length + 1,
        dateCreated: Date.now(),
        pollName: poll.name,
        pollOptions: poll.options,
        pollResults: Array.apply(null, Array(options.length)).map(Number.prototype.valueOf, 0),
        username: poll.username
      };
      _polls.unshift(newPoll);
      return true;
    } else {
      return false;
    }
  }
});

PollStore.dispatchToken = dispatcher.register((action) => {

  switch (action.type) {
    case PollConstants.POLL_CREATE:
      //console.log('POLL_CREATE');
      PollWebAPIUtils.getAllPolls();
      break;

    case PollConstants.POLL_CAST_VOTE:
      //console.log('POLL_CAST_VOTE');
      PollStore.castVote(action.pollId, action.voteChoice);
      PollStore.emitChange();
      break;

    case PollConstants.POLL_RECEIVE_ALL:
      //console.log('POLL_RECEIVE_ALL');
      _polls = action.pollData;
      _votes = action.voteData;
      _userIp = action.userIp;
      PollStore.emitChange();
      break;
    default:
      break;
  }

  return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = PollStore;

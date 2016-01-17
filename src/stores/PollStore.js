/**
 * Created by Justin on 2016-01-14.
 */

import dispatcher from '../core/Dispatcher';
import PollConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'change';

function rand(top) {
  return Math.floor(Math.random() * top);
}

var _polls = [
  {
    id: 1,
    dateCreated: Date.now(),
    pollName: 'Best Compiled Programming Language',
    pollOptions: ['C', 'C++', 'Java'],
    pollResults: [15, 22, 44],
    user: null
  },
  {
    id: 2,
    dateCreated: Date.now(),
    pollName: 'Best Interpreted Programming Language',
    pollOptions: ['Python', 'Perl', 'Ruby'],
    pollResults: [0, 0, 0],
    user: null
  },
  {
    id: 3,
    dateCreated: Date.now(),
    pollName: 'Best Video Card',
    pollOptions: ["GeForce", "ATI Radeon", "Intel"],
    pollResults: [rand(100), rand(100), rand(100)],
    user: null
  },
  {
    id: 4,
    dateCreated: Date.now(),
    pollName: 'Best Past-time',
    pollOptions: ["Reading", "Writing", "Playing Video Games", "Sports"],
    pollResults: [rand(100), rand(100), rand(100), rand(100)],
    user: null
  },
  {
    id: 5, dateCreated: Date.now(), pollName: 'Favorite Sport',
    pollOptions: [
      "Football (Soccer)", "American Football", "Hockey", "Cricket",
      "Tennis", "Squash", "Bocce", "Curling"
    ],
    pollResults: [rand(100), rand(100), rand(100), rand(100), rand(100), rand(100), rand(100)],
    user: null
  },
  {
    id: 6,
    dateCreated: Date.now(),
    pollName: 'Best Number',
    pollOptions: ['2', '3.14', '69', '1'],
    pollResults: [0, 0, 69, 0],
    user: null
  },
  {
    id: 7,
    dateCreated: Date.now(),
    pollName: 'Best Web Programming Site',
    pollOptions: ['Free Code Camp!'],
    pollResults: [100]
  }
];

//
// Either the userId is set or the ip is set.
// {pollId:, userId:, ip:,}
var _votes = []

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
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: (callback) => {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  },
  hasVoted: (pollId, user, ip) => {
    return false;
  },
  dispatcherIndex: dispatcher.register((payload) => {
    console.log('Payload: ' + payload);
    var action = payload.action;
    var text;

    switch (action.actionType) {
      case PollConstants.POLL_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          PollStore.emitChange();
        }
        break;
      case PollConstants.POLL_CAST_VOTE:
        console.log('Attempting to cast vote.');
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = PollStore;

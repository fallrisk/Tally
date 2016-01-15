/**
 * Created by Justin on 2016-01-14.
 */

import dispatcher from '../core/Dispatcher';
import PollConstants from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = 'change';

var _polls = [
  {id: 1, dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {id: 2, dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {id: 3, dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {id: 4, dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {id: 5, dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java', 'Go'], pollResults: [15, 22, 44, 69], user: 1},
  {id: 6, dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {id: 7, dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {id: 9, dateCreated: Date.now(), pollName: 'Best Number', pollOptions: ['2', '3.14', '69', '1'], pollResults: [0, 0, 69, 0], user: 1},
  {id: 8, dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},

];

function create() {

}

var PollStore = Object.assign({}, EventEmitter.prototype, {
  getAll: () => {
    return _polls;
  },
  getLatest: () => {
    return _polls;
  }
});

//dispatcher.register((action) => {
//
//});

module.exports = PollStore;

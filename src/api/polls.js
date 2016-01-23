/**
 * Created by Justin on 2016-01-17.
 */

import { Router } from 'express';
var debug = require('debug')('polls');

const router = new Router();

function rand(top) {
  return Math.floor(Math.random() * top);
}

var _polls = [
  {
    id: 1,
    dateCreated: Date.now(),
    pollName: 'Best Web Programming Site',
    pollOptions: ['Free Code Camp!'],
    pollResults: [100],
    username: null
  },
  {
    id: 2,
    dateCreated: Date.now(),
    pollName: 'Best Interpreted Programming Language',
    pollOptions: ['Python', 'Perl', 'Ruby'],
    pollResults: [90, 20, 60],
    username: null
  },
  {
    id: 3,
    dateCreated: Date.now(),
    pollName: 'Best Video Card',
    pollOptions: ["GeForce", "ATI Radeon", "Intel"],
    pollResults: [20, 30, 40],
    username: null
  },
  {
    id: 4,
    dateCreated: Date.now(),
    pollName: 'Best Past-time',
    pollOptions: ["Reading", "Writing", "Playing Video Games", "Sports"],
    pollResults: [30, 40, 50, 50],
    username: null
  },
  {
    id: 5, dateCreated: Date.now(), pollName: 'Favorite Sport',
    pollOptions: [
      "Football (Soccer)", "American Football", "Hockey", "Cricket",
      "Tennis", "Squash", "Bocce", "Curling"
    ],
    pollResults: [rand(100), 30, 40, 50, 60, 70, 80, 90],
    username: null
  },
  {
    id: 6,
    dateCreated: Date.now(),
    pollName: 'Best Number',
    pollOptions: ['2', '3.14', '69', '1'],
    pollResults: [2, 3, 69, 1],
    username: null
  },
  {
    id: 7,
    dateCreated: Date.now(),
    pollName: 'Best Compiled Programming Language',
    pollOptions: ['C', 'C++', 'Java'],
    pollResults: [15, 22, 44],
    username: null
  }
];

// {ip: '', userId: '', pollId: ''}
var _votes = [];

// TODO JKW: This search algorithm is the trivial, garbage solution. This should be done with a much better algorithm.
function hasTheUserVoted(ip, userId, pollId) {
  if (_votes.length < 1) {
    return false;
  }
  for (var i = 0; i < _votes.length; i++) {
    var vote = _votes[i];
    if (vote.pollId === pollId) {
      if (vote.ip === ip || vote.userId === userId) {
        return true;
      }
    }
  }
  // If they weren't found by either then return false.
  return false;
}

function getPoll(id) {
  id = parseInt(id);
  for (var i = 0; i < _polls.length; i++) {
    if (_polls[i].id === id) {
      return _polls[i];
    }
  }
  return null;
}

function castVote(pollId, voteChoice) {
  var poll = getPoll(pollId);
  if (poll) {
    for (var i = 0; i < poll.pollOptions.length; i++) {
      if (poll.pollOptions[i] === voteChoice) {
        poll.pollResults[i] += 1;
        return true;
      }
    }
  }
  return false;
}

function createPoll(name, options, username) {
  debug('create');
  var newPoll = {};
  if (name !== '' && options.length !== 0) {
    newPoll = {
      id: _polls.length + 1,
      dateCreated: Date.now(),
      pollName: name,
      pollOptions: options,
      pollResults: Array.apply(null, Array(options.length)).map(Number.prototype.valueOf, 0),
      username: username
    };
    debug('Made a new poll.');
    debug(newPoll);
    _polls.unshift(newPoll);
    return(newPoll);
  } else {
    return(false);
  }
}

router.get('/', async (req, res) => {
  res.status(200).json({polls: _polls, votes: _votes, userIp: req.ip});
});

router.get('/vote', async (req, res) => {
  if (req.user) {
    console.log('User is logged in');
    console.log(req.user);
  } else {
    console.log('User is not logged in');
  }
  if (req.query.pollId && req.query.voteChoice) {
    var userId = (req.user !== undefined) ? req.user.id : null;
    if (hasTheUserVoted(req.ip, userId, req.query.pollId)) {
      res.status(200).json({error: 'The user has already voted.', errorCode: 1});
    } else {
      if (castVote(req.query.pollId, req.query.voteChoice)) {
        // Add the vote to the list of votes.
        var vote = {ip: req.ip, userId: userId, pollId: req.query.pollId};
        _votes.push(vote);
        res.status(200).json({pollId: req.query.pollId, voteChoice: req.query.voteChoice});
      } else {
        res.status(200).json({error: 'Failed to vote.', errorCode: 3});
      }
    }
  } else {
    res.status(200).json({error: 'Invalid request', errorCode: 2});
  }
});

router.post('/new', async (req, res) => {
  debug('/new');
  debug(req.body, req.user);
  if (req.user === undefined) {
    res.status(200).json({error: 'Not logged in.'});
    return;
  }
  var newPoll = createPoll(req.body.poll.name, req.body.poll.options, req.user.username);
  if (newPoll) {
    res.status(200).json(newPoll);
  } else {
    res.status(200).json({error: 'New poll not created.', errorCode: 1});
  }
});

router.get('/:id', async () => {
  res.status(200).json({ error: 'Not yet implemented.' });
});

export default router;

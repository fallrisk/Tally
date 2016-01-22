/**
 * Created by Justin on 2016-01-20.
 */

import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import lineReader from 'readline';
import debug from 'debug';
import passport from 'passport';

// Array of foul words we don't part of a username.
const _foulWords = [];

//
var _users = [
  {username: 'fred', password: 'abc'}
];

// Load the list of foul words from the file and store them in an array.
var foulWordsIn = lineReader.createInterface({
  input: fs.createReadStream(path.join(__dirname, 'SwearWords.txt'))
});

foulWordsIn.on('line', (line) => {
  _foulWords.push(line);
});


const router = new Router();

function isUsernameAvailable(username) {
  return true;
}

function isUsernameSwearWord(username) {
  return false;
}

function processRegisterCommand(req, res) {
  var p = Promise((resolve, reject) => {
    if (req.body.command === 'isValidUsername') {
      if (isUsernameAvailable(req.body.username) && !isUsernameSwearWord()) {
        res.status(200).json({isValidUsername: true});
      } else {
        res.status(200).json({isValidUsername: false});
      }
      resolve();
    }
    res.status(200).json({error: 'Invalid command.', errorCode: 1});
    resolve();
  });
  return p;
}

function createNewUser(req, res) {
  debug(req.body);
  _users.push({username: req.body.username, password: req.body.password});
  res.status(200).json({response: 'New user created.'}
  );
}

router.post('/register', async (req, res) => {
  // Here we register the user or send an error back because the form had an error.
  if (req.query.command) {
    return processRegisterCommand(req, res);
  } else {
    // Handle creating the new user.
    debug('Creating user.');
    createNewUser(req, res);
  }
});

router.get('/foulList', (req, res) => {
  res.status(200).json(_foulWords);
});

router.post('/login', passport.authenticate('local', {}), (req, res) => {
  if (res) {
    res.status(200).json({loginSuccessful: true});
  }
  //res.status(200).json({loginSuccessful: false});
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({result: 'logged out'});
});

export default {
  router: router,
  findUserById: (id) => {

  },
  findUserByUsername: (username, cb) => {
    for (var i = 0; i < _users.length; i++) {
      if (username === _users[i].username) {
        debug('Found user ' + username);
        cb(false, _users[i]);
        return;
      }
    }
    debug('Did not find user ' + username);
    cb(false, false);
  },
  isCorrectPassword: (user, passwordToCheck) => {
    if (user.password === passwordToCheck) {
      return true;
    }
    return false;
  }
};

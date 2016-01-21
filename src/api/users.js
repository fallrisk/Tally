/**
 * Created by Justin on 2016-01-20.
 */

import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import lineReader from 'readline';

const _foulWords = [];
var _users = [];

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
  console.log(req.body);
  _users.push({username: req.body.username, password: req.body.password});
  res.status(200).json({response: 'New user created.'});
}

router.post('/register', async (req, res) => {
  // Here we register the user or send an error back because the form had an error.
  if (req.query.command) {
    return processRegisterCommand(req, res);
  } else {
    // Handle creating the new user.
    console.log('Creating user.');
    createNewUser(req, res);
  }
});

router.get('/foulList', (req, res) => {
  res.status(200).json(_foulWords);
});

export default router;

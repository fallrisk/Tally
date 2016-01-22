/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './api/users';
var debug = require('debug')('server');

const server = global.server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
// http://expressjs.com/en/advanced/best-practice-security.html
//server.set('trust proxy', 1);
server.use(session({
  // TODO JKW: This 'secret' should be pulled from an environment variable.
  secret: 'u4d5m3xg1yix83jc74k$9sks',
  name: 'Tally.sessionId',
  resave: false,
  saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

//
// Setup Passport for user authentication.
// -----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
  debug('SerializeUser', user.username);
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  debug('DeserializeUser', username);
  User.findUserByUsername(username, function(err, user) {
    debug('DeserializedUser', user);
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    debug('LocalStrategy username is ' + username);
    User.findUserByUsername(username, function (err, user) {
      debug('User: ' + user);
      if (err) {
        debug('Error' + err);
        return done(err);
      }
      if (!user) {
        debug('Sent this');
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (!User.isCorrectPassword(user, password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      debug('Done OK');
      return done(null, user);
    })
  }
));


//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/polls', require('./api/polls'));
server.use('/api/users', User.router);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});

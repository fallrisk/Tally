/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import LatestPolls from './components/LatestPolls';
import PollInfoPage from './components/PollInfoPage';
import NewPollPage from './components/NewPollPage';
import MyPollsPage from './components/MyPollsPage';
import EditPollPage from './components/EditPollPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });
  // on('/contact', async () => <ContactPage />);

  on('/', async () => <LatestPolls />);

  on('/login', async () => <LoginPage />);

  on('/register', async () => <RegisterPage />);

  on('/polls/new', async () => <NewPollPage />);

  on('/polls/edit/:pollId', async (state) => {
    return <EditPollPage pollId={state.params.pollId} />
  })

  on('/polls/user/:username', async (state) => {
    return <MyPollsPage username={state.params.username} />
  });

  on('/polls/:id', async (state) => {
    return <PollInfoPage pollId={state.params.id} />
  });

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;

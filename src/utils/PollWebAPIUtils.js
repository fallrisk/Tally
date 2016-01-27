
import dispatcher from '../core/Dispatcher';
import request from 'superagent';
import PollActions from '../actions/PollActions';
import http from '../core/HttpClient';

function getApiUrl(path) {
  if (typeof path === 'undefined') {
    path = '';
  }
  //console.log(global.server);
  //return process.env.WEBSITE_HOSTNAME ?
  //  `http://${process.env.WEBSITE_HOSTNAME}${path}` :
  //  `http://127.0.0.1:${global.server.settings.port}${path}`;
  if (typeof window !== 'undefined') {
    return 'http://' + window.location.hostname + ':' + window.location.port + path;
  } else if (typeof process.env.WEBSITE_HOSTNAME !== 'undefined') {
    return process.env.WEBSITE_HOSTNAME + path;
  } else {
    return '';
  }
}

export default {
  getAllPolls: () => {
    console.log('Requested All Polls.');
    console.log(getApiUrl('/api/polls'));
    request.get(getApiUrl('/api/polls'))
      .timeout(2000)
      .end( (err, res) => {
        if (err) {
          console.log('Error occurred getting Polls.', err);
        } else {
          var resData = JSON.parse(res.text);
          if (resData.hasOwnProperty('error')) {

          } else {
            PollActions.receiveAll(resData);
          }
        }
      });
  },
  castVote: (pollId, voteChoice) => {
    request.get(getApiUrl('/api/polls/vote'))
      .timeout(2000)
      .query({pollId: pollId, voteChoice: voteChoice})
      .end( (err, res) => {
        if (err) {
          console.log('Error occurred casting vote.', err);
        } else {
          var resData = JSON.parse(res.text);
          if (resData.hasOwnProperty('error')) {
            // If the error code is 1 then the user has already voted.
            if (resData.errorCode === 1) {
              // We do nothing because the store would have that information.
            }
          } else {
            PollActions.castVote(resData);
          }
        }
      });
  },
  createPoll: poll => {
    request.post(getApiUrl('/api/polls/new'))
      .timeout(2000)
      .send({
        poll: poll
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res.body.hasOwnProperty('error')) {
            console.log('Error occurred creating the new poll.');
          } else {
            PollActions.createPoll(res.body);
          }
        }
      });
  },
  deletePoll: pollId => {
    var self = this;
    request.post(getApiUrl('/api/polls/delete'))
      .timeout(2000)
      .send({
        pollId: pollId
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res.body.hasOwnProperty('error')) {
            console.log('Error occurred creating the new poll.');
          } else {
            request.get(getApiUrl('/api/polls'))
              .timeout(2000)
              .end( (err, res) => {
                if (err) {
                  console.log('Error occurred getting Polls.', err);
                } else {
                  var resData = JSON.parse(res.text);
                  if (resData.hasOwnProperty('error')) {

                  } else {
                    PollActions.receiveAll(resData);
                  }
                }
              });
          }
        }
      });
  },
  updatePoll: (poll) => {
    request.post(getApiUrl('/api/update'))
      .timeout(2000)
      .send({
        pollId: poll.id,
        name: poll.name,
        options: poll.options
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res.body.hasOwnProperty('error')) {
            console.log('Error occurred creating the new poll.');
          } else {
            console.log('Update complete. Now loading polls.');
            return request.get(getApiUrl('/api/polls'))
              .timeout(2000)
              .end( (err, res) => {
                if (err) {
                  console.log('Error occurred getting Polls.', err);
                } else {
                  if (res.body.hasOwnProperty('error')) {
                    console.log('Error updating polls after an update.');
                  } else {
                    console.log('Got data.', res.body);
                    PollActions.receiveAll(res.body);
                  }
                }
              });
          }
        }
      });
  }
};

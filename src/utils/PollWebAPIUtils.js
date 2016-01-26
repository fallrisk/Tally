
import dispatcher from '../core/Dispatcher';
import request from 'superagent';
import PollActions from '../actions/PollActions';

const API_URL = 'http://localhost:3000/api/polls';

export default {
  getAllPolls: () => {
    console.log('Requested All Polls.');
    request.get(API_URL)
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
    request.get(API_URL + '/vote')
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
    request.post(API_URL + '/new')
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
    request.post(API_URL + '/delete')
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
            request.get(API_URL)
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
    request.post(API_URL + '/update')
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
            return request.get(API_URL)
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

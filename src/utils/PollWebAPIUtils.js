
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
  }
};

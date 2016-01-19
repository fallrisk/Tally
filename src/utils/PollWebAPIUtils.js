
import dispatcher from '../core/Dispatcher';
import request from 'superagent';
import PollActions from '../actions/PollActions';

const API_URL = 'http://localhost:3000/api/polls';

export default {
  getAllPolls: () => {
    request.get(API_URL)
      .timeout(2000)
      .end( (err, res) => {
        if (err) {
          console.log('Error occurred getting Polls.', err);
        } else {
          PollActions.receiveAll(res.text);
        }
      });
  },
  castVote: (pollId, voteChoice) => {
    request.get('http://localhost:3000/api/polls/vote')
      .timeout(2000)
      .query({pollId: pollId, voteChoice: voteChoice})
      .end( (err, res) => {
        if (err) {
          console.log('Error occurred casting vote.', err);
        } else {
          console.log(res.text);
          PollActions.castVote(JSON.parse(res.text));
        }
      });
  }
};

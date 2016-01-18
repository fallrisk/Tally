
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
  }
};

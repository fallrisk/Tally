/**
 * Created by Justin on 2016-01-16.
 */

import PollConstants from '../constants/ActionTypes';
import dispatcher from '../core/Dispatcher';
import request from 'superagent';

export default {
  castVote: (voteChoice, pollId, ipAddr, userId) => {
    const url = API_URL + '/polls/' + pollId + '?voteFor=' + voteChoice;
    var p = request.get(url)
      .timeout(2000)
      .query({vote: voteChoice})
      .end( (err, res) => {
        //dispatcher.dispatch({
        //  type: PollConstants.POLL_CAST_VOTE,
        //  pollId: pollId,
        //  voteChoice: voteChoice,
        //  ipAddr: ipAddr,
        //  userId: userId
        //});
      });
    return p;
  },
  receiveAll: (data) => {
    dispatcher.dispatch({
      type: PollConstants.POLL_RECEIVE_ALL,
      pollData: data
    });
  }
};

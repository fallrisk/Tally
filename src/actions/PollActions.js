/**
 * Created by Justin on 2016-01-16.
 */

import PollConstants from '../constants/ActionTypes';
import dispatcher from '../core/Dispatcher';

export default {
  castVote: (voteChoice, pollId, ipAddr, userId) => {
    dispatcher.dispatch({
      type: PollConstants.POLL_CAST_VOTE,
      pollId: pollId,
      voteChoice: voteChoice,
      ipAddr: ipAddr,
      userId: userId
    });
  }
};

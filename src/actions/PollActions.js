/**
 * Created by Justin on 2016-01-16.
 */

import PollConstants from '../constants/ActionTypes';
import dispatcher from '../core/Dispatcher';
import request from 'superagent';

export default {
  castVote: (resData) => {
    dispatcher.dispatch({
      type: PollConstants.POLL_CAST_VOTE,
      pollId: resData.pollId,
      voteChoice: resData.voteChoice
    });
  },
  receiveAll: (resData) => {
    dispatcher.dispatch({
      type: PollConstants.POLL_RECEIVE_ALL,
      pollData: resData
    });
  }
};

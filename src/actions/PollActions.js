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
      pollData: resData.polls,
      voteData: resData.votes,
      // The user can modify their local store and spoof this, but when the request is made they can't spoof it
      // the client will change what is displayed based on this, so it only hurts them if they try to spoof it.
      userIp: resData.userIp
    });
  }
};

/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './LatestPolls.css';

var examplePollData = [
  // Template: {dateCreated: Date.now(), pollName:'', pollOptions: [], pollResults: [], user: }
  {dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Compiled Programming Language', pollOptions: ['C', 'C++', 'Java'], pollResults: [15, 22, 44], user: 1},
  {dateCreated: Date.now(), pollName: 'Best Interpreted Programming Language', pollOptions: ['Python', 'Perl', 'Ruby'], pollResults: [0, 0, 0], user: 1}
];

class PollOption extends Component {
  render() {

  }
}

class Poll extends Component {
  render() {
    const self = this;
    var i = -1;
    var pollOptionNodes = this.props.pollOptions.map((option) => {
      i += 1
      return (
        <div className="LatestPolls-poll-option">
          <span>{option}</span>
          <span>({self.props.pollResults[i]})</span>
        </div>
      )
    });
    return (
      <div className="LatestPolls-poll">
        {pollOptionNodes}
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}

@withStyles(styles)
class LatestPolls extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };


  render() {
    const title = 'Tally';
    this.context.onSetTitle(title);
    var pollNodes = examplePollData.map((poll) => {
      return (
        <Poll name={poll.pollName} pollOptions={poll.pollOptions} pollResults={poll.pollResults} />
      )
    });
    return (
      <div className="LatestPolls">
        <div className="LatestPolls-container">
          <h1>Latest Polls</h1>
          <div className="LatestPolls-pollContainer">
            {pollNodes}
          </div>
        </div>
      </div>
    );
  }

}

export default LatestPolls;

/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './LatestPolls.css';
import PollStore from '../../stores/PollStore';

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

class PollChart extends Component {

  componentDidMount() {
    var ele = this.getDOMNode();
    D3PollChart.create(ele, {
      width: '100%',
      height: '60px'
    }, this.getChartState());
  }

  componentDidUpdate() {
    var ele = this.getDOMNode();
    D3PollChart.update(ele, this.getChartState());
  }

  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    }
  }

  componentWillUnmount() {
    var ele = this.getDOMNode();
    D3PollChart.destroy(ele);
  }

  render() {
    return (
      <div className="LatestPolls-PollChart"></div>
    )
  }
}

class Poll extends Component {
  render() {
    const self = this;
    var i = -1;
    var pollOptionNodes = this.props.pollOptions.map((option) => {
      i += 1
      return (
        <div key={i} className="LatestPolls-poll-option">
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
  constructor(props) {
    super(props);
    this.state = {
      latestPolls: PollStore.getLatest()
    };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Tally';
    this.context.onSetTitle(title);
    var pollNodes = this.state.latestPolls.map((poll) => {
      return (
        <Poll key={poll.id} name={poll.pollName} pollOptions={poll.pollOptions} pollResults={poll.pollResults} />
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

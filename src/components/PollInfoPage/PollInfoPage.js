/**
 * Created by Justin on 2016-01-16.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './PollInfoPage.css';
import PollStore from '../../stores/PollStore';
import dispatcher from '../../core/Dispatcher';
import PollConstants from '../../constants/ActionTypes';

class PollChart extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.create(ele, {
      width: '95%',
      height: '20'
    }, this.getChartState());
  }

  componentDidUpdate() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.update(ele, this.getChartState());
  }

  getChartState() {
    return {
      data: this.props.data,
      columnNames: this.props.pollOptions,
      showText: false
    }
  }

  componentWillUnmount() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.destroy(ele);
  }

  render() {
    return (
      <div className="PollInfoPage-PollChart"></div>
    )
  }
}

@withStyles(styles)
class PollInfoPage extends Component {
  constructor(props) {
    super(props);
    //console.log('Poll ID: ' + this.props.pollId);
    var poll = PollStore.get(this.props.pollId);
    //console.log('Poll', poll);
    this.state = { poll: poll };
    this.vote = this.vote.bind(this);
  }

  vote(option) {
    console.log('Voting for ' + option);
    dispatcher.dispatch({
      action: PollConstants.POLL_CAST_VOTE,
      vote: option,
      ip: 1,
      user: null
    });
  }

  render() {
    var pollOptionNodes = this.state.poll.pollOptions.map((option) => {
      return (
        <div><button onClick={this.vote.bind(this, option)}>Vote for</button><span>{option}</span></div>
      );
    });

    if (this.state.poll) {
      return (
        <div className="PollInfoPage">
          <h1 className="PollInfoPage-PollName">{this.state.poll.pollName}</h1>
          <div className="PollInfoPage-PollOptions">
            {pollOptionNodes}
          </div>
          <PollChart data={this.state.poll.pollResults} pollOptions={this.state.poll.pollOptions} />
        </div>
      )
    } else {
      return (
        <div className="PollInfoPage">
          <p>Could not find the requested poll.</p>
        </div>
      )
    }
  }
}

export default PollInfoPage;

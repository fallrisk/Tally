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
import PollActionCreator from '../../actions/PollActions';
import PollWebAPIUtils from '../../utils/PollWebAPIUtils';
import Link from '../Link';

class PollChart extends Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.getChartState = this.getChartState.bind(this);
  }

  componentDidMount() {
    var ele = ReactDOM.findDOMNode(this);
    D3LargeChart.create(ele, this.getChartState(), {
      width: '95%',
      barHeight: '30', // in pixels
      paddingBetweenBars: 2, // in pixels
      showDataValue: true
    });
  }

  componentDidUpdate() {
    console.log('PollChart Updated!');
    var ele = ReactDOM.findDOMNode(this);
    D3LargeChart.update(ele, this.getChartState(), 36);
  }

  getChartState() {
    //console.log(this.props);
    return {
      data: this.props.data,
      columnNames: this.props.pollOptions,
      showText: false
    }
  }

  componentWillUnmount() {
    var ele = ReactDOM.findDOMNode(this);
    D3LargeChart.destroy(ele);
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
    this.state = {
      poll: PollStore.get(this.props.pollId)
    };
    this.vote = this.vote.bind(this);
    this.getStateFromStores = this.getStateFromStores.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromStores() {
    console.log('getState: ' + this.props.pollId);
    return {
      poll: PollStore.get(this.props.pollId)
    };
  }

  componentDidMount() {
    PollStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PollStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getStateFromStores());
  }

  vote(option) {
    PollWebAPIUtils.castVote(this.state.poll.id, option);
  }

  render() {
    var hasVoted = (this.state.poll.hasVoted) ? this.state.poll.hasVoted : false;
    console.log('Making poll options.' + hasVoted);
    var pollOptionNodes = this.state.poll.pollOptions.map((option) => {
      if (hasVoted) {
        return (
          <div><span>{option}</span></div>
        )
      }
      return (
        <div><button onClick={this.vote.bind(this, option)}>Vote for</button><span>{option}</span></div>
      );
    });


    if (this.state.poll) {
      return (
        <div className="PollInfoPage">
          <div className="PollInfoPage-container">
            <div className="PollInfoPage-container">
              <h1 className="PollInfoPage-PollName">{this.state.poll.pollName}</h1>
              <div className="PollInfoPage-PollOptions">
                {pollOptionNodes}
              </div>
              <PollChart data={this.state.poll.pollResults} pollOptions={this.state.poll.pollOptions} />
            </div>
          </div>
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

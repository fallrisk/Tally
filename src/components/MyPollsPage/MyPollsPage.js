/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './MyPollsPage.css';
import PollStore from '../../stores/PollStore';
import Link from '../Link';

class PollChart extends Component {

  componentDidMount() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.create(ele, {
      width: '95%',
      height: '30'
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
      showText: true
    }
  }

  componentWillUnmount() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.destroy(ele);
  }

  render() {
    return (
      <div className="MyPollsPage-PollChart"></div>
    )
  }
}

class Poll extends Component {
  render() {
    return (
      <div className="MyPollsPage-poll">
        <h2 className="MyPollsPage-poll-title">{this.props.name}</h2>
        <PollChart data={this.props.pollResults} pollOptions={this.props.pollOptions} />
        <a href={'/polls/' + this.props.id} onClick={Link.handleClick}>Place Vote / View</a>
      </div>
    )
  }
}

@withStyles(styles)
class MyPollsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPolls: PollStore.getUserPolls(this.props.username)
    };
    this.getStateFromStores = this.getStateFromStores.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  getStateFromStores() {
    return {
      userPolls: PollStore.getUserPolls(this.props.username)
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

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Tally';
    this.context.onSetTitle(title);
    if (this.state.userPolls.length > 0) {
      var pollNodes = this.state.userPolls.map((poll) => {
        return (
          <Poll key={poll.id} id={poll.id} name={poll.pollName} pollOptions={poll.pollOptions} pollResults={poll.pollResults} />
        )
      });
      return (
        <div className="MyPollsPage">
          <div className="MyPollsPage-container">
            <h1>Your Polls</h1>
            <div className="MyPollsPage-polls-container">
              {pollNodes}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="MyPollsPage">
          <div className="MyPollsPage-container">
            <h1>Your Polls</h1>
            <p>You currently have not created any polls. You should <a href="/polls/new">create a poll</a>.</p>
          </div>
        </div>
      );
    }

  }

}

export default MyPollsPage;

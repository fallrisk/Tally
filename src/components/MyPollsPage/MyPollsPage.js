/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './MyPollsPage.css';
import PollStore from '../../stores/PollStore';
import Link from '../Link';
import PollWebAPIUtils from '../../utils/PollWebAPIUtils';

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
  constructor(props) {
    super(props);
    this.state = {
      tweet: 'Vote on my poll at http://localhost:3000/poll/'
    }
  }

  render() {
    return (
      <div className="MyPollsPage-poll">
        <h2 className="MyPollsPage-poll-title">{this.props.name}</h2>
        <PollChart data={this.props.pollResults} pollOptions={this.props.pollOptions} />
        <a className="MyPollsPage-pollLink" href={'/polls/' + this.props.id} onClick={Link.handleClick}>Place Vote / View</a>
        <span>·</span>
        <a className="MyPollsPage-pollLink" href={'https://twitter.com/intent/tweet?text=' + this.state.tweet + this.props.id}>
          <i className='fa fa-twitter'></i>Share
        </a>
        <span>·</span>
        <a className="MyPollsPage-pollLink" href="#" onClick={this.props.onDelete.bind(this, this.props.id)}>Delete</a>
      </div>
    );
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
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete(pollId, e) {
    e.preventDefault();
    //console.log('Attempting to delete poll with ID ' + pollId);
    PollWebAPIUtils.deletePoll(pollId);
  }

  render() {
    const title = 'My Polls';
    this.context.onSetTitle(title);
    if (this.state.userPolls.length > 0) {
      var pollNodes = this.state.userPolls.map((poll) => {
        return (
          <Poll key={poll.id} id={poll.id} name={poll.pollName}
                pollOptions={poll.pollOptions} pollResults={poll.pollResults}
                onDelete={this.handleDelete}
          />
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

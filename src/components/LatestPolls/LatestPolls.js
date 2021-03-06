/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './LatestPolls.css';
import PollStore from '../../stores/PollStore';
import Link from '../Link';

class PollChart extends Component {

  componentDidMount() {
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.create(ele, {
      width: '95%',
      height: '30'
    }, this.getChartState());
    console.log('LatestPolls/Poll/PollChart constructed.');
  }

  componentDidUpdate() {
    console.log('LatestPolls/Poll/PollChart updated.');
    var ele = ReactDOM.findDOMNode(this);
    D3PollChart.update(ele, this.getChartState(), 30);
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
      <div className="LatestPolls-PollChart"></div>
    )
  }
}

class Poll extends Component {
  constructor(props) {
    super(props);
    var url = '';
    if (typeof window !== 'undefined') {
      url = window.location.protocol + '//' + window.location.hostname + ((window.location.port !== '') ? window.location.port: '');
    }
    this.state = {
      tweet: `Vote on this poll I saw at ${url}/poll/`
    }
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    console.log('LatestPolls/Poll updated.');
  }

  render() {
    return (
      <div className="LatestPolls-poll">
        <h2 className="LatestPolls-poll-title">{this.props.name}</h2>
        <PollChart data={this.props.pollResults} pollOptions={this.props.pollOptions} />
        <a className="LatestPolls-pollLink" href={'/polls/' + this.props.id} onClick={Link.handleClick}>Place Vote / View</a>
        <span>·</span>
        <a className="LatestPolls-pollLink" href={'https://twitter.com/intent/tweet?text=' + this.state.tweet + this.props.id}>
          <i className='fa fa-twitter'></i>Share
        </a>
      </div>
    )
  }
}

@withStyles(styles)
class LatestPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPolls: []
    };
    this.getStateFromStores = this.getStateFromStores.bind(this);
    this._onChange = this._onChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  getStateFromStores() {
    return {
      latestPolls: PollStore.getLatest()
    };
  }

  componentDidMount() {
    PollStore.addChangeListener(this._onChange);
    this.setState({latestPolls: PollStore.getLatest()});
  }

  componentWillUnmount() {
    PollStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log('LatestPollsGotChangeEvent');
    this.setState(this.getStateFromStores());
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    console.log('rendered');
    console.log(this.state.latestPolls);
    const title = 'Tally';
    this.context.onSetTitle(title);
    var pollNodes = this.state.latestPolls.map((poll) => {
      return (
        <Poll key={poll.id} id={poll.id} name={poll.pollName} pollOptions={poll.pollOptions} pollResults={poll.pollResults} />
      )
    });
    return (
      <div className="LatestPolls">
        <div className="LatestPolls-container">
          <h1>Latest Polls</h1>
          <div className="LatestPolls-polls-container">
            {pollNodes}
          </div>
        </div>
      </div>
    );
  }

}

export default LatestPolls;

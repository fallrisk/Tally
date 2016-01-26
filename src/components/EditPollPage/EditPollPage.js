/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './EditPollPage.css';
import PollStore from '../../stores/PollStore';
import UserStore from '../../stores/UserStore';
import Link from '../Link';
import PollActions from '../../actions/PollActions';
import PollWebAPIUtils from '../../utils/PollWebAPIUtils';
import Location from '../../core/Location';

@withStyles(styles)
class EditPollPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      options: ['', '']
    };
    this._onChange = this._onChange.bind(this);
    this._addOption = this._addOption.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._removeOption = this._removeOption.bind(this);
    this._getPollFromStore = this._getPollFromStore.bind(this);
  }

  _getPollFromStore() {
    var poll = PollStore.get(this.props.pollId);
    console.log('From store ',poll);
    this.setState({name: poll.pollName, options: poll.pollOptions, id: poll.id});
  }

  componentDidMount() {
    this._getPollFromStore();
  }

  _onChange(i, e) {
    //console.log('_onChange: ', i, e);
    if (i === undefined) {
      var newState = {};
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    } else {
      // A poll option was changed.
      var options = this.state.options;
      options[i] = e.target.value;
      this.setState({options: options});
    }
  }

  // Adds another option to the list.
  _addOption() {
    var options = this.state.options;
    options.push('');
    this.setState({options: options});
  }

  _removeOption(optionIndex) {
    if (this.state.options.length > 2) {
      var options = this.state.options;
      options.splice(optionIndex, 1);
      this.setState({options: options});
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // On a submit build the poll options from the input boxes, but remove the options
    // that are empty.
    PollWebAPIUtils.updatePoll({
      name: this.state.name,
      options: this.state.options,
      id: this.state.id
    });
    Location.pushState('/polls/user/' + UserStore.get().username);
  }

  render() {
    const title = 'Editing Poll ' + this.state.name;
    this.context.onSetTitle(title);

    var pollOptionNodes = this.state.options.map((option, i) => {
      return (
        <div key={i} className="EditPollPage-formGroup">
          <input type="text" placeholder={'Poll Option ' + i}
                 onChange={this._onChange.bind(this, i)} value={option} />
          <button type="button" onClick={this._removeOption.bind(this, i)}>Remove</button>
        </div>
      );
    });

    return (
      <div className="EditPollPage">
        <div className="EditPollPage-container">
          <h1>{title}</h1>
          <form method="POST" onSubmit={this._handleSubmit}>
            <input type="text" name="name" placeholder="Poll Name" value={this.state.name}
                   onChange={this._onChange.bind(this, undefined)} />
            <div className="EditPollPage-pollOptionsContainer">
              {pollOptionNodes}
            </div>
            <div className="EditPollPage-buttonGroup">
              <button type="button" onClick={this._addOption}>Add Option</button>
              <button type="button">Cancel</button>
              <button type="submit">Update Poll</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default EditPollPage;

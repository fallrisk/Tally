/**
 * Created by Justin on 2016-01-13.
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '../../decorators/withStyles';
import styles from './NewPollPage.css';
import PollStore from '../../stores/PollStore';
import UserStore from '../../stores/UserStore';
import Link from '../Link';
import PollActions from '../../actions/PollActions';
import PollWebAPIUtils from '../../utils/PollWebAPIUtils';
import Location from '../../core/Location';

@withStyles(styles)
class NewPollPage extends Component {

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
    PollWebAPIUtils.createPoll({
      name: this.state.name,
      options: this.state.options
    });
    Location.pushState('/polls/user/' + UserStore.get().username);
  }

  render() {
    const title = 'New Poll';
    this.context.onSetTitle(title);

    var pollOptionNodes = this.state.options.map((option, i) => {
      return (
        <div className="NewPollPage-formGroup">
          <input key={i} type="text" placeholder={'Poll Option ' + i}
                 onChange={this._onChange.bind(this, i)} value={option} />
          <button type="button" onClick={this._removeOption.bind(this, i)}>Remove</button>
        </div>
      );
    });

    return (
      <div className="NewPollPage">
        <div className="NewPollPage-container">
          <h1>{title}</h1>
          <form method="POST" onSubmit={this._handleSubmit}>
            <input type="text" name="name" placeholder="Poll Name" onChange={this._onChange.bind(this, undefined)} />
            <div className="NewPollPage-pollOptionsContainer">
              {pollOptionNodes}
            </div>
            <div className="NewPollPage-buttonGroup">
              <button type="button" onClick={this._addOption}>Add Option</button>
              <button type="button">Cancel</button>
              <button type="button">Clear Form</button>
              <button type="submit">Create Poll</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default NewPollPage;

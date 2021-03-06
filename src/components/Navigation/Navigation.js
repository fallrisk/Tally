/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import Location from '../../core/Location';
import request from 'superagent';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.get()
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onUserChange = this._onUserChange.bind(this);
    this._handleLogout = this._handleLogout.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onUserChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onUserChange);
  }

  _onUserChange() {
    this.setState({user: UserStore.get() });
  }

  _handleLogout(e) {
    e.preventDefault();
    UserActions.userLoggedOut();
    Location.pushState('/');
    request.get('http://localhost:3000/api/users/logout')
      .timeout(2000)
      .end((err, res) => {
        // Do nothing.
      });
  }

  render() {
    if (this.state.user.loggedIn) {
      // I decided I'm not going to support a user profile on this project.
      //<a className="Navigation-link" href="/profile" onClick={Link.handleClick}>Profile</a>
      //<span className="Navigation-spacer">or</span>
      return (
        <div className={classNames(this.props.className, 'Navigation')} role="navigation">
          <a className="Navigation-link" href={'/polls/user/' + this.state.user.username} onClick={Link.handleClick}>View My Polls</a>
          <span className="Navigation-spacer">·</span>
          <a className="Navigation-link" href="/polls/new" onClick={Link.handleClick}>Create a Poll</a>
          <span className="Navigation-spacer"> | </span>
          <a className="Navigation-link" onClick={this._handleLogout}>Log out</a>
        </div>
      );
    } else {
      return (
        <div className={classNames(this.props.className, 'Navigation')} role="navigation">
          <span className="Navigation-spacer"> | </span>
          <a className="Navigation-link" href="/login" onClick={Link.handleClick}>Log in</a>
          <span className="Navigation-spacer">or</span>
          <a className="Navigation-link" href="/register" onClick={Link.handleClick}>Register</a>
        </div>
      );
    }
  }

}

export default Navigation;

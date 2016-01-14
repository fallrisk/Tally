/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    // TODO When a user is logged in have it show "Profile * Logout".
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

export default Navigation;

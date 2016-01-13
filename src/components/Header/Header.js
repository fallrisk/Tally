/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  //<img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <span className="Header-brandTxt">Tally</span>
          </a>
          <span className="Header-brandSlogan">A vote application</span>
          <Navigation className="Header-nav" />
        </div>
      </div>
    );
  }

}

export default Header;

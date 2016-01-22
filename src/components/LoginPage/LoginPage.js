
/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';
import request from 'superagent';
import Location from '../../core/Location';
import UserActions from '../../actions/UserActions';

@withStyles(styles)
class LoginPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this._onChange = this._onChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }

  _onChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _handleLogin(e) {
    e.preventDefault();
    var self = this;
    request.post('http://localhost:3000/api/users/login')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .timeout(2000)
      .end((err, res) => {
        if (err) {
          console.log(err);
          //console.log(res);
        } else {
          if (res.body.hasOwnProperty('error')) {

          } else {
            // Successful login.
            // Redirect on successful login.
            UserActions.userLoggedIn(this.state.username);
            Location.pushState('/');
          }
        }
      });
  }

  render() {
    const title = 'Log In';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <h1>{title}</h1>
          <form metod="POST" onSubmit={this._handleLogin}>
            <input type="text" name="username" placeholder="Username" onChange={this._onChange} value={this.state.username} />
            <div className="LoginPage-errorBox" id="errorBoxForUsername">Message</div>
            <input type="password" name="password" placeholder="Password" onChange={this._onChange} value={this.state.password} />
            <div className="LoginPage-errorBox" id="errorBoxForPassword">Message</div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }

}

export default LoginPage;

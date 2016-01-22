/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.css';
import request from 'superagent';

@withStyles(styles)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      isValidUsername: false,
      isSuccessfulRegistration: false
    };
    this._onChange = this._onChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateStyles = this._updateStyles.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    var self = this;
    request.post('http://localhost:3000/api/users/register')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .timeout(2000)
      .end((err, res) => {
        //var self = this;
        console.log('In request response.');
        if (err) {
          //console.log('Error occurred registering a new user.' + err);
        } else {
          var resData = JSON.parse(res.text);
          console.log(resData);
          if (resData.hasOwnProperty('error')) {
            if (resData.errorCode === 1) {
            }
          } else {
            console.log('Success!');
            self.setState({isSuccessfulRegistration: true});
          }
        }
      });
  }

  _onChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  _updateStyles() {
    var style = {};
    if (this.state.repeatPassword !== '') {
      if (this.state.password === this.state.repeatPassword) {
        // Change the style of the bottom border on the repeat password.
        style.repeatPasswordStyle = {borderBottom: '1px solid green'};
      } else {
        style.repeatPasswordStyle = {borderBottom: '1px solid red'};
      }
    } else {
      style.repeatPasswordStyle = {borderBottom: '1px solid #3a3a3a'};
    }

    if (this.state.username !== '') {
      if (this.state.isValidUsername) {
        style.username = {borderBottom: '1px solid green'};
      } else {
        style.username = {borderBottom: '1px solid green'};
      }
    } else {
      style.username = {borderBottom: '1px solid #3a3a3a'};
    }
    return style;
  }

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    var styles = this._updateStyles();

    if (!this.state.isSuccessfulRegistration) {
      return (
        <div className="RegisterPage">
          <div className="RegisterPage-container">
            <h1>{title}</h1>
            <p>Register to become a new user on Tally.</p>
            <form metod="POST" onSubmit={this._handleSubmit}>
              <input type="text" name="username" placeholder="Username" onChange={this._onChange} value={this.state.username} />
              <div className="RegisterPage-errorBox" id="errorBoxForUsername">Message</div>
              <input type="password" name="password" placeholder="Password" onChange={this._onChange} value={this.state.password} />
              <div className="RegisterPage-errorBox" id="errorBoxForPassword">Message</div>
              <input type="password" name="repeatPassword" placeholder="Repeat Password"
                     style={styles.repeatPasswordStyle}
                     onChange={this._onChange} value={this.state.repeatPassword} />
              <div className="RegisterPage-errorBox" id="errorBoxForRepeatPassword">Message</div>
              <button type="submit" value="Register">Register</button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="RegisterPage">
          <div className="RegisterPage-container">
            <div className="RegisterPage-successfulRegistration">
              <h1>Welcome aboard! You have successfully registered.</h1>
            </div>
          </div>
        </div>
      );
    }
  }

}

export default RegisterPage;

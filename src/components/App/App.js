/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';
import PollWebAPIUtils from '../../utils/PollWebAPIUtils';

PollWebAPIUtils.getAllPolls();

@withContext
@withStyles(styles)
class App extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div>
        <Header />
        <div className="App-Content">
        {this.props.children}
        </div>
        <Footer />
      </div>
    ) : this.props.children;
  }

}

export default App;

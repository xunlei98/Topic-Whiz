import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Main from './src/main';

class topicwhiz extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('topicwhiz', () => topicwhiz);

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles';
import { firebaseApp } from './authentication';

module.exports = React.createClass({
  getInitialState() {
    return ({
      email: '',
      password: '',
      result: ''
    });
  },

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user', user);
        this.props.navigator.push({ name: 'topics' });
        // navigate to our main application page.
      }
    });
  },

  signIn() {
    let { email, password } = this.state;

    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error:', error.message);
        this.setState({ result: error.message });
      });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.signIn()}
        >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push({ name: 'signUp' });
            }}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

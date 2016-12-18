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
      confirmPassword: '',
      result: ''
    });
  },

  signUp() {
    if (this.state.password == this.state.confirmPassword) {
      let { email, password } = this.state;
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => this.setState({ result: error.message }));
    } else {
      this.setState({ result: 'Passwords did not match.' })
    }
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
        <TextInput
          style={styles.input}
          placeholder='Confirm password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.signUp()}
        >
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Text style={styles.link}>Already a member? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';

import styles from '../styles';
import { firebaseApp, topicsRef } from './auth/authentication';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

module.exports = React.createClass({
  getInitialState() {
    return ({
      displayName: '',
      title: '',
      dataSource: ds.cloneWithRows([{
        title: 'Why is the sky blue?',
        author: 'George'
      }])
    });
  },

  componentDidMount() {
    let user = firebaseApp.auth().currentUser;

    if (!user.displayName) {
      this.props.navigator.push({
        name: 'chooseName'
      });
    } else {
      this.setState({
        // proceed normally with application
        displayName: user.displayName
      });

      this.listenForItems(topicsRef);
    }
  },

  listenForItems(ref) {
    ref.on('value', (snap) => {
      let topics = [];
      snap.forEach(topic => {
        topics.push({
          title: topic.val().title,
          author: topic.val().author
        });
      });
      this.setState({ dataSource: ds.cloneWithRows(topics) });
    });
  },

  signOut() {
    firebaseApp.auth().signOut()
      .then(() => {
        this.props.navigator.popToTop();
      }, (error) => {
        console.log(error);
      });
  },

  addTopic() {
    topicsRef.push({
      title: this.state.title,
      author: this.state.displayName
    });
  },

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowTitle}>
          {rowData.title}
        </Text>
        <Text>
          {rowData.author}
        </Text>
      </View>
    );
  },

  render() {
    return (
      <View style={styles.topics}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.signOut()}
          >
            <Text style={styles.link}>
              Sign Out
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {this.state.displayName}
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            placeholder='Something on your mind?'
            style={styles.input}
            onChangeText={(text) => this.setState({ title: text })}
            onEndEditing={() => this.addTopic()}
          />
          <ListView
            style={styles.list}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    );
  }
});

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCcidMWWcfthqYUF6i15V_Ow7lXvvh_vCM',
  authDomain: 'topic-whiz.firebaseapp.com',
  databaseURL: 'https://topic-whiz.firebaseio.com',
  storageBucket: 'topic-whiz.appspot.com',
  messagingSenderId: '913641623459'
};

export const firebaseApp = firebase.initializeApp(config);
export const topicsRef = firebase.database().ref();

import * as firebase from 'firebase';
import 'firebase/firestore';

const prodConfig = {
  apiKey: "AIzaSyDsoxi8jDn5Nh2-rJBxrOQPmZQQJkCzqeM",
      authDomain: "em-pro-audio.firebaseapp.com",
      databaseURL: "https://em-pro-audio.firebaseio.com",
      projectId: "em-pro-audio",
      storageBucket: "em-pro-audio.appspot.com",
      messagingSenderId: "484148208454"
};

const devConfig = {
  apiKey: "AIzaSyDsoxi8jDn5Nh2-rJBxrOQPmZQQJkCzqeM",
      authDomain: "em-pro-audio.firebaseapp.com",
      databaseURL: "https://em-pro-audio.firebaseio.com",
      projectId: "em-pro-audio",
      storageBucket: "em-pro-audio.appspot.com",
      messagingSenderId: "484148208454"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();

export {
  db,
  auth,
};

import * as firebase from 'firebase';
import 'firebase/firestore';

import {initFirestorter, Collection} from 'firestorter';

// Initialize firebase app
firebase.initializeApp({
  apiKey: "AIzaSyDsoxi8jDn5Nh2-rJBxrOQPmZQQJkCzqeM",
  authDomain: "em-pro-audio-88747.firebaseapp.com",
  databaseURL: "https://em-pro-audio-88747.firebaseio.com",
  projectId: "em-pro-audio",
  storageBucket: "em-pro-audio.appspot.com",
  messagingSenderId: "484148208454"
});

// Initialize `firestorter`
initFirestorter({firebase: firebase});

const auth = firebase.auth();

export {
  auth
};

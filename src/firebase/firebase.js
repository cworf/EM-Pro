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

// Define collection
const eventsCol = new Collection('events');
const clients = new Collection('clients');
const venues = new Collection('venues');
const inventory = new Collection('inventory');
const orders = new Collection('orders');
const conflicts = new Collection('conflicts');
const users = new Collection('users');

const wilmaStages = new Collection('venues/C4DbF1COxfoWlOeRjLR4/stages')
const carasStages = new Collection('venues/P9KN85g1jC0bKSs3A3H6/stages')

const auth = firebase.auth();

export {
  auth,
  eventsCol,
  clients,
  venues,
  inventory,
  orders,
  conflicts
};

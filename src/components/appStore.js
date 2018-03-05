import firebase from 'firebase';
import 'firebase/firestore';
import {initFirestorter, Collection} from 'firestorter';

// Initialize firebase app
firebase.initializeApp({
  apiKey: "AIzaSyA3R14Pq8XBuaUv9cu3O_d8ekrk_fN3tpQ",
  authDomain: "mpro-df1b9.firebaseapp.com",
  databaseURL: "https://mpro-df1b9.firebaseio.com",
  projectId: "mpro-df1b9",
  storageBucket: "mpro-df1b9.appspot.com",
  messagingSenderId: "171467531023"
});

// Initialize `firestorter`
initFirestorter({firebase: firebase});

// Define collection
export const events = new Collection('events');
export const clients = new Collection('clients');
export const venues = new Collection('venues');
export const inventory = new Collection('inventory');
export const requests = new Collection('requests');

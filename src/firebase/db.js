import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
    company: 'montanaproaudio'
  });

// Other db APIs ...

import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
  });

export const getUser = (user) =>
  db.doc(`users/${user.uid}`).get();

export const getData = (company, request) => {
  const count = query => {
    const regex = /\//g
    return ((query || '').match(regex) || []).length
  }
  const promises = []
  for (let i = 0; i < request.length; i++) {
    if (request[i] === '/') {
      promises[i] = db.doc(`companies/${company}`).get()
    } else {
      count(request[i]) % 2 === 0 //has even number of forward slashes
        ? promises[i] = db.collection(`companies/${company}/${request[i]}`).get()
        : promises[i] = db.doc(`companies/${company}/${request[i]}`).get()
    }
  }
  return Promise.all(promises)
}

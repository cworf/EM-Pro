import {Document} from 'firestorter'

// User API

export const doCreateUser = async(id, username, email) =>{
const user = new Document(`users/${id}`)
  return await user.set({
    username,
    email,
    company: 'somethingelse'
  });
}
// Other db APIs ...

import { observable, action } from 'mobx';
import { Document } from 'firestorter'

class UserStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.user = new Document()
  }

  @action setUser = path => {
    this.user.path = path;
  }
}

export default UserStore;

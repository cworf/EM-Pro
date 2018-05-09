import { observable, action } from 'mobx';

class UserStore {
  @observable user = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUser = user => {
    this.user = user;
  }
}

export default UserStore;

import { configure } from 'mobx';

import SessionStore from './sessionStore';
import UserStore from './userStore';
import DataStore from './dataStore';

configure({ enforceActions: true });

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.dataStore = new DataStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;

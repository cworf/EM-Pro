import { action } from 'mobx';
import { Collection } from 'firestorter'

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.eventsCol = new Collection()
  }

  @action setData = path => {
    this.eventsCol.path = path
  }
}

export default DataStore;

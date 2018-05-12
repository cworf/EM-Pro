import { action } from 'mobx';
import { Collection, Document  } from 'firestorter'

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.eventsCol = new Collection()
    this.clients = new Collection();
    this.venues = new Collection();
    this.inventory = new Collection();
    this.orders = new Collection();
    this.conflicts = new Collection();
    this.users = new Collection();
    this.company = new Document();
  }

  @action setData = path => {
    this.eventsCol.path = path
  }
}

export default DataStore;

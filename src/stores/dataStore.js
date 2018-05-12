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

  @action setData = (storeAs, path, query) => {
    this[storeAs].path = path
    // this[storeAs].query = !!query && query(this[storeAs])
  }
  @action setQuery = (storeAs, getQuery) => {
    this[storeAs].query = !!getQuery && getQuery(this[storeAs])
  }
}

export default DataStore;

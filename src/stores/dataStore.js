import { action, observable } from 'mobx';
import { Collection, Document  } from 'firestorter'

class DataStore {
  @observable dynamicDocs = new Map()
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

  @action setData = (storeAs, path) => {
    this[storeAs].path = path
  }
  @action setDataMap = (path) => {
    this.dynamicDocs.set(path, new Document(path))
  }
  @action setQuery = (storeAs, getQuery) => {
    if (this[storeAs].query !== !!getQuery && getQuery(this[storeAs])) {
      this[storeAs].query = !!getQuery && getQuery(this[storeAs])
    }
  }
}

export default DataStore;

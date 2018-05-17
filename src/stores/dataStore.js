import { action, observable } from 'mobx';
import { Collection, Document  } from 'firestorter'

class DataStore {
  @observable dynamicDocs = new Map()
  @observable dynamicCols = new Map()
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
    if (this[storeAs].path !== path) this[storeAs].path = path
  }
  @action setDataMap = (path) => {
    const sections = path.split('/').length
    if (sections % 2 === 0) {
      this.dynamicDocs.set(path, new Document(path))
    } else {
      this.dynamicCols.set(path, new Collection(path))
    }
  }
  @action setQueryOnMap = (path, getQuery) => {
    const collection = this.dynamicCols.get(path)
    if (collection.query !== !!getQuery && getQuery(collection))
    collection.query = !!getQuery && getQuery(collection)
  }
  @action setQuery = (storeAs, getQuery) => {
    if (this[storeAs].query !== !!getQuery && getQuery(this[storeAs])) {
      this[storeAs].query = !!getQuery && getQuery(this[storeAs])
    }
  }
}

export default DataStore;

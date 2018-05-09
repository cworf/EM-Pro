import { observable, action } from 'mobx';

class DataStore {
  @observable companyData = new Map()
  @observable dataReceived = false

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setData = (storeAs, data) => {
    for (var i = 0; i < storeAs.length; i++) {
      this.companyData.set(storeAs[i], data[i])
    }
  }
}

export default DataStore;

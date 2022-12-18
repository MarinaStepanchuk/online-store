import { IProducts } from './data.interfaces';

class Database {
  dataJSON: IProducts;

  constructor(dataJSON: IProducts) {
    this.dataJSON = dataJSON;
  }

  getData() {
    return this.dataJSON;
  }
}

export default Database;

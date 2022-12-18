import { IProducts } from './data.interfaces';

class Database {
  private dataJSON: IProducts;

  constructor(dataJSON: IProducts) {
    this.dataJSON = dataJSON;
  }

  public getData(): IProducts {
    return this.dataJSON;
  }
}

export default Database;

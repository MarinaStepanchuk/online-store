import { IProducts, IProduct } from './data.interfaces';

class Database {
  private dataJSON: IProduct[];

  constructor(dataJSON: IProducts) {
    this.dataJSON = dataJSON.products;
  }

  public getData(): IProduct[] {
    return this.dataJSON;
  }
}

export default Database;

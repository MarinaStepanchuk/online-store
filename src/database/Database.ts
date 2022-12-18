import data from './data.json';
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

const DataBase = new Database(data);

export default DataBase;

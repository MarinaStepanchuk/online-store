import data from './data.json';
import { IProducts, IProduct } from './data.interfaces';

class Database {
  static dataJSON : IProducts = data;

  static getAllProducts(): IProduct[] {
    return Database.dataJSON.products;
  }
}

export default Database;

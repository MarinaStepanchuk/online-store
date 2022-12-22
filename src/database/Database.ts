import data from './data.json';
import { IProduct } from './Database.interfaces';

class Database {
  static dataJSON : IProduct[] = data.products;

  static getAllProducts(): IProduct[] {
    return Database.dataJSON;
  }
}

export default Database;

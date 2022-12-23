import data from './data.json';
import { IProduct } from './DataBase.interfaces';

class Database {
  static dataJSON : IProduct[] = data.products;

  static getAllProducts(): IProduct[] {
    return Database.dataJSON;
  }

  static getAllCategories(): string[] {
    const uniqueCategories = new Set(Database.dataJSON.map((product: IProduct) => product.category));
    return [...uniqueCategories];
  }

  static getAllBrands(): string[] {
    const uniqueBrands = new Set(Database.dataJSON.map((product: IProduct) => product.brand));
    return [...uniqueBrands];
  }
}

export default Database;

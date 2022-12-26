import data from './data.json';
import { IProduct } from './DataBase.interfaces';

class Database {
  static dataJSON : IProduct[] = data.products;

  static getAllProducts(): IProduct[] {
    return Database.dataJSON;
  }

  static getAllCategories(): string[] {
    const uniqueCategories = new Set(Database.dataJSON.map((p: IProduct) => p.category));
    return [...uniqueCategories];
  }

  static getAllBrands(): string[] {
    const uniqueBrands = new Set(Database.dataJSON.map((p: IProduct) => p.brand));
    return [...uniqueBrands];
  }

  static getMinMaxStock(): [number, number] {
    const stockValues = Database.dataJSON.map((p: IProduct) => p.stock);

    return [
      Math.min(...stockValues),
      Math.max(...stockValues),
    ];
  }

  static getMinMaxPrice(): [number, number] {
    const discountValues = Database.dataJSON.map((p: IProduct) => p.price);

    return [
      Math.min(...discountValues),
      Math.max(...discountValues),
    ];
  }
}

export default Database;

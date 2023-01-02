import data from './data.json';
import { IPageParams, IProcessedData, IProduct } from './DataBase.interfaces';

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

  static getProductById(id: number): IProduct {
    return Database.dataJSON.find((prod: IProduct) => prod.id === id) as IProduct;
  }

  static getProductByParameters(param: string): IProduct | undefined {
    return Database.dataJSON.find((elem) => elem.id === Number(param));
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

  static getProcessedData(params: IPageParams): IProcessedData {
    const processedData: IProcessedData = {
      productsId: new Set(),
      categories: {},
      brands: {},
      priceScale: Database.getMinMaxPrice(),
      stockScale: Database.getMinMaxStock(),
      price: params.price || Database.getMinMaxPrice(),
      stock: params.stock || Database.getMinMaxStock(),
    };

    const isSuitable = (product: IProduct) => {
      if (params.category && !params.category.has(product.category)) {
        return false;
      }

      if (params.brand && !params.brand.has(product.brand)) {
        return false;
      }

      if (params.price?.length) {
        const [min, max] = params.price;

        if (min > product.price || max < product.price) {
          return false;
        }
      }

      if (params.stock?.length) {
        const [min, max] = params.stock;

        if (min > product.stock || max < product.stock) {
          return false;
        }
      }

      if (params.search) {
        if (!(product.title.includes(params.search) || product.description.includes(params.search))) {
          return false;
        }
      }

      return true;
    };

    Database.dataJSON.forEach((product: IProduct) => {
      if (isSuitable(product)) {
        processedData.productsId.add(product.id);

        if (processedData.categories[product.category]) {
          processedData.categories[product.category].active += 1;
          processedData.categories[product.category].total += 1;
          processedData.categories[product.category].isEmphasized = true;
        } else {
          processedData.categories[product.category] = {
            active: 1,
            total: 1,
            isEmphasized: true,
          };
        }

        if (processedData.brands[product.brand]) {
          processedData.brands[product.brand].active += 1;
          processedData.brands[product.brand].total += 1;
          processedData.brands[product.brand].isEmphasized = true;
        } else {
          processedData.brands[product.brand] = {
            active: 1,
            total: 1,
            isEmphasized: true,
          };
        }
      } else {
        if (processedData.categories[product.category]) {
          processedData.categories[product.category].total += 1;
        } else {
          processedData.categories[product.category] = {
            active: 0,
            total: 1,
            isEmphasized: false,
          };
        }

        if (processedData.brands[product.brand]) {
          processedData.brands[product.brand].total += 1;
        } else {
          processedData.brands[product.brand] = {
            active: 0,
            total: 1,
            isEmphasized: false,
          };
        }
      }

      if (!(params.category || params.brand)) {
        const categoryKeys = Object.keys(processedData.categories);
        const brandKeys = Object.keys(processedData.brands);

        categoryKeys.forEach((key: string) => {
          processedData.categories[key].isEmphasized = false;
        });

        brandKeys.forEach((key: string) => {
          processedData.brands[key].isEmphasized = false;
        });
      }
    });

    return processedData;
  }
}

export default Database;

import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProcessedData, IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import sort from '../../utils/sort';
import { DEFAULT_MODE } from './ProductsGrid.const';

class ProductsGrid {
  private readonly productsDataList: IProduct[];

  constructor(private data: IProcessedData) {
    this.data = data;
    this.productsDataList = [...this.data.productsId].map((id: number) => Database.getProductById(id));
  }

  render(): string {
    const sortedDataList = this.getSortedList(this.data.sort);
    const productsList = sortedDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');
    return `<div class="grid ${this.data.mode || DEFAULT_MODE}">${productsList}</div>`;
  }

  getSortedList(sortingType: string): IProduct[] {
    return sort(this.productsDataList, sortingType);
  }
}

export default ProductsGrid;

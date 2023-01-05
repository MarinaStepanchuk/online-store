import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';

const DEFAULT_MODE = 'grid3';

class ProductsGrid {
  private productsDataList: IProduct[];

  constructor(
    private productsId: number[],
    private mode: string,
  ) {
    this.productsId = productsId;
    this.productsDataList = productsId.map((id: number) => Database.getProductById(id));
  }

  render(): string {
    const productsList = this.productsDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');

    return `<div class="grid ${this.mode || DEFAULT_MODE}">${productsList}</div>`;
  }
}

export default ProductsGrid;

import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';

class ProductsGrid {
  private productsDataList: IProduct[];

  constructor(private productsId: number[]) {
    this.productsId = productsId;
    this.productsDataList = productsId.map((id: number) => Database.getProductById(id));
  }

  render(): string {
    const productsList = this.productsDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');

    return `<div class="grid grid3col">${productsList}</div>`;
  }
}

export default ProductsGrid;

import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import changeStatusButton from '../../utils/changeStatusButton';
import { findElem } from '../../utils/findElem';

class ProductsGrid {
  private productsDataList: IProduct[] = Database.getAllProducts();

  private addListeners(): void {
    setTimeout(() => {
      const allProducts = findElem('.grid');
      allProducts.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;
        if (element.className === 'product-item__buttons_white') {
          const productContainer = element.closest('.product-item') as HTMLElement;
          const id = Number(productContainer.id);
          changeStatusButton(element, id);
        }
      });
    });
  }

  render(): string {
    const productsList = this.productsDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');

    this.addListeners();

    return `<div class="grid grid3col">${productsList}</div>`;
  }
}

export default ProductsGrid;

import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import Basket from '../../utils/Basket';
import { Button } from '../../common.types/enums';

class ProductsGrid {
  private productsDataList: IProduct[] = Database.getAllProducts();

  render(): string {
    const productsList = this.productsDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');
    const basket = new Basket();

    setTimeout(() => {
      document.querySelector('.grid')?.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;
        if (element.className === 'product-item__buttons_white') {
          const id = Number(element.parentElement?.parentElement?.id)
          if (basket.basketContain(id)) {
            element.innerHTML = `${Button.ADD}`;
            basket.removeProductFromBasket(id);
          } else {
            element.innerHTML = `${Button.REMOVE}`;
            basket.setProductToBasket(id);
          }
        }
      });
    }, 0);
    return `<div class="grid grid3col">${productsList}</div>`;
  }
}

export default ProductsGrid;

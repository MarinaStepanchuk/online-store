import './BasketGoods.style.scss';
import BasketProduct from '../BasketProduct/BasketProduct';
import { IBasketProduct } from '../BasketProduct/BasketProduct.interface';

class BasketGoods {
  private goodsList: IBasketProduct[];

  constructor(goodsList: IBasketProduct[]) {
    this.goodsList = goodsList;
  }

  render() {
    return `
      <table class="basket-goods">
        <thead>
          <tr>
            ${this.getTableCaptions()}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${this.getListOfGoods()}
          </tr>
        </tbody>
      </table>`;
  }

  getTableCaptions() {
    return `
      <th class="basket-goods__index caption">Products</th>
      <th class="basket-goods__image caption"></th>
      <th class="basket-goods__desc caption"></th>
      <th class="basket-goods__prices caption">Price</th>
      <th class="basket-goods__quantity caption">Quantity</th>
      <th class="basket-goods__total caption">Total</th>
      <th class="basket-goods__remove caption"></th>`;
  }

  getListOfGoods() {
    return this.goodsList.reduce((acc: string, prod: IBasketProduct): string => `${acc}<td class="basket-product">${new BasketProduct(prod).render()}</td>`, '');
  }
}

export default BasketGoods;

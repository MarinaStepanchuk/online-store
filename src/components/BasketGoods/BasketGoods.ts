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
          ${this.getListOfGoods()}
        </tbody>
      </table>`;
  }

  getTableCaptions() {
    return `
      <th class="basket-goods__index"></th>
      <th class="basket-goods__product">Products</th>
      <th class="basket-goods__prices">Price</th>
      <th class="basket-goods__quantity">Quantity</th>
      <th class="basket-goods__total">Total</th>
      <th class="basket-goods__remove"></th>`;
  }

  getListOfGoods() {
    return this.goodsList.reduce((acc: string, prod: IBasketProduct): string => (
      `
      ${acc}
      <tr class="basket-product">
        ${new BasketProduct(prod).render()}
      </tr>
      `
    ), '');
  }
}

export default BasketGoods;

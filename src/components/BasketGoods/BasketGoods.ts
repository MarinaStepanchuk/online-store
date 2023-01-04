import './BasketGoods.style.scss';
import BasketProduct from '../BasketProduct/BasketProduct';
import { IBasketProduct } from '../BasketProduct/BasketProduct.interface';
import { findElem, findElems } from '../../utils/findElem';
import Basket from '../../utils/Basket';
import Database from '../../database/Database';
import { Symbol } from '../../common.types/enums';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import BasketCalc from '../BasketCalc/BasketCalc';

class BasketGoods {
  private goodsList: IBasketProduct[];

  constructor(goodsList: IBasketProduct[]) {
    this.goodsList = goodsList;
  }

  private addListeners(): void {
    setTimeout(() => {
      const basketCoods = findElem('.basket-goods');
      basketCoods.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;
        switch (element.className) {
          case 'basket-product__quantity__plus':
            this.increaseAmountProduct(element);
            new BasketCalc().updateBasketCalcHeader();
            break;
          case 'basket-product__quantity__minus':
            this.decreaseAmountProduct(element);
            new BasketCalc().updateBasketCalcHeader();
            break;
          case 'basket-product__remove':
            this.removeProduct(element);
            new BasketCalc().updateBasketCalcHeader();
            break;
          default:
            break;
        }
      });
    }, 0);
  }

  private increaseAmountProduct(element: HTMLElement) {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    const countElement = findElem('.basket-product__quantity__value', productContainer);
    const count = Number(countElement.innerHTML);
    const { stock } = Database.getProductById(id);
    if (count < stock) {
      countElement.innerHTML = `${count + 1}`;
      new Basket().increaseAmount(id);
      this.recalculationSum(productContainer, id);
    }
  }

  private decreaseAmountProduct(element: HTMLElement) {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    const countElement = findElem('.basket-product__quantity__value', productContainer);
    const count = Number(countElement.innerHTML);
    if (count > 1) {
      countElement.innerHTML = `${count - 1}`;
      new Basket().decreaseAmount(id);
      this.recalculationSum(productContainer, id);
    } else {
      this.removeProduct(element);
    }
  }

  private recalculationSum(productContainer: HTMLElement, id: number) {
    const product = Database.getProductById(id);
    const amount = new Basket().getAmountProduct(id);
    const totalOldPrice = findElem('.basket-product__total__old', productContainer);
    totalOldPrice.innerHTML = `${Symbol.CURRENCY}${(product.price * amount).toFixed(2)}`;
    const actualPrice = getPriceAfterDiscont(product.price, product.discountPercentage);
    const totalActualPrice = findElem('.basket-product__total__actual', productContainer);
    totalActualPrice.innerHTML = `${Symbol.CURRENCY}${(actualPrice * amount).toFixed(2)}`;
  }

  private removeProduct(element: HTMLElement): void {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    new Basket().removeProductFromBasket(id);
    productContainer.remove();
    this.refreshGoodsList();
  }

  private refreshGoodsList() {
    this.goodsList = new Basket().getBasketList();
    const sequentialNumbers = [...findElems('.basket-product__index')];
    sequentialNumbers.forEach((item: HTMLElement, index: number) => {
      const element = item as HTMLElement;
      element.innerText = `${index + 1}`;
    });
  }

  render(): string {
    this.addListeners();
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

  getTableCaptions(): string {
    return `
      <th class="basket-goods__index"></th>
      <th class="basket-goods__product">Products</th>
      <th class="basket-goods__prices">Price</th>
      <th class="basket-goods__quantity">Quantity</th>
      <th class="basket-goods__total">Total</th>
      <th class="basket-goods__remove"></th>`;
  }

  getListOfGoods(): string {
    return this.goodsList.reduce((acc: string, prod: IBasketProduct): string => (
      `
      ${acc}
      <tr id="${prod.id}" class="basket-product">
        ${new BasketProduct(prod).render()}
      </tr>
      `
    ), '');
  }
}

export default BasketGoods;

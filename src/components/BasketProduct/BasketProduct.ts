import './BasketProduct.style.scss';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import removeIcon from '../../assets/svg/delete_button.svg';
import { IBasketProduct } from './BasketProduct.interface';

const BUTTON_MINUS_SYMBOL = '-';
const BUTTON_PLUS_SYMBOL = '+';
const DESCRIPTION_BRAND_TITLE = 'brand:';
const DESCRIPTION_SROCK_TITLE = 'stock:';

class BasketProduct {
  private product: IBasketProduct;

  constructor(param: IBasketProduct) {
    this.product = param;
  }

  render(): string {
    const {
      index, amount, title, brand, stock, discountPercentage, price, thumbnail,
    } = this.product;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);
    const totalOldPrice = price * amount;
    const totalActualPrice = actualPrice * amount;

    return `
      <div class="basket-product__index">
        <span>${index}</span>
      </div>
      <div class="basket-product__image">
        <img src=${thumbnail} alt="product image">
      </div>
      <div class="basket-product__desc">
        <span class="basket-product__desc__title">${title}</span>
        <div class="basket-product__desc__brand">
          <span class="basket-product__desc__brand__title">${DESCRIPTION_BRAND_TITLE}</span>
          <span class="basket-product__desc__brand__value">${brand}</span>
        </div>
        <div class="basket-product__desc__stock">
          <span class="basket-product__desc__title">${DESCRIPTION_SROCK_TITLE}</span>
          <span class="basket-product__desc__value">${stock}</span>
        </div>
      </div>
      <div class="basket-product__prices">
        <span class="basket-product__prices__old">${price}</span>
        <span class="basket-product__prices__actual">${actualPrice}</span>
      </div>
      <div class="basket-product__quantity">
        <div class="basket-product__quantity__minus">${BUTTON_MINUS_SYMBOL}</div>
        <span class="basket-product__quantity__value">${amount}</span>
        <div class="basket-product__quantity__plus">${BUTTON_PLUS_SYMBOL}</div>
      </div>
      <div class="basket-product__total">
        <span class="basket-product__total__old">${totalOldPrice}</span>
        <span class="basket-product__total__actual">${totalActualPrice}</span>
      </div>
      <div class="basket-product__remove">
        <img src=${removeIcon} alt="remove product">
      </div>`;
  }
}

export default BasketProduct;

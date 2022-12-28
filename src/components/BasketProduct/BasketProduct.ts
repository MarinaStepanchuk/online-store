import './BasketProduct.style.scss';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import removeIcon from '../../assets/svg/delete_button.svg';
import { IBasketProduct } from './BasketProduct.interface';
import { Titles, Symbols } from '../../common.types/enums';

class BasketProduct {
  private product: IBasketProduct;

  constructor(param: IBasketProduct) {
    this.product = param;
  }

  render(): string {
    const {
      index, amount, title, brand, stock, discountPercentage, price, thumbnail, category, description, id,
    } = this.product;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);
    const totalOldPrice = price * amount;
    const totalActualPrice = actualPrice * amount;

    return `
      <td class="basket-product__index">
        <span>${index}</span>
      </td>
      <td class="basket-product__info" onclick="window.location.pathname = '/product/${id}'">
        <div class="basket-product__container">
          <div class="basket-product__image">
            <img src=${thumbnail} alt="product image">
          </div>
          <div class="basket-product__desc">
            <span class="basket-product__desc__title">${title}</span>
            <div class="basket-product__desc__brand">
              <span class="basket-product__desc__brand__title">${Titles.CATEGORY}</span>
              <span class="basket-product__desc__brand__value">${category}</span>
            </div>
            <div class="basket-product__desc__brand">
              <span class="basket-product__desc__brand__title">${Titles.BRAND}</span>
              <span class="basket-product__desc__brand__value">${brand}</span>
            </div>
            <div class="basket-product__desc__stock">
              <span class="basket-product__desc__title">${Titles.STOCK}</span>
              <span class="basket-product__desc__value">${stock}</span>
            </div>
            <div class="basket-product__desc__discount">
              <span class="basket-product__desc__title">${Titles.DISCOUNT}</span>
              <span class="basket-product__desc__value">${discountPercentage}${Symbols.DISCOUNT}</span>
            </div>
          </div>
        </div>
        <div class="basket-product__descriotion">
          <span class="basket-product__descriotion__value">${description}</span>
        </div>
      </td>
      <td>
        <div class="basket-product__prices">
          <span class="basket-product__prices__old">${Symbols.CURRENCY}${price}</span>
          <span class="basket-product__prices__actual">${Symbols.CURRENCY}${actualPrice}</span>
        </div>
      </td>
      <td class="">
        <div class="basket-product__quantity">
          <div class="basket-product__quantity__minus">${Symbols.MINUS}</div>
          <span class="basket-product__quantity__value">${amount}</span>
          <div class="basket-product__quantity__plus">${Symbols.PLUS}</div>
        </div>
      </td>
      <td class="">
        <div class="basket-product__total">
          <span class="basket-product__total__old">${Symbols.CURRENCY}${totalOldPrice}</span>
          <span class="basket-product__total__actual">${Symbols.CURRENCY}${totalActualPrice}</span>
        </div>
      </td>
      <td class="">
        <div class="basket-product__remove">
          <img src=${removeIcon} alt="remove product">
        </div>
      </td>`;
  }
}

export default BasketProduct;

import './Product.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import star from '../../assets/img/star-icon.png';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import { Titles, Symbols, Buttons } from '../../common.types/enums';

class Product {
  private data: IProduct;

  constructor(data: IProduct) {
    this.data = data;
  }

  render(): string {
    const {
      title, thumbnail, stock, discountPercentage, category, brand, price, rating, id,
    } = this.data;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);

    // TODO: change hardcode route after refactoring
    return `
        <div class="product-item">
            <div class="product-item__discont">
                <span>${discountPercentage}${Symbols.DISCOUNT}${Titles.PRODUCT_DISCOUNT}</span>
            </div>
            <div class="product-item__stock">
                <span>${Titles.STOCK}${stock}</span>
            </div>
            <div class="product-item__image">
                <img src=${thumbnail} alt="product image">
            </div>
            <div class="product-item__title">${title}</div>
            <div class="product-item__category">
                <span class="product-item__category__title">${Titles.CATEGORY}</span>
                <span class="product-item__category__text">${category}</span>
            </div>
            <div class="product-item__brand">
                <span class="product-item__brand__title">${Titles.BRAND}</span>
                <span class="product-item__brand__text">${brand}</span>
            </div>
            <div class="product-item__rating">
                <div class="product-item__rating__stars">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <div class="product-item__rating__indicator" style="width: ${(rating / 5) * 100}%"></div>
                </div>
            </div>
            <div class="product-item__prices">
                <div class="product-item__prices__new">${Symbols.CURRENCY}${actualPrice}</div>
                <div class="product-item__prices__old">${Symbols.CURRENCY}${price}</div>
            </div>
            <div class="product-item__buttons">
                <button onclick="window.location.pathname = '/product/${id}'" class="product-item__buttons_red">${Buttons.DETAILS}</button>
                <button class="product-item__buttons_white">${Buttons.ADD}</button>
            </div>
        </div>
        `;
  }
}

export default Product;

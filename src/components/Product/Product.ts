import './Product.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import star from '../../assets/img/star-icon.png';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';

const DISCOUNT_TITLE = '% OFF';
const STOCK_TITLE = 'Stock: ';
const SIGN_OF_CURRENCY = '$';
const CATEGORY_TITLE = 'Category: ';
const BRAND_TITLE = 'Brand: ';

class Product {
  private data: IProduct;

  constructor(data: IProduct) {
    this.data = data;
  }

  render(): string {
    const {
      title, thumbnail, stock, discountPercentage, category, brand, price,
    } = this.data;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);

    return `
        <div class="product-item">
            <div class="product-item__discont">
                <span>${discountPercentage}${DISCOUNT_TITLE}</span>
            </div>
            <div class="product-item__stock">
                <span>${STOCK_TITLE}${stock}</span>
            </div>
            <div class="product-item__image">
                <img src=${thumbnail} alt="product image">
            </div>
            <div class="product-item__title">${title}</div>
            <div class="product-item__category">
                <span class="product-item__category__title">${CATEGORY_TITLE}</span>
                <span class="product-item__category__text">${category}</span>
            </div>
            <div class="product-item__brand">
                <span class="product-item__brand__title">${BRAND_TITLE}</span>
                <span class="product-item__brand__text">${brand}</span>
            </div>
            <div class="product-item__rating">
                <div class="product-item__rating__stars">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <div class="product-item__rating__indicator"></div>
                </div>
            </div>
            <div class="product-item__prices">
                <div class="product-item__prices__new">${SIGN_OF_CURRENCY}${actualPrice}</div>
                <div class="product-item__prices__old">${SIGN_OF_CURRENCY}${price}</div>
            </div>
            <div class="product-item__buttons">
                <button class="product-item__buttons_red">DETAILS</button>
                <button class="product-item__buttons_white">ADD FROM CARD</button>
            </div>
        </div>
        `;
  }
}

export default Product;

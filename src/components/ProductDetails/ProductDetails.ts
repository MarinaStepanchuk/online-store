import './ProductDetails.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import star from '../../assets/img/star-icon.png';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import ProductPhotosSlider from '../ProductPhotosSlider/ProductPhotosSlider';

const DISCOUNT_TITLE = 'Discount Percentage: ';
const DISCOUNT_SYMBOL = '%';
const STOCK_TITLE = 'Stock: ';
const CURRENCY_SYMBOL = '$';
const CATEGORY_TITLE = 'Category: ';
const BRAND_TITLE = 'Brand: ';
const DESCRIPTION_TITLE = 'Description:';
const BUTTON_TO_CARD = {
  ADD: 'ADD TO CARD',
  REMOVE: 'REMOVE FROM CARD',
};
const BUTTON_BUY = 'BUY NOW';

class ProductDetails {
  constructor(private product: IProduct) {
    this.product = product;
  }

  render(): string {
    const {
      title, images, thumbnail, stock, discountPercentage, category, brand, price, rating, description,
    } = this.product;
    const photosSlider = new ProductPhotosSlider(images).render();
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);

    return `
      <div class="product-details__photos">
        ${photosSlider}
        <div class="product-details__photos__general">
          <img src="${thumbnail}" alt="product photo" class="general-photo">
        </div>
      </div>
      <div class="product-details__information">
        <h4 class="product-details__information__title">${title}</h4>
        <div class="product-details__information__container">
          <div class="product-details__information__prices">
            <div class="product-details__information__prices__new">${CURRENCY_SYMBOL}${actualPrice}</div>
            <div class="product-details__information__prices__old">${CURRENCY_SYMBOL}${price}</div>
          </div>
          <div class="product-details__information__rating">
            <span>${rating}</span>
            <div class="product-details__information__rating__stars">
              <img src=${star} alt="star of rating">
              <img src=${star} alt="star of rating">
              <img src=${star} alt="star of rating">
              <img src=${star} alt="star of rating">
              <img src=${star} alt="star of rating">
              <div class="product-details__information__rating__indicator" style="width: ${(rating / 5) * 100}%"></div>
            </div>
          </div>
        </div>
        <div class="product-details__information__category">
          <span class="product-details__information__category__title">${CATEGORY_TITLE}</span>
          <span class="product-details__information__category__text">${category}</span>
        </div>
        <div class="product-details__information__brand">
          <span class="product-details__information__brand__title">${BRAND_TITLE}</span>
          <span>${brand}</span>
        </div>
        <div class="product-details__information__stock">
          <span class="product-details__information__stock__title">${STOCK_TITLE}</span>
          <span>${stock}</span>
        </div>
        <div class="product-details__information__discont">
          <span class="product-details__information__discont__title">${DISCOUNT_TITLE}</span>
          <span>${discountPercentage}${DISCOUNT_SYMBOL}</span>
        </div>
        <div class="product-details__information__buttons">
          <div class="product-details__information__buttons_red">
            <a class="basket-link" href="#/basket">${BUTTON_BUY}</a>
          </div>
          <button class="product-details__information__buttons_white">${BUTTON_TO_CARD.ADD}</button>
        </div>
        <div class="product-details__information__description">
          <span class="product-details__information__description__title">${DESCRIPTION_TITLE}</span>
          <span>${description}</span>
        </div>
      </div>
      `;
  }
}

// <div class="product-item">




// <div class="product-item__rating">
//     <div class="product-item__rating__stars">
//         <img src=${star} alt="star of rating">
//         <img src=${star} alt="star of rating">
//         <img src=${star} alt="star of rating">
//         <img src=${star} alt="star of rating">
//         <img src=${star} alt="star of rating">
//         <div class="product-item__rating__indicator" style="width: ${(rating / 5) * 100}%"></div>
//     </div>
// </div>
// <div class="product-item__prices">
//     <div class="product-item__prices__new">${CURRENCY_SYMBOL}${actualPrice}</div>
//     <div class="product-item__prices__old">${CURRENCY_SYMBOL}${price}</div>
// </div>
// <div class="product-item__buttons">
//     <button class="product-item__buttons_red">DETAILS</button>
//     <button class="product-item__buttons_white">ADD FROM CARD</button>
// </div>
// </div>

export default ProductDetails;

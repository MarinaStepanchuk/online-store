import './ProductDetails.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import star from '../../assets/img/star-icon.png';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import ProductPhotosSlider from '../ProductPhotosSlider/ProductPhotosSlider';
import { Title, Symbol, Button } from '../../common.types/enums';

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
            <div class="product-details__information__prices__new">${Symbol.CURRENCY}${actualPrice}</div>
            <div class="product-details__information__prices__old">${Symbol.CURRENCY}${price}</div>
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
          <span class="product-details__information__category__title">${Title.CATEGORY}</span>
          <span class="product-details__information__category__text">${category}</span>
        </div>
        <div class="product-details__information__brand">
          <span class="product-details__information__brand__title">${Title.BRAND}</span>
          <span>${brand}</span>
        </div>
        <div class="product-details__information__stock">
          <span class="product-details__information__stock__title">${Title.STOCK}</span>
          <span>${stock}</span>
        </div>
        <div class="product-details__information__discont">
          <span class="product-details__information__discont__title">${Title.DETAILS_DISCOUNT}</span>
          <span>${discountPercentage}${Symbol.DISCOUNT}</span>
        </div>
        <div class="product-details__information__buttons">
          <button onclick="window.location.pathname = '/basket'" class="product-details__information__buttons_buy">${Button.BUY}</button>
          <button class="product-details__information__buttons_basket">${Button.ADD}</button>
        </div>
        <div class="product-details__information__description">
          <span class="product-details__information__description__title">${Title.DESCRIPTION}</span>
          <span>${description}</span>
        </div>
      </div>
      `;
  }
}

export default ProductDetails;

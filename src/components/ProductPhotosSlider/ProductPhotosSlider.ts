import './ProductPhotosSlider.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';

class ProductPhotosSlider {
  constructor(private images: IProduct['images']) {
    this.images = images;
  }

  render(): string {
    const productsImages = this.images.reduce((acc: string, link: string) => {
      const image = `
        <div class="slider__item">
          <img src="${link}" alt="product photo">
        </div>
      `;
      return acc + image;
    }, '');

    return `<div class="product-details__photos__slider">${productsImages}</div>`;
  }
}

export default ProductPhotosSlider;

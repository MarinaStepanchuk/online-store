import './BasketHeaderLine.style.scss';
import prevBtn from '../../assets/svg/basket-arrow-prev.svg';
import nextBtn from '../../assets/svg/basket-arrow-next.svg';

const SUBHEADER_TITLE = 'shopping card'.toUpperCase();
const AMOUNT_BASKET_GOODS_TITLE = 'items:'.toUpperCase();
const AMOUNT_BASKET_PAGES_TITLE = 'page:'.toUpperCase();

class BasketHeaderLine {
  render() {
    return `
      <div class="basket__subheader ">
        <h2 class="h2 basket__subheader__title">${SUBHEADER_TITLE}</h2>
        <div class="basket__subheader__amount">
          ${this.getBlockAmountItems()}
          ${this.getBlockAmountPages()}
        </div>
      </div>
    `;
  }

  getBlockAmountItems() {
    return `
      <div class="basket__subheader__amount__items items-counter">
        <span class="items-counter__title">
          ${AMOUNT_BASKET_GOODS_TITLE}
        </span>
        <div class="items-counter__value-box">
          <span class="items-counter__value">2</span>
        </div>
      </div>`;
  }

  getBlockAmountPages() {
    return `
      <div class="basket__subheader__amount__pages pages-counter">
        <span class="pages-counter__title">
          ${AMOUNT_BASKET_PAGES_TITLE}
        </span>
        <div class="pages-counter__prev">
          <img src=${prevBtn} alt="previous page button">
        </div>
        <div class="pages-counter__value-box">
          <span class="pages-counter__value">2</span>
        </div>
        <div class="pages-counter__next">
          <img src=${nextBtn} alt="next page button">
        </div>
      </div>`;
  }
}

export default BasketHeaderLine;

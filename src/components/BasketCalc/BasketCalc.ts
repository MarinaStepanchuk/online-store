import './BasketCalc.style.scss';
import {
  Button,
  Title,
  Symbol,
} from '../../common.types/enums';

class BasketCalcTotal {
  render() {
    return `
      <div class="total-card">
        <div class="total-card__header">
          <div class="total-card__header__title">${Title.BASKET_HEADER__TITLE}</div>
          <div class="total-card__header__total-products">
            ${Title.PRODUCTS}
            <span class="total-card__header__total-products__value">12</span>
          </div>
        </div>
        <div class="total-card__calc">
          <div class="total-card__calc__subtotal">
            <span class="total-card__calc__subtotal__title">${Title.CARD_SUBTOTAL_MONEY}</span>
            <span class="total-card__calc__subtotal__value">${Symbol.CURRENCY}2645</span>
          </div>
          <div class="total-card__calc__discount">
            <span class="total-card__calc__discount__title">${Title.DISCOUNT}</span>
            <div>
              <span>${Symbol.SUBTRACT}</span>
              <span class="total-card__calc__discount__value">20${Symbol.DISCOUNT}</span>
            </div>
          </div>
          <div class="total-card__calc__summary">
            <span class="total-card__calc__summary__title">${Title.CARD_TOTAL_MONEY}</span>
            <span class="total-card__calc__summary__value">${Symbol.CURRENCY}2645</span>
          </div>
          <button class="total-card__calc__ordering">${Button.ORDERING}</button>
        </div> 
      </div>
    `;
  }
}

export default BasketCalcTotal;

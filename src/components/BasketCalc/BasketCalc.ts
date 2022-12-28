import './BasketCalc.style.scss';

enum Buttons {
  ORDERING = 'Proceed To Checkout',
}

enum Titles {
  HEADER__TITLE = 'Card Totals',
  PRODUCTS = 'Products: ',
  SUBTOTAL = 'Subtotal',
  DISCOUNT = 'Discount',
  TOTAL = 'Total',
}

enum Symbols {
  DISCOUNT = '%',
  CURRENCY = '$',
  SUBTRACT = '(-)',
}

class BasketCalcTotal {
  render() {
    return `
      <div class="total-card">
        <div class="total-card__header">
          <div class="total-card__header__title">${Titles.HEADER__TITLE}</div>
          <div class="total-card__header__total-products">
            ${Titles.PRODUCTS}
            <span class="total-card__header__total-products__value">12</span>
          </div>
        </div>
        <div class="total-card__calc">
          <div class="total-card__calc__subtotal">
            <span class="total-card__calc__subtotal__title">${Titles.SUBTOTAL}</span>
            <span class="total-card__calc__subtotal__value">${Symbols.CURRENCY}2645</span>
          </div>
          <div class="total-card__calc__discount">
            <span class="total-card__calc__discount__title">${Titles.DISCOUNT}</span>
            <span class="total-card__calc__discount__value">${Symbols.SUBTRACT}20${Symbols.DISCOUNT}</span>
          </div>
          <div class="total-card__calc__summary">
            <span class="total-card__calc__summary__title">${Titles.TOTAL}</span>
            <span class="total-card__calc__summary__value">${Symbols.CURRENCY}2645</span>
          </div>
          <button class="total-card__calc__ordering">${Buttons.ORDERING}</button>
        </div> 
      </div>
    `;
  }
}

export default BasketCalcTotal;
import './BasketCoupons.style.scss';
import removeIcon from '../../assets/svg/delete_button.svg';
import { Button, Symbol } from '../../common.types/enums';
import ICoupon from './BasketCoupons.interface';

const Coupons: ICoupon[] = [
  {
    name: 'TREE',
    discount: 5,
  },
  {
    name: 'CHRISTMASS',
    discount: 10,
  },
  {
    name: 'TOY',
    discount: 7,
  },
  {
    name: 'DECORATIONS',
    discount: 10,
  },
  {
    name: 'NEWYEAR',
    discount: 15,
  },
];

enum Title {
  APPLY = 'Coupon Apply',
  COUPON_PLACEHOLDER = 'Enter promo code',
  TEST_HINT = 'You can use these сoupons for test:',
  ACTIVE = 'Active Coupons:',
}

class BasketCoupons {
  render(): string {
    return `
      <div class="coupons">
        <span class="coupons__title">${Title.APPLY}</span>
        <div class="coupons__input">
          <input class="coupons__input__value" type="text" placeholder="${Title.COUPON_PLACEHOLDER}">
          <button class="coupons__input__clear-button">${Button.CLEAR_INPUT}</button>
        </div>
        <div class="coupons__res">
          <span class="coupons__res__value">${this.getCouponByName('TREE')?.name}</span>
          <button class="coupons__res__add">${Button.COUPON_ADD}</button>
        </div>
        <div class="coupons__active">
          <p class="coupons__active__title">${Title.ACTIVE}</p>
          <div class="coupons__active__element">
            <span class="coupons__active__element__name">${this.getCouponByName('DECORATIONS')?.name}</span>
            <span class="coupons__active__element__value">${this.getCouponByName('DECORATIONS')?.discount}${Symbol.DISCOUNT}</span>
            <div class="coupons__active__element__remove">
              <img src=${removeIcon} alt="remove coupon">
            </div>
          </div>
        </div>
        <div class="coupons__possible">
          <span class="coupons__possible__title">${Title.TEST_HINT}</span>
          <span class="coupons__possible__value">${this.getStringAllCoupons()}</span>
        </div>
      </div>
      `;
  }

  private getStringAllCoupons(): string {
    return Coupons.map((coupon: ICoupon) => coupon.name).join(', ');
  }

  public getCouponByName(name: string): ICoupon | undefined {
    return Coupons.find((coupon: ICoupon) => coupon.name === name);
  }
}

export default BasketCoupons;

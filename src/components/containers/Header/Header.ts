import './Header.style.scss';
import headerLogo from '../../../assets/img/logo.png';
import headerBasket from '../../../assets/svg/header-basket.svg';

class Header {
  render(): string {
    return `
        <header class="header">
            <div class="header__logo">
                <img src=${headerLogo} alt="shop logo">
            </div>
            <div class="header__money show">
                <span class="header__money__text">Card total:</span>
                <span id="headerTotalMoney" class="header__money__value">$666.00</span>
            </div>
            <div class="header__basket">
                <img src=${headerBasket} alt="basket icon">
                <div id="headerBasketAmount" class="header__basket__amount show">12</div>
            </div>
        </header>
    `;
  }
}

export default Header;

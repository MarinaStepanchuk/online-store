import './Header.style.scss';
import headerLogo from '../../../assets/img/logo.png';
import headerBasket from '../../../assets/svg/header-basket.svg';
import { Title } from '../../../common.types/enums';

class Header {
  render(): string {
    return `
          <header class="header">
            <a href="/" class="header__logo">
                <img src=${headerLogo} alt="shop logo">
            </a>
            <div class="header__money show">
                <span class="header__money__text">${Title.HEADER_TOTAL_MONEY}</span>
                <span id="headerTotalMoney" class="header__money__value">$666.00</span>
            </div>
            <div onclick="window.location.href = '/basket'" class="header__basket">
                <img src=${headerBasket} alt="basket icon">
                <div id="headerBasketAmount" class="header__basket__amount show">12</div>
            </div>
          </header>
          `;
  }
}

export default Header;

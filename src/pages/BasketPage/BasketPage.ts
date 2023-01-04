import './BasketPage.style.scss';
import BasketControl from '../../components/BasketControl/BasketControl';
import { IBasketProduct } from '../../components/BasketProduct/BasketProduct.interface';
import BasketCalc from '../../components/BasketCalc/BasketCalc';
import BasketCoupons from '../../components/BasketCoupons/BasketCoupons';
import getMainBlock from '../../utils/getMainBlock';
import Basket from '../../utils/Basket';
import BasketGoods from '../../components/BasketGoods/BasketGoods';
// import { findElem } from '../../utils/findElem';

class BasketPage {
  static render(): void {
    const control = new BasketControl().render();
    const basketListOfProds: IBasketProduct[] = new Basket().getBasketList();
    const basket = new BasketGoods(basketListOfProds, BasketPage.reRender).render();
    const basketCalc = new BasketCalc().render();
    const basketPromo = new BasketCoupons().render();
    const main = getMainBlock();

    main.innerHTML = `
      <div class="basket">
        <section class="basket__content">
          ${control}
          ${basket}
        </section>
        <section class="basket__aside-block">
          ${basketCalc}
          ${basketPromo}
        </section>
      <div>
    `;
  }

  static reRender() {
    BasketPage.render();
  }
}

export default BasketPage;

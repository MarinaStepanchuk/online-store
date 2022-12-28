import './BasketTotalCalc.style.scss';
import BasketCalc from '../BasketCalc/BasketCalc';
import BasketPromoBlock from '../BasketPromoBlock/BasketPromoBlock';

class BasketTotalCalc {
  render() {
    const basketCalcTotal = new BasketCalc().render();
    const basketPromo = new BasketPromoBlock().render();
    return `
      <section class="aside-card">
        ${basketCalcTotal}
        ${basketPromo}
      </section>
    `;
  }
}

export default BasketTotalCalc;

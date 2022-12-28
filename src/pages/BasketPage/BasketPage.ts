import './BasketPage.style.scss';
import Header from '../../components/containers/Header/Header';
import { findElem } from '../../utils/findElem';
import BasketControl from '../../components/BasketControl/BasketControl';
import BasketGoods from '../../components/BasketGoods/BasketGoods';
import BasketTotalCalc from '../../components/BasketTotalCalc/BasketTotalCalc';
import Database from '../../database/Database';
import { IBasketProduct } from '../../components/BasketProduct/BasketProduct.interface';
import { IProduct } from '../../database/DataBase.interfaces';

// ****** its for testing layout block *******
const tempListOfProds: IProduct[] = [
  Database.getProductById(33),
  Database.getProductById(3),
  Database.getProductById(12),
];
const basketListOfProds: IBasketProduct[] = tempListOfProds.map((prod: IProduct, idx: number): IBasketProduct => ({ ...prod, index: idx + 1, amount: 4 }));
// ****** its for testing layout block *******

class BasketPage {
  static render() {
    const header = new Header().render();
    const control = new BasketControl().render();
    const basket = new BasketGoods(basketListOfProds).render();
    const totalCard = new BasketTotalCalc().render();

    const main = `
      <main class="main basket">
        <div class="basket__content">
          ${control}
          ${basket}
        </div>
        ${totalCard}
      </main>
    `;

    findElem('#app').innerHTML = `
      ${header}
      ${main}
    `;
  }
}

export default BasketPage;

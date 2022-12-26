import './BasketPage.style.scss';
import Header from '../../components/containers/Header/Header';
import { findElem } from '../../utils/findElem';
import BasketHeaderLine from '../../components/BasketHeaderLine/BasketHeaderLine';
import BasketGoods from '../../components/BasketGoods/BasketGoods';
import BasketCalc from '../../components/BasketCalc/BasketCalc';
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
    const basketHeaderLine = new BasketHeaderLine().render();
    const goodsList = new BasketGoods(basketListOfProds).render();
    const asideBlock = new BasketCalc().render();

    const main = `
      <main class="main basket">
        ${basketHeaderLine}
        <div class="basket__content">
          ${goodsList}
          ${asideBlock}
        </div>
      </main>
    `;

    findElem('#app').innerHTML = `
      ${header}
      ${main}
    `;
  }
}

export default BasketPage;

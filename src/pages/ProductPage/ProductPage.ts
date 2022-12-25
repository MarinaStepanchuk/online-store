import './ProductPage.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import { findElem } from '../../utils/findElem';
import Database from '../../database/Database';
import Header from '../../components/containers/Header/Header';
import PathProduct from '../../components/PathProduct/PathProduct';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

class ProductPage {
  static render(param: string) {
    const header = new Header().render();

    let main = '';
    if (!Database.getProductById(param)) {
      main = `
        <main class="main">
          <div class="produt-error">
            Product ${param} not found.
          </div>
        </main>
      `;
    } else {
      const product = Database.getProductById(param) as IProduct;
      const pathProduct = new PathProduct(product).render();
      const productDetails = new ProductDetails(product).render();
      main = `
      <main class="main">
        <section class="path">
          ${pathProduct}
        </section>
        <section class="product-details">
          ${productDetails}
        </section>
      </main>
      `;
    }

    findElem('#app').innerHTML = `
    ${header}
    ${main}
  `;
  }
}

export default ProductPage;

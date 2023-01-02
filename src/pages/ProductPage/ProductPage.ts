import './ProductPage.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import PathProduct from '../../components/PathProduct/PathProduct';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

class ProductPage {
  static render(param: string) {
    const main = document.querySelector('.main') as HTMLElement;

    if (!Database.getProductByParameters(param)) {
      main.innerHTML = `
        <main class="main">
          <div class="produсt-error">
            Product ${param} not found.
          </div>
        </main>
      `;
    } else {
      const product = Database.getProductByParameters(param) as IProduct;
      const pathProduct = new PathProduct(product).render();
      const productDetails = new ProductDetails(product).render();
      main.innerHTML = `
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
  }
}

export default ProductPage;

import './MainPage.style.scss';
import { findElem } from '../../utils/findElem';
import Header from '../../components/containers/Header/Header';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import UrlFormater from '../../utils/UrlFormater';
import Database from '../../database/Database';
import { IProcessedData } from '../../database/DataBase.interfaces';

class MainPage {
  static getData(): IProcessedData {
    const pageParams = new UrlFormater().getAllQueryParams();
    return Database.getProcessedData(pageParams);
  }

  static render() {
    const data = MainPage.getData();

    const header = new Header().render();
    const welcomeBlock = new WelcomeBlock().render();
    const sideBar = new Sidebar().render(data);
    const controls = new Controls().render(data);
    const grid = new ProductsGrid([...data.productsId]).render();

    const main = `
      <main class="main">
        ${welcomeBlock}
        <section class="goods">
          ${sideBar}
          <div class="controls-grid">
            ${controls}
            ${grid}
          </div>
        </section>
      </main>
    `;

    findElem('#app').innerHTML = `
      ${header}
      ${main}
    `;
  }
}

export default MainPage;

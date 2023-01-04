import './MainPage.style.scss';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import UrlFormatter from '../../utils/UrlFormatter';
import Database from '../../database/Database';
import { IProcessedData } from '../../database/DataBase.interfaces';
import FiltersState from '../../utils/FiltersState';
import getMainBlock from '../../utils/getMainBlock';

class MainPage {
  static getData(): IProcessedData {
    FiltersState.checkState();
    const urlFormatter = new UrlFormatter();

    /* const pageParams = urlFormatter.isExistedQuery()
      ? urlFormatter.getAllQueryParams() // get data from url
      : FiltersState.getState(); // or from sessionStorage */

    return Database.getProcessedData(urlFormatter.getAllQueryParams());
  }

  static render() {
    const data = MainPage.getData();

    const welcomeBlock = new WelcomeBlock().render();
    const sideBar = new Sidebar().render(data);
    const controls = new Controls().render(data);
    const grid = new ProductsGrid([...data.productsId]).render();
    const main = getMainBlock();

    main.innerHTML = `
      ${welcomeBlock}
      <section class="goods">
        ${sideBar}
        <div class="controls-grid">
          ${controls}
          ${grid}
        </div>
      </section>
    `;
  }
}

export default MainPage;

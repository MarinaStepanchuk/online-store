import './MainPage.style.scss';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import getMainBlock from '../../utils/getMainBlock';

class MainPage {
  static render() {
    const welcomeBlock = new WelcomeBlock().render();
    const sideBar = new Sidebar().render();
    const controls = new Controls().render();
    const grid = new ProductsGrid().render();
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

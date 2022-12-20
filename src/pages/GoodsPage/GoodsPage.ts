import './GoodsPage.style.scss';
import { findElem } from '../../utils/findElem';
import Header from '../../components/containers/Header/Header';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';

class GoodsPage {
  render() {
    const header = (new Header()).render();
    const welcomeBlock = (new WelcomeBlock()).render();
    const filters = (new Sidebar()).render();

    const main = `
      <main class="main">
        ${welcomeBlock}
        <section class="goods">
          ${filters}
        </section>
      </main>
    `;

    findElem('#app').innerHTML = `
      ${header}
      ${main}
        
    `;
  }
}

export default GoodsPage;

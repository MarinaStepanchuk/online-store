import './MainPage.style.scss';
import { findElem } from '../../utils/findElem';
import Header from '../../components/containers/Header/Header';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';
import Controls from "../../components/Controls/Controls";

class MainPage {
  render() {
    const header = (new Header()).render();
    const welcomeBlock = (new WelcomeBlock()).render();
    const sideBar = (new Sidebar()).render();
    const controls = (new Controls({})).render();

    const main = `
      <main class="main">
        ${welcomeBlock}
        <section class="goods">
          ${sideBar}
          <div class="controls&grid">
            ${controls}
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

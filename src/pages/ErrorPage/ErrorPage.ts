import './ErrorPage.style.scss';
import { findElem } from '../../utils/findElem';
import Header from '../../components/containers/Header/Header';

const MESSAGE_ERROR = 'PAGE NOT FOUND (404)';

class ErrorPage {
  static render() {
    const header = new Header().render();

    const main = `
      <main class="main">
        <section class="error">
          <div>
            ${MESSAGE_ERROR}
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

export default ErrorPage;

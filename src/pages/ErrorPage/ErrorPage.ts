import './ErrorPage.style.scss';

const MESSAGE_ERROR = 'PAGE NOT FOUND (404)';

class ErrorPage {
  static render() {
    const main = document.querySelector('.main') as HTMLElement;

    main.innerHTML = `
      <main class="main">
        <section class="error">
          <div>
            ${MESSAGE_ERROR}
          </div>
        </section>
      </main>
    `;
  }
}

export default ErrorPage;

import Header from '../components/containers/Header/Header';

class App {
  static render(): void {
    const body = document.querySelector('#app') as HTMLElement;
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = new Header().render();
    const main = document.createElement('main');
    main.classList.add('main');
    body.append(header);
    body.append(main);
  }
}

export default App;
